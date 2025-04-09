import React from 'react';
import { useGameContext, GAME_TYPES } from '../../context/GameContext';
import './GameSelection.css';

const GameOption = ({ title, gameType, onClick }) => {
  return (
    <div className="game-option" onClick={onClick}>
      <div className="game-option-inner">
        <div className="game-title">{title}</div>
      </div>
      <div className="game-label">Poker</div>
    </div>
  );
};

const GameSelection = () => {
  const { switchGame, credits, showDollars, creditsToDollars, toggleCurrencyDisplay } = useGameContext();

  const gameOptions = [
    { title: 'JACKS OR BETTER', type: GAME_TYPES.JACKS_OR_BETTER },
    { title: 'BONUS POKER', type: GAME_TYPES.BONUS_POKER },
    { title: 'DOUBLE BONUS POKER', type: GAME_TYPES.DOUBLE_BONUS },
    { title: 'DOUBLE DOUBLE BONUS', type: GAME_TYPES.DOUBLE_DOUBLE_BONUS },
    { title: 'DEUCES WILD', type: GAME_TYPES.DEUCES_WILD },
    { title: 'JOKER POKER', type: GAME_TYPES.JOKER_POKER },
  ];

  return (
    <div className="game-selection">
      <h1>Video Poker Games</h1>
      <div
        className="credits-display"
        onClick={toggleCurrencyDisplay}
        title="Click to toggle between credits and dollars"
      >
        {showDollars ? creditsToDollars(credits) : `CREDITS: ${credits}`}
      </div>

      <div className="game-options-grid">
        {gameOptions.map((game, index) => (
          <GameOption
            key={index}
            title={game.title}
            gameType={game.type}
            onClick={() => switchGame(game.type)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameSelection;
