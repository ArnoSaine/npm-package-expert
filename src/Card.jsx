export default function Card({ name, version, stats }) {
  // Get object properties as [key, value] pairs
  const statEntries = Object.entries(stats);

  return (
    <div className="card">
      <h2>{name}</h2>
      <code>{version}</code>
      <ul>
        {statEntries.map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
