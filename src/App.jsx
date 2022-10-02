import { useState } from "react";
import packages from "../data/packages.json";
import "./App.css";
import Card from "./Card";

export default function App() {
  const [cards, setCards] = useState(packages);

  const topCard = cards[0];

  return (
    <div className="App">
      <h1>npm Package Expert</h1>
      <button
        onClick={() =>
          setCards(([topCard, ...otherCards]) => [...otherCards, topCard])
        }
      >
        Next card
      </button>
      <Card {...topCard} />
    </div>
  );
}
