import styles from 'styles/components/UserGithubInfosItem.module.scss';

interface UserGithubInfoItemProps {
  metric: number;
  label: string;
}

export function UserGithubInfosItem({
  metric,
  label,
}: UserGithubInfoItemProps) {
  return (
    <div className={styles.userGithubItem}>
      <strong>{metric}</strong>
      <small>{label}</small>
    </div>
  );
}
