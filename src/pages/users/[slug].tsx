import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';

type User = {
  userId: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
};

type Repositories = {
  id: string;
  name: string;
  description: string;
  url: string;
  updatedAt: string;
};

interface UserProps {
  user: {
    profile: User;
    repositories: Repositories[];
  };
}

import styles from 'styles/pages/User.module.scss';

import { api } from 'services/api';

export default function User({ user }: UserProps) {
  console.log({ user });

  return (
    <div className={styles.userContainer}>
      <div className={styles.backgroundBanner}>
        <Image
          src='/images/logo.svg'
          alt='github-search-engine'
          className={styles.logoImg}
          width={200}
          height={200}
        />
        <Link href='/'>
          <a>
            <AiOutlineArrowLeft size={20} color='#a8a8b3' />
            Voltar
          </a>
        </Link>
      </div>

      <div className={styles.userProfile}>
        <div className={styles.userInformations}>
          {/* perguntar a comunidade como resolver o erro q ta dando ao usar o <Image /> do Next com imagens externas */}
          <img src={user?.profile?.avatar} alt={user?.profile?.name} />
          <div>
            <h4>{user?.profile?.name}</h4>
            <p>{user?.profile?.bio}</p>
          </div>
        </div>
        <section className={styles.userGithubData}>
          {/* componentizar essas div's */}
          <div>
            <strong>{user?.profile?.followers}</strong>
            <small>Seguidores</small>
          </div>
          <div>
            <strong>{user?.profile?.following}</strong>
            <small>Seguindo</small>
          </div>
          <div>
            <strong>{user?.profile?.publicRepos}</strong>
            <small>Repos públicos</small>
          </div>
        </section>
      </div>
      {/* <div className={styles.userRepositories}>
        <ul>
          <li></li>
        </ul>
      </div> */}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const { data: userInfo } = await api.get(
    `https://api.github.com/users/${slug}`
  );

  const { data: userRepositories } = await api.get(
    `https://api.github.com/users/${slug}/repos`
  );

  const profile = {
    userId: userInfo?.login,
    name: userInfo?.name,
    avatar: userInfo?.avatar_url,
    bio: userInfo?.bio,
    followers: userInfo?.followers,
    following: userInfo?.following,
    publicRepos: userInfo?.public_repos,
  };

  const repositories = userRepositories?.slice(0, 5)?.map((repo) => {
    return {
      id: repo?.id,
      name: repo?.name,
      url: repo?.url,
      description: repo?.description,
      updatedAt: repo?.updated_at,
    };
  });

  return {
    props: {
      user: {
        profile,
        repositories,
      },
    },
    revalidate: 60 * 60 * 2, // => 2 horas
  };
};
