import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';

import styles from 'styles/components/MemberList.module.scss';

interface MemberListProps {
  member: {
    name: string;
    login: string;
    avatar_url: string;
  };
}

export function MemberList({ member }: MemberListProps) {
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
