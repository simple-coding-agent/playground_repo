import { useState, useEffect, useCallback } from 'react';
import styles from '../styles/SnakeGame.module.css';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // Generate random food position
  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
  }, []);

  // Reset game
  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
  };

  // Check if position is occupied by snake
  const isSnakePosition = (x, y) => {
    return snake.some(segment => segment.x === x && segment.y === y);
  };

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };
        
        head.x += direction.x;
        head.y += direction.y;

        // Check wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (isSnakePosition(head.x, head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(prevScore => prevScore + 10);
          let newFood;
          do {
            newFood = generateFood();
          } while (newSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
          setFood(newFood);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(gameLoop);
  }, [direction, food, gameStarted, gameOver, generateFood]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted && e.key === ' ') {
        setGameStarted(true);
        return;
      }

      if (!gameStarted || gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted, gameOver]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🐍 Snake Game</h1>
      
      <div className={styles.gameInfo}>
        <div className={styles.score}>Score: {score}</div>
        {gameOver && (
          <div className={styles.gameOver}>
            Game Over!
            <button onClick={resetGame} className={styles.resetButton}>
              Play Again
            </button>
          </div>
        )}
        {!gameStarted && !gameOver && (
          <div className={styles.instructions}>
            <p>Use arrow keys to control the snake</p>
            <p>Press SPACE to start</p>
          </div>
        )}
      </div>

      <div className={styles.gameBoard}>
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE;
          const y = Math.floor(index / GRID_SIZE);
          
          const isSnake = snake.some(segment => segment.x === x && segment.y === y);
          const isHead = snake[0] && snake[0].x === x && snake[0].y === y;
          const isFood = food.x === x && food.y === y;
          
          let cellClass = styles.cell;
          if (isSnake) cellClass += ` ${styles.snake}`;
          if (isHead) cellClass += ` ${styles.snakeHead}`;
          if (isFood) cellClass += ` ${styles.food}`;

          return <div key={index} className={cellClass}></div>;
        })}
      </div>

      <div className={styles.controls}>
        <p>🎮 Use arrow keys to move</p>
        <p>🍎 Eat food to grow and score points</p>
        <p>❌ Don't hit walls or yourself!</p>
      </div>
    </div>
  );
}