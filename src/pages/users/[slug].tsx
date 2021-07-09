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

import { UserRepositories } from 'components/UserRepositories';
import { UserProfile } from 'components/UserProfile';

import styles from 'styles/pages/User.module.scss';

import { api } from 'services/api';

export default function User({ user }: UserProps) {
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
      <UserProfile profile={user?.profile} />
      <UserRepositories />
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
