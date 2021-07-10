import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

import { Member } from 'pages/index';

import { stagger, fadeInUp } from '~/utils/animationsData';

import styles from 'styles/components/MemberList.module.scss';

interface MemberListProps {
  member: Omit<Member, 'id'>;
}

export function MemberList({ member }: MemberListProps) {
  return (
    <motion.div className={styles.memberWrapper} variants={stagger}>
      <motion.li
        className={styles.memberItem}
        variants={fadeInUp}
        whileTap={{ scale: 0.95 }}
      >
        <section>
          <motion.img
            src={member?.avatar_url}
            alt={member?.login}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
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
      </motion.li>
    </motion.div>
  );
}
