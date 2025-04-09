# Video Poker Multi-Game Suite

A modern, web-based Video Poker game built with React and Vite that features multiple poker variants, realistic animations, and casino-style gameplay.

![Video Poker Game Screenshot](screenshot.png)

## Features

### Multiple Game Variants

- **Jacks or Better** - The classic video poker game where pairs of Jacks or higher pay out
- **Bonus Poker** - Enhanced payouts for four of a kind hands
- **Double Bonus Poker** - Even higher payouts for four of a kind hands
- More variants can be easily added to the system

### Gameplay Features

- **Card Animations** - Smooth card dealing and flipping animations
- **Adjustable Speed** - Three speed settings for card animations (Normal, Fast, Turbo)
- **Currency Toggle** - Click on credits to toggle between credit display and dollar value ($0.25 per credit)
- **Shared Credits** - Credits are maintained across all game variants
- **Game Selection Screen** - Easy navigation between different poker variants

### Technical Features

- Built with React and Vite for optimal performance
- Context API for state management across games
- Responsive design that works on various screen sizes
- Modular architecture for easy addition of new game variants

## How to Play

### Basic Rules

1. **Place Your Bet** - Use "BET ONE" to increase your bet or "BET MAX" for maximum bet
2. **Deal Cards** - Click "DEAL" to receive your initial 5-card hand
3. **Hold Cards** - Click on cards you want to keep (they will be marked "HELD")
4. **Draw** - Click "DRAW" to replace cards you didn't hold
5. **Collect Winnings** - If you have a winning hand, credits will be added to your balance

### Game Controls

- **MORE GAMES** - Return to the game selection screen
- **SPEED** - Toggle between Normal (►), Fast (►►), and Turbo (►►►) animation speeds
- **BET ONE** - Increase your bet by one credit (cycles back to 1 after reaching 5)
- **BET MAX** - Set your bet to the maximum (5 credits)
- **SOUND** - Toggle game sounds (not yet implemented)
- **DEAL/DRAW** - Deal a new hand or draw new cards to replace discarded ones

### Winning Hands (from highest to lowest)

- **Royal Flush** - A, K, Q, J, 10 of the same suit
- **Straight Flush** - Five sequential cards of the same suit
- **Four of a Kind** - Four cards of the same value
- **Full House** - Three of a kind plus a pair
- **Flush** - Five cards of the same suit
- **Straight** - Five sequential cards of mixed suits
- **Three of a Kind** - Three cards of the same value
- **Two Pair** - Two different pairs
- **Jacks or Better** - A pair of Jacks, Queens, Kings, or Aces

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/video-poker.git
   cd video-poker
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Start the development server

   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```
npm run build
```

The built files will be in the `dist` directory and can be deployed to any static hosting service.

## Project Structure

```
video-poker/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Card/           # Card component
│   │   ├── Controls/       # Game controls
│   │   ├── GameSelection/  # Game selection screen
│   │   ├── Hand/           # Card hand display
│   │   └── PayTable/       # Pay table display
│   ├── context/            # React context for state management
│   ├── games/              # Individual game implementations
│   │   ├── JacksOrBetterGame.jsx
│   │   ├── BonusPokerGame.jsx
│   │   └── DoubleBonusGame.jsx
│   ├── utils/              # Utility functions
│   │   ├── deckUtils.js    # Deck creation and manipulation
│   │   ├── handEvaluator.js # Hand evaluation logic
│   │   └── payTable.js     # Pay tables for different games
│   ├── App.jsx             # Main application component
│   ├── App.css             # Global styles
│   ├── main.jsx            # Application entry point
│   └── index.css           # Base styles
├── public/                 # Static assets
├── index.html              # HTML template
└── package.json            # Project dependencies and scripts
```

## Extending the Game

### Adding a New Poker Variant

1. Create a new game component in the `src/games/` directory
2. Define the pay table for the new variant
3. Add the game type to the `GAME_TYPES` enum in `GameContext.jsx`
4. Add the game to the `GameSelector` component in `App.jsx`
5. Add the game to the options in `GameSelection.jsx`

## Credits

This project was built with:

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)

## License

MIT License

## Screenshots

### Game Selection Screen

The main screen allows players to choose from multiple poker variants while maintaining their credit balance across all games.

### Gameplay Screen

The gameplay screen features realistic card animations, a pay table, and intuitive controls for an authentic casino experience.

### Features

- **Card Flipping Animation**: Cards flip with a 3D animation when drawn
- **Currency Toggle**: Click on the credits display to switch between credits and dollar value
- **Multiple Game Variants**: Each variant has its own pay table and winning strategies
