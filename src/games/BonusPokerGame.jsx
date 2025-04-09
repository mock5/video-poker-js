import { useState, useEffect } from 'react';
import Hand from '../components/Hand/Hand';
import PayTable from '../components/PayTable/PayTable';
import Controls from '../components/Controls/Controls';
import { createDeck, shuffleDeck, dealCards, replaceCards } from '../utils/deckUtils';
import { evaluateHand } from '../utils/handEvaluator';
import { useGameContext } from '../context/GameContext';

// Bonus Poker pay table (different from Jacks or Better)
const bonusPayTable = {
  ROYAL_FLUSH: [250, 500, 750, 1000, 4000],
  STRAIGHT_FLUSH: [50, 100, 150, 200, 250],
  FOUR_OF_A_KIND: [40, 80, 120, 160, 200], // Higher payout for four of a kind
  FULL_HOUSE: [8, 16, 24, 32, 40],
  FLUSH: [5, 10, 15, 20, 25],
  STRAIGHT: [4, 8, 12, 16, 20],
  THREE_OF_A_KIND: [3, 6, 9, 12, 15],
  TWO_PAIR: [2, 4, 6, 8, 10],
  JACKS_OR_BETTER: [1, 2, 3, 4, 5],
  NO_WIN: [0, 0, 0, 0, 0]
};

function BonusPokerGame() {
  const { credits, setCredits } = useGameContext();
  
  // Game state
  const [deck, setDeck] = useState([]);
  const [hand, setHand] = useState(Array(5).fill(null));
  const [heldCards, setHeldCards] = useState(Array(5).fill(false));
  const [gamePhase, setGamePhase] = useState('betting'); // betting, drawing, gameOver
  const [currentBet, setCurrentBet] = useState(1);
  const [handResult, setHandResult] = useState({ type: 'NO_WIN', multiplier: 0 });
  const [winAmount, setWinAmount] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(1); // 1: normal, 2: fast, 3: turbo
  const [isFlipping, setIsFlipping] = useState(false); // Track when cards are flipping

  // Initialize the game
  useEffect(() => {
    resetDeck();
  }, []);

  // Reset the deck
  const resetDeck = () => {
    const newDeck = shuffleDeck(createDeck());
    setDeck(newDeck);
  };

  // Handle card click (hold/unhold)
  const handleCardClick = (index) => {
    if (gamePhase !== 'drawing') return;

    const newHeldCards = [...heldCards];
    newHeldCards[index] = !newHeldCards[index];
    setHeldCards(newHeldCards);
  };

  // Handle deal/draw button
  const handleDeal = () => {
    if (gamePhase === 'betting' || gamePhase === 'gameOver') {
      // Deal new hand
      if (credits < currentBet) return; // Not enough credits

      setCredits(credits - currentBet);
      setWinAmount(0);
      setHandResult({ type: 'NO_WIN', multiplier: 0 });

      const newDeck = [...deck];
      const newHand = dealCards(newDeck, 5);

      // Remove dealt cards from deck
      newDeck.splice(0, 5);

      setDeck(newDeck);
      setHand(newHand);
      setHeldCards(Array(5).fill(false));
      setGamePhase('drawing');
    } else if (gamePhase === 'drawing') {
      // Draw new cards for unheld positions
      const newDeck = [...deck];
      const newHand = replaceCards(hand, newDeck, heldCards);

      // Count how many cards were replaced
      const replacedCount = heldCards.filter(held => !held).length;

      // Remove drawn cards from deck
      newDeck.splice(0, replacedCount);

      // Set flipping animation state
      setIsFlipping(true);

      // Update the deck and hand
      setDeck(newDeck);
      setHand(newHand);

      // After the flip animation completes, evaluate the hand
      const flipDuration = 1000 / gameSpeed; // Base duration for the flip animation
      const evaluationDelay = flipDuration + (300 * 5 / gameSpeed); // Total time for all cards to flip

      setTimeout(() => {
        // Evaluate the hand
        const result = evaluateHand(newHand);
        setHandResult(result);

        // Calculate winnings using Bonus Poker pay table
        const win = bonusPayTable[result.type][currentBet - 1];
        setWinAmount(win);
        setCredits(credits + win);

        setGamePhase('gameOver');
        setIsFlipping(false);
      }, evaluationDelay);
    }
  };

  // Handle bet one button
  const handleBetOne = () => {
    if (gamePhase !== 'betting' && gamePhase !== 'gameOver') return;
    setCurrentBet(currentBet < 5 ? currentBet + 1 : 1);

    // If we're in gameOver phase, switch back to betting phase
    if (gamePhase === 'gameOver') {
      setGamePhase('betting');
    }
  };

  // Handle bet max button
  const handleBetMax = () => {
    if (gamePhase !== 'betting' && gamePhase !== 'gameOver') return;
    setCurrentBet(5);

    // If we're in gameOver phase, switch back to betting phase
    if (gamePhase === 'gameOver') {
      setGamePhase('betting');
    }
  };

  // Handle speed button
  const handleSpeedToggle = () => {
    // Cycle through speeds: 1 (normal) -> 2 (fast) -> 3 (turbo) -> 1 (normal)
    setGameSpeed(prevSpeed => prevSpeed < 3 ? prevSpeed + 1 : 1);
  };

  return (
    <div className="video-poker">
      <h1>Bonus Poker</h1>

      <PayTable
        currentBet={currentBet}
        currentHandType={handResult.type}
        customPayTable={bonusPayTable}
      />

      <Hand
        cards={hand}
        heldCards={heldCards}
        onCardClick={handleCardClick}
        gameSpeed={gameSpeed}
        isFlipping={isFlipping}
      />

      <Controls
        gamePhase={gamePhase}
        onDeal={handleDeal}
        onBetOne={handleBetOne}
        onBetMax={handleBetMax}
        onSpeedToggle={handleSpeedToggle}
        currentBet={currentBet}
        credits={credits}
        winAmount={winAmount}
        gameSpeed={gameSpeed}
      />
    </div>
  );
}

export default BonusPokerGame;
