import Image from 'next/image';
import { motion } from 'framer-motion';

import { User } from 'pages/users/[slug]';

import { UserGithubInfosItem } from './UserGithubInfosItem';

import styles from 'styles/components/UserProfile.module.scss';

interface UserProfileProps {
  profile: User;
}

export function UserProfile({ profile }: UserProfileProps) {
  return (
    <div className={styles.userProfile}>
      <motion.div
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={styles.userInformations}
      >
        <Image
          src={profile?.avatar}
          alt={profile?.name}
          width={192}
          height={192}
          objectFit='cover'
          placeholder='blur'
        />
        <div>
          <h4>{profile?.name}</h4>
          <p>{profile?.bio}</p>
        </div>
      </motion.div>
      <section className={styles.userGithubData}>
        <UserGithubInfosItem metric={profile?.followers} label='Seguidores' />
        <UserGithubInfosItem metric={profile?.following} label='Seguindo' />
        <UserGithubInfosItem
          metric={profile?.publicRepos}
          label='Repos públicos'
        />
      </section>
    </div>
  );
}
