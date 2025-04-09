import React from 'react';
import './App.css';
import { GameProvider, useGameContext, GAME_TYPES } from './context/GameContext';
import GameSelection from './components/GameSelection/GameSelection';
import JacksOrBetterGame from './games/JacksOrBetterGame';
import BonusPokerGame from './games/BonusPokerGame';
import DoubleBonusGame from './games/DoubleBonusGame';

// Game selector component that renders the appropriate game based on context
const GameSelector = () => {
  const { currentGameType, showGameSelection } = useGameContext();

  // If we're showing the game selection screen, render it
  if (showGameSelection) {
    return <GameSelection />;
  }

  // Otherwise, render the selected game
  switch (currentGameType) {
    case GAME_TYPES.JACKS_OR_BETTER:
      return <JacksOrBetterGame />;
    case GAME_TYPES.BONUS_POKER:
      return <BonusPokerGame />;
    case GAME_TYPES.DOUBLE_BONUS:
      return <DoubleBonusGame />;
    // Add more game types as they are implemented
    default:
      // If no game is selected or the game type is unknown, show the selection screen
      return <GameSelection />;
  }
};

function App() {
  return (
    <GameProvider>
      <div className="video-poker-app">
        <GameSelector />
      </div>
    </GameProvider>
  );
}

export default App
