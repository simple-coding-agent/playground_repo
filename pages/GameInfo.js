import React from 'react';
import styles from '../styles/SnakeGame.module.css';

const GameInfo = ({ score, gameOver, resetGame, gameStarted }) => {
  return (
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
  );
};

export default GameInfo;
