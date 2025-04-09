import React from 'react';
import './Card.css';

const Card = ({ card, isHeld, onClick }) => {
  if (!card) {
    return <div className="card card-placeholder" />;
  }

  const { suit, value } = card;
  const isRed = suit === 'hearts' || suit === 'diamonds';
  const suitSymbol = {
    'hearts': '♥',
    'diamonds': '♦',
    'clubs': '♣',
    'spades': '♠'
  }[suit];

  return (
    <div 
      className={`card ${isHeld ? 'held' : ''} ${isRed ? 'red' : 'black'}`} 
      onClick={onClick}
    >
      <div className="card-corner top-left">
        <div className="card-value">{value}</div>
        <div className="card-suit">{suitSymbol}</div>
      </div>
      
      <div className="card-center">
        <div className="card-suit-big">{suitSymbol}</div>
      </div>
      
      <div className="card-corner bottom-right">
        <div className="card-value">{value}</div>
        <div className="card-suit">{suitSymbol}</div>
      </div>
      
      {isHeld && <div className="held-text">HELD</div>}
    </div>
  );
};

export default Card;
