import { AiOutlineArrowRight } from 'react-icons/ai';
import { Empty } from 'antd';

import { Repository } from 'pages/users/[slug]';

import styles from 'styles/components/UserRepositories.module.scss';

interface UserRepositoriesProps {
  repositories: Repository[];
  userName: string;
}

export function UserRepositories({
  repositories,
  userName,
}: UserRepositoriesProps) {
  return (
    <div className={styles.userRepositories}>
      <ul>
        {repositories?.length > 0 ? (
          <>
            {repositories?.map((repository) => (
              <li key={repository?.id}>
                <div>
                  <h3>{repository?.name}</h3>
                  <a
                    href={repository?.url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <AiOutlineArrowRight color='#a8a8b3' size={20} />
                  </a>
                </div>
                <section>
                  <p>{repository?.description}</p>
                  <strong>Última edição em {repository?.updatedAt}</strong>
                </section>
              </li>
            ))}
          </>
        ) : (
          <Empty
            description={`${userName} não possui nenhum repositório público`}
          />
        )}
      </ul>
    </div>
  );
}
