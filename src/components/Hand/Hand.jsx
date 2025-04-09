import React from 'react';
import Card from '../Card/Card';
import './Hand.css';

const Hand = ({ cards, heldCards, onCardClick }) => {
  return (
    <div className="hand">
      {cards.map((card, index) => (
        <Card 
          key={index} 
          card={card} 
          isHeld={heldCards[index]} 
          onClick={() => onCardClick(index)} 
        />
      ))}
    </div>
  );
};

export default Hand;
