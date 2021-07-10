import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { FaGithub } from 'react-icons/fa';

import { Member } from 'pages/index';

import styles from 'styles/components/MemberList.module.scss';

interface MemberListProps {
  member: Omit<Member, 'id'>;
}

export function MemberList({ member }: MemberListProps) {
  return (
    <li className={styles.memberItem}>
      <section>
        <img src={member?.avatar_url} alt={member?.login} />
        <footer>
          <h3>{member?.login}</h3>
          <a target='_blank' href={member?.html_url}>
            <FaGithub size={18} color='#a8a8b3' />
            Perfil
          </a>
        </footer>
      </section>
      <Link href={`/users/${member?.login}`}>
        <a className={styles.memberLink}>
          <AiOutlineArrowRight color='#a8a8b3' size={20} />
        </a>
      </Link>
    </li>
  );
}
