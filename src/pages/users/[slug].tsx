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

type Repositories = {};

interface UserProps {
  user: {
    userProfile: User;
    userRepos: Repositories[];
  };
}

import { api } from 'services/api';

export default function User({ user }: UserProps) {
  console.log({ user });
  return (
    <div>
      <h1>usuário: {user?.userProfile?.name}</h1>
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

  const { data: repositories } = await api.get(
    `https://api.github.com/users/${slug}/repos`
  );

  const userProfile = {
    userId: userInfo?.login,
    name: userInfo?.name,
    avatar: userInfo?.avatar_url,
    bio: userInfo?.bio,
    followers: userInfo?.followers,
    following: userInfo?.following,
    publicRepos: userInfo?.public_repos,
  };

  const userRepos = repositories?.map((repo) => {
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
        userProfile,
        userRepos,
      },
    },
  };
};
