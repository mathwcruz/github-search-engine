// import { GetStaticPaths, GetStaticProps } from 'next';

// interface UserProps {
//   user: {
//     name: string;
//     slug: string;
//   };
// }

export default function User() {
  return (
    <div>
      <h1>usuário</h1>
    </div>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: 'blocking',
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   return {
//     props: {
//       user: data,
//     },
//   };
// };
