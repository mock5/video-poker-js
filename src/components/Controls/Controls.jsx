import React from 'react';
import { useGameContext } from '../../context/GameContext';
import './Controls.css';

const Controls = ({
  gamePhase,
  onDeal,
  onBetOne,
  onBetMax,
  onSpeedToggle,
  currentBet,
  credits,
  winAmount,
  gameSpeed = 1
}) => {
  // Get currency display functions from context
  const { showDollars, creditsToDollars, toggleCurrencyDisplay } = useGameContext();
  return (
    <div className="controls">
      <div className="status-display">
        {winAmount > 0 && <div className="win-display">WIN {winAmount}</div>}
        <div className="bet-display">BET {currentBet}</div>
        <div
          className="credits-display"
          onClick={toggleCurrencyDisplay}
          title="Click to toggle between credits and dollars"
        >
          {showDollars ? creditsToDollars(credits) : `${credits} CREDITS`}
        </div>
      </div>

      <div className="buttons">
        <button
          className="control-button more-games-button"
          onClick={useGameContext().returnToGameSelection}
        >
          MORE GAMES
        </button>
        <button
          className="control-button speed-button"
          onClick={onSpeedToggle}
        >
          SPEED {gameSpeed === 1 ? '►' : gameSpeed === 2 ? '►►' : '►►►'}
        </button>

        <button
          className="control-button bet-button"
          onClick={onBetOne}
          disabled={gamePhase !== 'betting' && gamePhase !== 'gameOver'}
        >
          BET ONE
        </button>

        <button
          className="control-button bet-button"
          onClick={onBetMax}
          disabled={gamePhase !== 'betting' && gamePhase !== 'gameOver'}
        >
          BET MAX
        </button>

        <button className="control-button">SOUND</button>

        <button
          className="control-button deal-button"
          onClick={onDeal}
        >
          {gamePhase === 'betting' || gamePhase === 'gameOver' ? 'DEAL' : 'DRAW'}
        </button>
      </div>
    </div>
  );
};

export default Controls;
