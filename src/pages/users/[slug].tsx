import { GetStaticPaths, GetStaticProps } from 'next';

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

import { api } from 'services/api';

export default function User({ user }: UserProps) {
  console.log({ user });
  return (
    <div>
      <h1>usuário: {user?.profile?.name}</h1>
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

  const repositories = userRepositories?.map((repo) => {
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
