import React, { useState, useEffect } from 'react';
import './Card.css';

const Card = ({ card, isHeld, onClick, isFlipping = false, flipDelay = 0 }) => {
  const [showBack, setShowBack] = useState(!card);
  const [isFlippingAnimation, setIsFlippingAnimation] = useState(false);

  // Handle flipping animation when card changes
  useEffect(() => {
    if (isFlipping && card) {
      setShowBack(true); // Start with back showing
      setIsFlippingAnimation(true);

      // After a delay, start the flip animation
      const timer = setTimeout(() => {
        setShowBack(false); // Show the front
      }, flipDelay);

      // Clean up timer
      return () => clearTimeout(timer);
    } else {
      setShowBack(!card);
      setIsFlippingAnimation(false);
    }
  }, [card, isFlipping, flipDelay]);
  // Card back component
  const CardBack = () => (
    <div className="card-back-content">
      <div className="card-back-pattern">
        <div className="card-back-logo">♠♥♣♦</div>
      </div>
    </div>
  );

  // Card front component
  const CardFront = () => {
    if (!card) return null;

    const { suit, value } = card;
    const isRed = suit === 'hearts' || suit === 'diamonds';
    const suitSymbol = {
      'hearts': '♥',
      'diamonds': '♦',
      'clubs': '♣',
      'spades': '♠'
    }[suit];

    return (
      <div className={`card-front-content ${isRed ? 'red' : 'black'}`}>
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
      </div>
    );
  };

  // If no card, just show the back
  if (!card) {
    return (
      <div className="card card-back" onClick={onClick}>
        <CardBack />
      </div>
    );
  }

  return (
    <div
      className={`card ${isHeld ? 'held' : ''} ${isFlippingAnimation ? 'flipping' : ''}`}
      onClick={onClick}
    >
      <div className={`card-inner ${showBack ? '' : 'flipped'}`}>
        <div className="card-face card-face-back">
          <CardBack />
        </div>
        <div className="card-face card-face-front">
          <CardFront />
        </div>
      </div>
      {isHeld && <div className="held-text">HELD</div>}
    </div>
  );
};

export default Card;
