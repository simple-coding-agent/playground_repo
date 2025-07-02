import React from 'react';
import styles from '../styles/SnakeGame.module.css';

const GameBoard = ({ snake, food, GRID_SIZE }) => {
  return (
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
  );
};

export default GameBoard;
