import React, { useState, useEffect, useCallback } from 'react';
import { RetroWindow } from './RetroWindow';

interface GamesWindowProps {
  onClose?: () => void;
}

interface SnakeGameState {
  snake: { x: number; y: number }[];
  food: { x: number; y: number };
  direction: { x: number; y: number };
  gameOver: boolean;
  score: number;
}

interface MemoryCard {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const GamesWindow: React.FC<GamesWindowProps> = ({ onClose }) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // Snake Game State
  const [snakeGame, setSnakeGame] = useState<SnakeGameState>({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: { x: 0, y: -1 },
    gameOver: false,
    score: 0
  });

  // Number Puzzle State
  const [puzzle, setPuzzle] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]);
  const [puzzleMoves, setPuzzleMoves] = useState(0);

  // Memory Game State
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryScore, setMemoryScore] = useState(0);

  // Snake Game Logic
  const moveSnake = useCallback(() => {
    if (snakeGame.gameOver) return;

    setSnakeGame(prev => {
      const newSnake = [...prev.snake];
      const head = { ...newSnake[0] };
      head.x += prev.direction.x;
      head.y += prev.direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
        return { ...prev, gameOver: true };
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        return { ...prev, gameOver: true };
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === prev.food.x && head.y === prev.food.y) {
        const newFood = {
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20)
        };
        return {
          ...prev,
          snake: newSnake,
          food: newFood,
          score: prev.score + 10
        };
      } else {
        newSnake.pop();
        return { ...prev, snake: newSnake };
      }
    });
  }, [snakeGame.gameOver]);

  // Snake Game Controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedGame !== 'snake') return;
      
      setSnakeGame(prev => {
        switch (e.key) {
          case 'ArrowUp':
            return prev.direction.y !== 1 ? { ...prev, direction: { x: 0, y: -1 } } : prev;
          case 'ArrowDown':
            return prev.direction.y !== -1 ? { ...prev, direction: { x: 0, y: 1 } } : prev;
          case 'ArrowLeft':
            return prev.direction.x !== 1 ? { ...prev, direction: { x: -1, y: 0 } } : prev;
          case 'ArrowRight':
            return prev.direction.x !== -1 ? { ...prev, direction: { x: 1, y: 0 } } : prev;
          default:
            return prev;
        }
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedGame]);

  // Snake Game Timer
  useEffect(() => {
    if (selectedGame === 'snake' && !snakeGame.gameOver) {
      const gameLoop = setInterval(moveSnake, 150);
      return () => clearInterval(gameLoop);
    }
  }, [selectedGame, moveSnake, snakeGame.gameOver]);

  // Initialize Puzzle
  const shufflePuzzle = () => {
    const shuffled = [...puzzle];
    for (let i = 0; i < 1000; i++) {
      const emptyIndex = shuffled.indexOf(0);
      const neighbors = [];
      if (emptyIndex % 4 !== 0) neighbors.push(emptyIndex - 1);
      if (emptyIndex % 4 !== 3) neighbors.push(emptyIndex + 1);
      if (emptyIndex >= 4) neighbors.push(emptyIndex - 4);
      if (emptyIndex < 12) neighbors.push(emptyIndex + 4);
      
      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      [shuffled[emptyIndex], shuffled[randomNeighbor]] = [shuffled[randomNeighbor], shuffled[emptyIndex]];
    }
    setPuzzle(shuffled);
    setPuzzleMoves(0);
  };

  // Puzzle Move Logic
  const movePuzzleTile = (index: number) => {
    const emptyIndex = puzzle.indexOf(0);
    const isAdjacent = 
      (Math.abs(index - emptyIndex) === 1 && Math.floor(index / 4) === Math.floor(emptyIndex / 4)) ||
      Math.abs(index - emptyIndex) === 4;

    if (isAdjacent) {
      const newPuzzle = [...puzzle];
      [newPuzzle[index], newPuzzle[emptyIndex]] = [newPuzzle[emptyIndex], newPuzzle[index]];
      setPuzzle(newPuzzle);
      setPuzzleMoves(prev => prev + 1);
    }
  };

  // Initialize Memory Game
  const initMemoryGame = () => {
    const symbols = ['🍎', '🍌', '🍇', '🍊', '🍓', '🥝', '🍒', '🥭'];
    const cards: MemoryCard[] = [];
    
    symbols.forEach((symbol, index) => {
      cards.push(
        { id: index * 2, value: symbol, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, value: symbol, isFlipped: false, isMatched: false }
      );
    });
    
    // Shuffle cards
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    
    setMemoryCards(cards);
    setFlippedCards([]);
    setMemoryScore(0);
  };

  // Memory Game Logic
  const flipCard = (id: number) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(id)) return;
    if (memoryCards.find(card => card.id === id)?.isMatched) return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    setMemoryCards(prev => 
      prev.map(card => 
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );

    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;
      const firstCard = memoryCards.find(card => card.id === first);
      const secondCard = memoryCards.find(card => card.id === second);

      if (firstCard?.value === secondCard?.value) {
        setTimeout(() => {
          setMemoryCards(prev => 
            prev.map(card => 
              card.id === first || card.id === second 
                ? { ...card, isMatched: true } 
                : card
            )
          );
          setFlippedCards([]);
          setMemoryScore(prev => prev + 10);
        }, 500);
      } else {
        setTimeout(() => {
          setMemoryCards(prev => 
            prev.map(card => 
              card.id === first || card.id === second 
                ? { ...card, isFlipped: false } 
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    if (selectedGame === 'snake') {
      setSnakeGame({
        snake: [{ x: 10, y: 10 }],
        food: { x: 15, y: 15 },
        direction: { x: 0, y: -1 },
        gameOver: false,
        score: 0
      });
    } else if (selectedGame === 'puzzle') {
      shufflePuzzle();
    } else if (selectedGame === 'memory') {
      initMemoryGame();
    }
  };

  const startGame = (gameName: string) => {
    setSelectedGame(gameName);
    if (gameName === 'puzzle') {
      shufflePuzzle();
    } else if (gameName === 'memory') {
      initMemoryGame();
    }
  };

  return (
    <RetroWindow
      title="Games.exe - Retro Arcade"
      onClose={onClose}
      initialPosition={{ x: 400, y: 150 }}
      initialSize={{ width: 450, height: 500 }}
    >
      <div className="space-y-4">
        {!selectedGame ? (
          <>
            <div className="pixel-font text-sm text-accent mb-3">🎮 Select Your Game</div>
            
            <div className="space-y-3">
              <button 
                className="w-full p-3 border border-border rounded retro-button text-left"
                onClick={() => startGame('snake')}
              >
                <div className="pixel-font text-xs text-retro-green mb-1">🐍 Snake Classic</div>
                <div className="terminal-font text-xs">Use arrow keys to eat food!</div>
              </button>
              
              <button 
                className="w-full p-3 border border-border rounded retro-button text-left"
                onClick={() => startGame('puzzle')}
              >
                <div className="pixel-font text-xs text-retro-blue mb-1">🧩 15-Puzzle</div>
                <div className="terminal-font text-xs">Slide tiles to arrange 1-15</div>
              </button>
              
              <button 
                className="w-full p-3 border border-border rounded retro-button text-left"
                onClick={() => startGame('memory')}
              >
                <div className="pixel-font text-xs text-retro-orange mb-1">🧠 Memory Match</div>
                <div className="terminal-font text-xs">Find matching pairs!</div>
              </button>
            </div>

            <div className="bg-terminal-bg p-3 rounded border border-retro-green mt-4">
              <div className="pixel-font text-xs text-retro-green mb-2">💡 Pro Tip</div>
              <div className="terminal-font text-xs">
                All games are fully playable with real mechanics! 🎯
              </div>
            </div>
          </>
        ) : selectedGame === 'snake' ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="pixel-font text-sm text-accent">🐍 Snake Game</div>
              <div className="pixel-font text-xs">Score: {snakeGame.score}</div>
            </div>
            
            <div className="bg-black p-2 rounded border-2 border-retro-green">
              <div className="grid grid-cols-20 gap-0" style={{ width: '300px', height: '300px' }}>
                {Array.from({ length: 400 }).map((_, index) => {
                  const x = index % 20;
                  const y = Math.floor(index / 20);
                  const isSnake = snakeGame.snake.some(segment => segment.x === x && segment.y === y);
                  const isFood = snakeGame.food.x === x && snakeGame.food.y === y;
                  const isHead = snakeGame.snake[0]?.x === x && snakeGame.snake[0]?.y === y;
                  
                  return (
                    <div
                      key={index}
                      className={`w-[15px] h-[15px] ${
                        isHead ? 'bg-retro-blue' :
                        isSnake ? 'bg-retro-green' :
                        isFood ? 'bg-retro-orange' :
                        'bg-black'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            <div className="terminal-font text-xs text-center">
              {snakeGame.gameOver ? (
                <div className="text-red-500">Game Over! Use arrow keys to play</div>
              ) : (
                <div>Use arrow keys to move 🎮</div>
              )}
            </div>

            <div className="flex gap-2 justify-center">
              <button className="retro-button text-xs" onClick={resetGame}>
                🔄 New Game
              </button>
              <button className="retro-button text-xs" onClick={() => setSelectedGame(null)}>
                🏠 Back to Menu
              </button>
            </div>
          </div>
        ) : selectedGame === 'puzzle' ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="pixel-font text-sm text-accent">🧩 15-Puzzle</div>
              <div className="pixel-font text-xs">Moves: {puzzleMoves}</div>
            </div>
            
            <div className="grid grid-cols-4 gap-1 w-fit mx-auto bg-muted p-2 rounded">
              {puzzle.map((number, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 flex items-center justify-center text-xs font-bold cursor-pointer
                    ${number === 0 ? 'bg-transparent' : 'bg-window-header border border-window-border retro-button'}
                  `}
                  onClick={() => movePuzzleTile(index)}
                >
                  {number !== 0 && number}
                </div>
              ))}
            </div>

            <div className="terminal-font text-xs text-center">
              Click tiles next to empty space to move them
            </div>

            <div className="flex gap-2 justify-center">
              <button className="retro-button text-xs" onClick={shufflePuzzle}>
                🔀 Shuffle
              </button>
              <button className="retro-button text-xs" onClick={() => setSelectedGame(null)}>
                🏠 Back to Menu
              </button>
            </div>
          </div>
        ) : selectedGame === 'memory' ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="pixel-font text-sm text-accent">🧠 Memory Match</div>
              <div className="pixel-font text-xs">Score: {memoryScore}</div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 w-fit mx-auto">
              {memoryCards.map((card) => (
                <div
                  key={card.id}
                  className={`w-12 h-12 flex items-center justify-center text-lg cursor-pointer rounded border-2
                    ${card.isFlipped || card.isMatched 
                      ? 'bg-white border-retro-green' 
                      : 'bg-muted border-border retro-button'}
                  `}
                  onClick={() => flipCard(card.id)}
                >
                  {(card.isFlipped || card.isMatched) ? card.value : '?'}
                </div>
              ))}
            </div>

            <div className="terminal-font text-xs text-center">
              Click cards to flip and find matching pairs!
            </div>

            <div className="flex gap-2 justify-center">
              <button className="retro-button text-xs" onClick={initMemoryGame}>
                🔄 New Game
              </button>
              <button className="retro-button text-xs" onClick={() => setSelectedGame(null)}>
                🏠 Back to Menu
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </RetroWindow>
  );
};