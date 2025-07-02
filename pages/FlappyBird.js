import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/FlappyBird.module.css';

const GRAVITY = 1.5;
const FLAP_STRENGTH = 15;
const BIRD_SIZE = 20;
const PIPE_WIDTH = 50;
const PIPE_GAP = 200;

const FlappyBird = () => {
    const [birdPosition, setBirdPosition] = useState(250);
    const [gameStarted, setGameStarted] = useState(false);
    const [pipes, setPipes] = useState([]);
    const [score, setScore] = useState(0);
    const gameAreaRef = useRef(null);
    let gameLoop = useRef(null);

    useEffect(() => {
        const handleSpacebar = (e) => {
            if (e.code === 'Space') {
                if (!gameStarted) {
                    setGameStarted(true);
                }
                setBirdPosition((pos) => Math.max(pos - FLAP_STRENGTH, 0));
            }
        };

        window.addEventListener('keydown', handleSpacebar);
        return () => window.removeEventListener('keydown', handleSpacebar);
    }, [gameStarted]);

    useEffect(() => {
        if (gameStarted) {
            const gameTick = () => {
                setBirdPosition((pos) => Math.min(pos + GRAVITY, gameAreaRef.current.clientHeight - BIRD_SIZE));
                setPipes((prevPipes) => {
                    // Move pipes left
                    const newPipes = prevPipes.map(pipe => ({ ...pipe, x: pipe.x - 5 }));

                    // Check for pipes out of bounds
                    if (newPipes.length > 0 && newPipes[0].x < -PIPE_WIDTH) {
                        newPipes.shift(); // Remove the first pipe
                        setScore((prevScore) => prevScore + 1);
                    }

                    // Add new pipes
                    if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < gameAreaRef.current.clientWidth - PIPE_GAP) {
                        const topHeight = Math.random() * (gameAreaRef.current.clientHeight - PIPE_GAP);
                        newPipes.push({ x: gameAreaRef.current.clientWidth, topHeight });
                    }

                    return newPipes;
                });
            };

            if (!gameLoop.current) {
                gameLoop.current = setInterval(gameTick, 20);
            }

            return () => clearInterval(gameLoop.current);
        }
    }, [gameStarted]);

    return (
        <div className={styles.gameArea} ref={gameAreaRef}>
            <div className={styles.bird} style={{ top: birdPosition }} />
            {pipes.map((pipe, index) => (
                <div key={index} className={styles.pipe} style={{ left: pipe.x, height: pipe.topHeight }} />
            ))}
            <div className={styles.score}>Score: {score}</div>
        </div>
    );
};

export default FlappyBird;
