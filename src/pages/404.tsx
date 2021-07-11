import Link from 'next/link';
import Image from 'next/image';

import styles from 'styles/pages/404.module.scss';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <div>
        <Image
          width={420}
          height={420}
          src='/images/404-not-found.svg'
          alt='Página não encontrada'
        />
        <p>Esta página não foi encontrada</p>
        <h4>
          Siga para a{' '}
          <Link href='/'>
            <a>página inicial</a>
          </Link>
        </h4>
      </div>
    </div>
  );
}
