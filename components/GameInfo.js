import React from 'react';
import styles from '../styles/GameInfo.module.css';

const GameInfo = ({ score, gameOver, resetGame, gameStarted }) => {
  return (
    <div className={styles.gameInfo}>
      <div className={styles.score}>Score: {score}</div>
      {gameOver && <div className={styles.gameOver}>Game Over</div>}
      {gameStarted ? (
        <button className={styles.resetButton} onClick={resetGame}>Reset Game</button>
      ) : (
        <div className={styles.instructions}>
          <p>Press Space to Start</p>
        </div>
      )}
    </div>
  );
};

export default GameInfo;
