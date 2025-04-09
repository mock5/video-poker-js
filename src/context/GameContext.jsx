import React, { createContext, useState, useContext } from 'react';

// Define available game types
export const GAME_TYPES = {
  JACKS_OR_BETTER: 'JACKS_OR_BETTER',
  BONUS_POKER: 'BONUS_POKER',
  DOUBLE_BONUS: 'DOUBLE_BONUS',
  DOUBLE_DOUBLE_BONUS: 'DOUBLE_DOUBLE_BONUS',
  DEUCES_WILD: 'DEUCES_WILD',
  JOKER_POKER: 'JOKER_POKER',
};

// Create the context
const GameContext = createContext();

// Create a provider component
export const GameProvider = ({ children }) => {
  // Shared state across games
  const [credits, setCredits] = useState(1000);
  const [currentGameType, setCurrentGameType] = useState(null);
  const [showGameSelection, setShowGameSelection] = useState(true);
  const [showDollars, setShowDollars] = useState(false);

  // Convert credits to dollar amount (1 credit = $0.25)
  const creditsToDollars = (credits) => {
    const dollars = (credits * 0.25).toFixed(2);
    return `$${dollars}`;
  };

  // Toggle between credits and dollars display
  const toggleCurrencyDisplay = () => {
    setShowDollars(!showDollars);
  };

  // Function to switch games
  const switchGame = (gameType) => {
    setCurrentGameType(gameType);
    setShowGameSelection(false);
  };

  // Function to return to game selection screen
  const returnToGameSelection = () => {
    setShowGameSelection(true);
  };

  // Values to be provided to consumers
  const value = {
    credits,
    setCredits,
    currentGameType,
    switchGame,
    showGameSelection,
    returnToGameSelection,
    showDollars,
    creditsToDollars,
    toggleCurrencyDisplay,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

// Custom hook to use the game context
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
