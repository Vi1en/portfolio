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

  // Snake Game Logic - Simplified
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

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedGame]);

  // Snake Game Loop - Optimized for smooth gameplay
  useEffect(() => {
    if (selectedGame !== 'snake' || snakeGame.gameOver) return;

    const gameInterval = setInterval(() => {
      moveSnake();
    }, 250); // Slightly slower for smoother gameplay

    return () => clearInterval(gameInterval);
  }, [selectedGame, snakeGame.gameOver, moveSnake]);

  // Number Puzzle Logic
  const shufflePuzzle = () => {
    const shuffled = [...puzzle];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setPuzzle(shuffled);
    setPuzzleMoves(0);
  };

  const movePuzzleTile = (index: number) => {
    const newPuzzle = [...puzzle];
    const emptyIndex = newPuzzle.indexOf(0);
    
    // Check if tile can move
    if (
      (index === emptyIndex - 1 && index % 4 !== 3) ||
      (index === emptyIndex + 1 && index % 4 !== 0) ||
      (index === emptyIndex - 4) ||
      (index === emptyIndex + 4)
    ) {
      [newPuzzle[index], newPuzzle[emptyIndex]] = [newPuzzle[emptyIndex], newPuzzle[index]];
      setPuzzle(newPuzzle);
      setPuzzleMoves(prev => prev + 1);
    }
  };

  // Memory Game Logic
  const initMemoryGame = () => {
    const values = ['🐱', '🐶', '🐸', '🐵', '🐼', '🐨', '🐯', '🐮'];
    const cards = [...values, ...values].map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false
    }));
    
    // Shuffle cards
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    
    setMemoryCards(cards);
    setFlippedCards([]);
    setMemoryScore(0);
  };

  const flipCard = (id: number) => {
    if (flippedCards.length >= 2) return;
    
    setMemoryCards(prev => 
      prev.map(card => 
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );
    
    setFlippedCards(prev => [...prev, id]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = memoryCards.find(card => card.id === first);
      const secondCard = memoryCards.find(card => card.id === second);
      
      if (firstCard && secondCard && firstCard.value === secondCard.value) {
        // Match found
        setMemoryCards(prev => 
          prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMemoryScore(prev => prev + 10);
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          setMemoryCards(prev => 
            prev.map(card => 
              card.id === first || card.id === second 
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }, 1000);
      }
      
      setFlippedCards([]);
    }
  }, [flippedCards, memoryCards]);

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
    if (gameName === 'memory') {
      initMemoryGame();
    } else if (gameName === 'puzzle') {
      shufflePuzzle();
    }
  };

  return (
    <RetroWindow
      title="Games"
      onClose={onClose}
      initialSize={{ width: 500, height: 400 }}
    >
      <div className="h-full max-h-full overflow-auto p-2 break-words w-full max-w-[95vw] mx-auto pb-8">
        {!selectedGame ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-retro-green mb-4">🎮 Available Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => startGame('snake')}
                className="retro-button bg-green-900 hover:bg-green-800 text-green-300 p-4 rounded border border-green-600"
              >
                <div className="text-2xl mb-2">🐍</div>
                <div className="font-bold">Snake Game</div>
                <div className="text-sm">Classic snake game</div>
              </button>
              <button
                onClick={() => startGame('puzzle')}
                className="retro-button bg-blue-900 hover:bg-blue-800 text-blue-300 p-4 rounded border border-blue-600"
              >
                <div className="text-2xl mb-2">🧩</div>
                <div className="font-bold">Number Puzzle</div>
                <div className="text-sm">Slide tiles to order</div>
              </button>
              <button
                onClick={() => startGame('memory')}
                className="retro-button bg-purple-900 hover:bg-purple-800 text-purple-300 p-4 rounded border border-purple-600"
              >
                <div className="text-2xl mb-2">🧠</div>
                <div className="font-bold">Memory Game</div>
                <div className="text-sm">Find matching pairs</div>
              </button>
            </div>
          </div>
        ) : selectedGame === 'snake' ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-retro-green">🐍 Snake Game</h2>
              <button onClick={() => setSelectedGame(null)} className="retro-button">
                ← Back
              </button>
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

            {/* Mobile Touch Controls */}
            <div className="flex flex-col items-center gap-1 mt-4 md:hidden">
              {/* Up Button */}
              <button 
                className="w-12 h-12 bg-green-900 hover:bg-green-800 text-green-300 border-2 border-green-600 rounded-lg flex items-center justify-center text-xl font-bold shadow-lg active:scale-95 transition-transform"
                onClick={() => setSnakeGame(prev => 
                  prev.direction.y !== 1 ? { ...prev, direction: { x: 0, y: -1 } } : prev
                )}
              >
                ↑
              </button>
              
              {/* Left, Right Buttons */}
              <div className="flex items-center gap-1">
                <button 
                  className="w-12 h-12 bg-blue-900 hover:bg-blue-800 text-blue-300 border-2 border-blue-600 rounded-lg flex items-center justify-center text-xl font-bold shadow-lg active:scale-95 transition-transform"
                  onClick={() => setSnakeGame(prev => 
                    prev.direction.x !== 1 ? { ...prev, direction: { x: -1, y: 0 } } : prev
                  )}
                >
                  ←
                </button>
                
                <div className="w-12 h-12"></div> {/* Spacer */}
                
                <button 
                  className="w-12 h-12 bg-blue-900 hover:bg-blue-800 text-blue-300 border-2 border-blue-600 rounded-lg flex items-center justify-center text-xl font-bold shadow-lg active:scale-95 transition-transform"
                  onClick={() => setSnakeGame(prev => 
                    prev.direction.x !== -1 ? { ...prev, direction: { x: 1, y: 0 } } : prev
                  )}
                >
                  →
                </button>
              </div>
              
              {/* Down Button */}
              <button 
                className="w-12 h-12 bg-green-900 hover:bg-green-800 text-green-300 border-2 border-green-600 rounded-lg flex items-center justify-center text-xl font-bold shadow-lg active:scale-95 transition-transform"
                onClick={() => setSnakeGame(prev => 
                  prev.direction.y !== -1 ? { ...prev, direction: { x: 0, y: 1 } } : prev
                )}
              >
                ↓
              </button>
            </div>

            {/* Game Instructions */}
            <div className="terminal-font text-xs text-center mt-4">
              {snakeGame.gameOver ? (
                <div className="text-red-500 font-bold">🎮 Game Over! Tap Restart to play again</div>
              ) : (
                <div className="text-green-400">🎮 Use touch controls below or arrow keys to move</div>
              )}
            </div>

            {/* Game Stats */}
            <div className="mt-4 text-center">
              <div className="text-yellow-400 text-sm mb-2">🎯 Score: {snakeGame.snake.length - 1}</div>
              <div className="text-cyan-400 text-xs">🏆 High Score: {Math.max(snakeGame.snake.length - 1, 0)}</div>
            </div>

            {/* Game Controls */}
            <div className="mt-4 flex justify-center gap-2">
              <button 
                className="retro-button bg-green-900 hover:bg-green-800 text-green-300 px-3 py-1 rounded border border-green-600"
                onClick={() => {
                  setSnakeGame({
                    snake: [{ x: 10, y: 10 }],
                    food: { x: 15, y: 15 },
                    direction: { x: 0, y: -1 },
                    gameOver: false,
                    score: 0
                  });
                }}
              >
                🔄 Restart
              </button>
              <button 
                className="retro-button bg-blue-900 hover:bg-blue-800 text-blue-300 px-3 py-1 rounded border border-blue-600"
                onClick={() => {
                  setSnakeGame(prev => ({ ...prev, score: 0 }));
                }}
              >
                🏆 Reset Score
              </button>
            </div>
          </div>
        ) : selectedGame === 'puzzle' ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-retro-green">🧩 Number Puzzle</h2>
              <button onClick={() => setSelectedGame(null)} className="retro-button">
                ← Back
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-1 w-64 h-64 mx-auto">
              {puzzle.map((number, index) => (
                <button
                  key={index}
                  onClick={() => movePuzzleTile(index)}
                  className={`w-16 h-16 text-lg font-bold border-2 ${
                    number === 0 
                      ? 'bg-gray-800 border-gray-600' 
                      : 'bg-blue-600 border-blue-500 hover:bg-blue-500'
                  }`}
                >
                  {number === 0 ? '' : number}
                </button>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-sm mb-2">Moves: {puzzleMoves}</p>
              <button onClick={shufflePuzzle} className="retro-button">
                🔄 Shuffle
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-retro-green">🧠 Memory Game</h2>
              <button onClick={() => setSelectedGame(null)} className="retro-button">
                ← Back
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {memoryCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => flipCard(card.id)}
                  className={`w-16 h-16 text-2xl border-2 ${
                    card.isMatched 
                      ? 'bg-green-600 border-green-500' 
                      : card.isFlipped 
                        ? 'bg-blue-600 border-blue-500' 
                        : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
                  }`}
                >
                  {(card.isFlipped || card.isMatched) ? card.value : ''}
                </button>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-sm mb-2">Score: {memoryScore}</p>
              <button onClick={initMemoryGame} className="retro-button">
                🔄 New Game
              </button>
            </div>
          </div>
        )}
      </div>
    </RetroWindow>
  );
};