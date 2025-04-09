// Hand evaluation functions for Video Poker

// Get the counts of each card value in the hand
const getValueCounts = (hand) => {
  const valueCounts = {};
  hand.forEach(card => {
    valueCounts[card.value] = (valueCounts[card.value] || 0) + 1;
  });
  return valueCounts;
};

// Get the counts of each suit in the hand
const getSuitCounts = (hand) => {
  const suitCounts = {};
  hand.forEach(card => {
    suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
  });
  return suitCounts;
};

// Check if the hand is a flush (all cards of the same suit)
const isFlush = (hand) => {
  const suits = getSuitCounts(hand);
  return Object.values(suits).some(count => count === 5);
};

// Check if the hand is a straight (5 cards in sequence)
const isStraight = (hand) => {
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const cardValues = hand.map(card => values.indexOf(card.value)).sort((a, b) => a - b);
  
  // Check for A-5 straight
  if (JSON.stringify(cardValues) === JSON.stringify([0, 1, 2, 3, 12])) {
    return true;
  }
  
  // Check for regular straight
  for (let i = 1; i < cardValues.length; i++) {
    if (cardValues[i] !== cardValues[i-1] + 1) {
      return false;
    }
  }
  return true;
};

// Check if the hand is a royal flush (A, K, Q, J, 10 of the same suit)
const isRoyalFlush = (hand) => {
  if (!isFlush(hand)) return false;
  
  const values = hand.map(card => card.value).sort();
  return JSON.stringify(values) === JSON.stringify(['10', 'A', 'J', 'K', 'Q']);
};

// Check if the hand is a straight flush (straight of the same suit)
const isStraightFlush = (hand) => {
  return isFlush(hand) && isStraight(hand) && !isRoyalFlush(hand);
};

// Check for four of a kind
const isFourOfAKind = (hand) => {
  const valueCounts = getValueCounts(hand);
  return Object.values(valueCounts).includes(4);
};

// Check for full house (three of a kind and a pair)
const isFullHouse = (hand) => {
  const valueCounts = getValueCounts(hand);
  const counts = Object.values(valueCounts);
  return counts.includes(3) && counts.includes(2);
};

// Check for three of a kind
const isThreeOfAKind = (hand) => {
  const valueCounts = getValueCounts(hand);
  return Object.values(valueCounts).includes(3) && !isFullHouse(hand);
};

// Check for two pair
const isTwoPair = (hand) => {
  const valueCounts = getValueCounts(hand);
  const pairs = Object.values(valueCounts).filter(count => count === 2);
  return pairs.length === 2;
};

// Check for jacks or better (a pair of jacks, queens, kings, or aces)
const isJacksOrBetter = (hand) => {
  const valueCounts = getValueCounts(hand);
  const highCards = ['J', 'Q', 'K', 'A'];
  
  for (const value of highCards) {
    if (valueCounts[value] === 2) {
      return true;
    }
  }
  return false;
};

// Check for a pair (but not jacks or better)
const isPair = (hand) => {
  const valueCounts = getValueCounts(hand);
  const pairs = Object.values(valueCounts).filter(count => count === 2);
  return pairs.length === 1 && !isJacksOrBetter(hand);
};

// Evaluate the hand and return the highest ranking hand
export const evaluateHand = (hand) => {
  if (isRoyalFlush(hand)) return { type: 'ROYAL_FLUSH', multiplier: 250 };
  if (isStraightFlush(hand)) return { type: 'STRAIGHT_FLUSH', multiplier: 50 };
  if (isFourOfAKind(hand)) return { type: 'FOUR_OF_A_KIND', multiplier: 25 };
  if (isFullHouse(hand)) return { type: 'FULL_HOUSE', multiplier: 9 };
  if (isFlush(hand)) return { type: 'FLUSH', multiplier: 6 };
  if (isStraight(hand)) return { type: 'STRAIGHT', multiplier: 4 };
  if (isThreeOfAKind(hand)) return { type: 'THREE_OF_A_KIND', multiplier: 3 };
  if (isTwoPair(hand)) return { type: 'TWO_PAIR', multiplier: 2 };
  if (isJacksOrBetter(hand)) return { type: 'JACKS_OR_BETTER', multiplier: 1 };
  return { type: 'NO_WIN', multiplier: 0 };
};
