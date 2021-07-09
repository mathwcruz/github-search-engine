import { Repository } from 'pages/users/[slug]';

import styles from 'styles/components/UserRepositories.module.scss';

interface UserRepositoriesProps {
  repositories: Repository[];
}

export function UserRepositories({ repositories }: UserRepositoriesProps) {
  console.log({ repositories });

  return (
    <div className={styles.userRepositories}>
      <ul>
        <li>teste 1</li>
        <li>teste 2</li>
        <li>teste 3</li>
      </ul>
      {/* caso o user nao tenha nenhum repo público, mostrar uma <Empty /> message */}
    </div>
  );
}
