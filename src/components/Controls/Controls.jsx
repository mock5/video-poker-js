import React from 'react';
import './Controls.css';

const Controls = ({ 
  gamePhase, 
  onDeal, 
  onBetOne, 
  onBetMax, 
  currentBet, 
  credits, 
  winAmount 
}) => {
  return (
    <div className="controls">
      <div className="status-display">
        {winAmount > 0 && <div className="win-display">WIN {winAmount}</div>}
        <div className="bet-display">BET {currentBet}</div>
        <div className="credits-display">{credits} CREDITS</div>
      </div>
      
      <div className="buttons">
        <button className="control-button help-button">HELP</button>
        <button className="control-button">MORE GAMES</button>
        <button className="control-button">SPEED</button>
        <button className="control-button">SEE PAYS</button>
        
        <button 
          className="control-button bet-button" 
          onClick={onBetOne}
          disabled={gamePhase !== 'betting'}
        >
          BET ONE
        </button>
        
        <button 
          className="control-button bet-button" 
          onClick={onBetMax}
          disabled={gamePhase !== 'betting'}
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
