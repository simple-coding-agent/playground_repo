import React from 'react';
import styles from '../styles/GameBoard.module.css';

const GameBoard = ({ snake, food, GRID_SIZE }) => {
  const createGrid = () => {
    let grid = [];

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        let snakeSegment = snake.find(segment => segment.x === x && segment.y === y);
        let className = styles.cell;

        if (snakeSegment) {
          className = snakeSegment === snake[0] ? styles.snakeHead : styles.snake;
        } else if (food.x === x && food.y === y) {
          className = styles.food;
        }

        grid.push(<div key={`${x}-${y}`} className={className}></div>);
      }
    }

    return grid;
  };

  return (
    <div className={styles.gameBoard}>
      {createGrid()}
    </div>
  );
};

export default GameBoard;
