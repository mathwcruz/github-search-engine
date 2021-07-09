import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';

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
        <li>
          <div>
            <h3>{repositories[0]?.name}</h3>
            <a
              href={repositories[0]?.url}
              target='_blank'
              rel='noopener noreferrer'
            >
              <AiOutlineArrowRight color='#a8a8b3' size={20} />
            </a>
          </div>
          <section>
            <p>{repositories[0]?.description}</p>
            <strong>Última edição em {repositories[0]?.updatedAt}</strong>
          </section>
        </li>
        <li>
          <div>
            <h3>{repositories[1]?.name}</h3>
            <a
              href={repositories[1]?.url}
              target='_blank'
              rel='noopener noreferrer'
            >
              <AiOutlineArrowRight color='#a8a8b3' size={20} />
            </a>
          </div>
          <section>
            <p>{repositories[1]?.description}</p>
            <strong>Última edição em {repositories[1]?.updatedAt}</strong>
          </section>
        </li>
      </ul>
      {/* caso o user nao tenha nenhum repo público, mostrar uma <Empty /> message */}
    </div>
  );
}
