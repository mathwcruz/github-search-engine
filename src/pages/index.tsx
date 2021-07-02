import Image from 'next/image';
import {} from 'antd';

import styles from 'styles/pages/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <Image
        src='/images/background-banner.png'
        className={styles.backgroundBanner}
        alt='Logo do Github'
        width={500}
        height={500}
      />
    </div>
  );
}
