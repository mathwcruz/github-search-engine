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

interface UserProps {
  user: User;
}

import { api } from 'services/api';

export default function User({ user }: UserProps) {
  console.log({ user });
  return (
    <div>
      <h1>usuário: {user?.name}</h1>
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

  const { data } = await api.get(`https://api.github.com/users/${slug}`);

  const user = {
    userId: data?.login,
    name: data?.name,
    avatar: data?.avatar_url,
    bio: data?.bio,
    followers: data?.followers,
    following: data?.following,
    publicRepos: data?.public_repos,
  };

  return {
    props: {
      user,
    },
  };
};
