import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import { UserRepositories } from 'components/Users/UserRepositories';
import { UserProfile } from 'components/Users/UserProfile';

import { dateFormatter } from 'utils/dateFormatter';
import { api } from 'services/api';

import styles from 'styles/pages/User.module.scss';

export type User = {
  userId: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
};

export type Repository = {
  id: string;
  name: string;
  description: string;
  url: string;
  updatedAt: string;
};

interface UserProps {
  user: {
    profile: User;
    repositories: Repository[];
  };
}

export default function User({ user }: UserProps) {
  return (
    <>
      <Head>
        <title>{user?.profile?.name}</title>
      </Head>
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
        <UserRepositories
          userName={user?.profile?.name}
          repositories={user?.repositories}
        />
      </div>
    </>
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
      url: repo?.html_url,
      description: repo?.description,
      updatedAt: dateFormatter(repo?.updated_at, 'dd/MM/yy'),
    };
  });

  return {
    props: {
      user: {
        profile,
        repositories,
      },
    },
    revalidate: 60 * 60, // => 1 hora
  };
};
