import { Package } from "./types";

export default function Card({ name, version, stats }: Package) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <code>{version}</code>
      <ul>
        {Object.entries(stats).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
