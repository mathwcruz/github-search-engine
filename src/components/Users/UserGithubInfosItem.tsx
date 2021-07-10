interface UserGithubInfoItemProps {
  metric: number;
  label: string;
}

export function UserGithubInfosItem({
  metric,
  label,
}: UserGithubInfoItemProps) {
  return (
    <div>
      <strong>{metric}</strong>
      <small>{label}</small>
    </div>
  );
}
