import { useState } from "react";
import packages from "../data/packages.json";
import "./App.css";
import Card from "./Card";

export default function App() {
  const [cards, setCards] = useState(
    // Use packages data as the initial state
    packages
  );

  const topCard = cards[0];

  const handleClick = () => {
    // Move top card to the bottom
    setCards(([topCard, ...otherCards]) => [...otherCards, topCard]);
  };

  return (
    <div className="App">
      <h1>npm Package Expert</h1>
      <button onClick={handleClick}>Next card</button>
      <Card {...topCard} />
      {/*
        <Card {...topCard} /> is a shorthand syntax for:
        <Card
          name={topCard.name}
          version={topCard.version}
          stats={topCard.stats}
        />
      */}
    </div>
  );
}
