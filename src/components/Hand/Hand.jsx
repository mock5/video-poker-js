import React from 'react';
import Card from '../Card/Card';
import './Hand.css';

const Hand = ({ cards, heldCards, onCardClick, gameSpeed = 1, isFlipping = false }) => {
  // Determine the speed class based on gameSpeed
  const speedClass = `speed-${gameSpeed}`;

  // Calculate base delay for card flipping
  const baseFlipDelay = 300 / gameSpeed; // milliseconds

  return (
    <div className={`hand ${speedClass}`}>
      {cards.map((card, index) => (
        <div
          key={index}
          className="card-container"
          style={{ animationDelay: `${index * (0.2 / gameSpeed)}s` }}
        >
          <Card
            card={card}
            isHeld={heldCards[index]}
            onClick={() => onCardClick(index)}
            isFlipping={isFlipping && !heldCards[index]}
            flipDelay={baseFlipDelay * index}
          />
        </div>
      ))}
    </div>
  );
};

export default Hand;
