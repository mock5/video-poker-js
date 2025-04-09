// Pay table for Double Double Video Poker
export const payTable = {
  ROYAL_FLUSH: [250, 500, 750, 1000, 4000],
  STRAIGHT_FLUSH: [50, 100, 150, 200, 250],
  FOUR_OF_A_KIND: [25, 50, 75, 100, 125],
  FULL_HOUSE: [9, 18, 27, 36, 45],
  FLUSH: [6, 12, 18, 24, 30],
  STRAIGHT: [4, 8, 12, 16, 20],
  THREE_OF_A_KIND: [3, 6, 9, 12, 15],
  TWO_PAIR: [2, 4, 6, 8, 10],
  JACKS_OR_BETTER: [1, 2, 3, 4, 5],
  NO_WIN: [0, 0, 0, 0, 0]
};

// Readable names for hand types
export const handTypeNames = {
  ROYAL_FLUSH: 'ROYAL FLUSH',
  STRAIGHT_FLUSH: 'STRAIGHT FLUSH',
  FOUR_OF_A_KIND: '4 ACES W/ 2,3,4',
  FULL_HOUSE: 'FULL HOUSE',
  FLUSH: 'FLUSH',
  STRAIGHT: 'STRAIGHT',
  THREE_OF_A_KIND: '3 OF A KIND',
  TWO_PAIR: 'TWO PAIR',
  JACKS_OR_BETTER: 'JACKS OR BETTER',
  NO_WIN: ''
};
