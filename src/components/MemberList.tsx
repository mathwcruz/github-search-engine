import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';

import { useFetch } from 'services/hooks/fetch';

import styles from 'styles/components/MemberList.module.scss';

interface MemberListProps {
  member: {
    name: string;
    login: string;
    avatar_url: string;
  };
}

// TODO: buscar em https://api.github/users/${login} os dados daquele membros e retornar no card, usar useFetch

export function MemberList({ member }: MemberListProps) {
  const { data: user, get: getUser, loading: loadingUser } = useFetch();

  return (
    <li className={styles.memberItem}>
      <section>
        <img src={member?.avatar_url} alt={member?.name} />
        <footer>
          <h3>{member?.name}</h3>
          <p>{member?.login}</p>
        </footer>
      </section>
      <Link href={`/users/${member?.login}`}>
        <a>
          <AiOutlineArrowRight color='#a8a8b3' size={20} />
        </a>
      </Link>
    </li>
  );
}
