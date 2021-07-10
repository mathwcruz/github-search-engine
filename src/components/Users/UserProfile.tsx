import { motion } from 'framer-motion';

import { UserGithubInfosItem } from './UserGithubInfosItem';

import { User } from 'pages/users/[slug]';

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
        {/* perguntar a comunidade como resolver o erro q ta dando ao usar o <Image /> do Next com imagens externas */}
        <img src={profile?.avatar} alt={profile?.name} />
        {/* caso o user nao tenha imagem, setar uma default (pesquisar imagem gratuita) */}
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
