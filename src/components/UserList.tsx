import { AiOutlineArrowRight } from 'react-icons/ai';

import styles from 'styles/components/UserList.module.scss';

export function UserList() {
  return (
    <li className={styles.userItem}>
      <section>
        <img src='https://github.com/mathwcruz.png' alt='Matheus da Cruz' />
        <footer>
          <h3>Matheus da Cruz - mathwcruz</h3>
          <p>Minha biografia</p>
        </footer>
      </section>
      <AiOutlineArrowRight color='#a8a8b3' size={20} />
    </li>
  );
}
