// Card suits and values
export const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
export const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Create a new deck of cards
export const createDeck = () => {
  const deck = [];
  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push({ suit, value });
    }
  }
  return deck;
};

// Shuffle the deck using Fisher-Yates algorithm
export const shuffleDeck = (deck) => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Deal a specific number of cards from the deck
export const dealCards = (deck, count) => {
  return deck.slice(0, count);
};

// Replace cards in the hand that are not held
export const replaceCards = (hand, deck, heldCards) => {
  const newHand = [...hand];
  let deckIndex = 0;
  
  for (let i = 0; i < hand.length; i++) {
    if (!heldCards[i]) {
      newHand[i] = deck[deckIndex];
      deckIndex++;
    }
  }
  
  return newHand;
};
