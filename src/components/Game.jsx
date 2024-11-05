import React, { useEffect, useState } from "react";
import Board from "./Board";



// Main function, initializes state for game logic (turn, board, and confetti visibility)
function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [showConfetti, setShowConfetti] = useState(false);

    function handlePlay(nextSquares) {
        // Update the squares 
        setSquares(nextSquares);
        setXIsNext(!xIsNext); // Switch turns
    }

    // Calculate the winner and print onto webpage
    const winner = calculateWinner(squares);
    const isBoardFull = squares.every(square => square !== null);
    const status = winner 
        ? `The winner is: ${winner} !` 
        : isBoardFull 
            ? "It's a tie! Try Again." 
            : `Next player: ${xIsNext ? "X" : "O"}`;

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        // Using a for loop in order to calculate the winner 
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    // Function for creating a reset button

    function handleReset() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        setShowConfetti(false);

        
        
        const confettiContainer = document.getElementById("confetti");
        if (confettiContainer) {
            confettiContainer.innerHTML = ""; // Clear previous confetti
        }
    }

    // function that allows for the confetti to appear when the game is won
    function generateConfetti() {
        const confettiContainer = document.getElementById("confetti");
        confettiContainer.innerHTML = ""; // Clear previous confetti

        const colorClasses = [
            "red",
            "green",
            "blue",
            "yellow",
            "magenta",
            "cyan",
            "orange",
            "pink",
            "lime",
            "indigo"
        ];

        // A for loop that randomizes the colours falling
        for (let i = 0; i < 100; i++) {
            const ball = document.createElement("div");
            ball.className = `ball ${colorClasses[Math.floor(Math.random() * colorClasses.length)]}`;
            ball.style.left = `${Math.random() * 100}vw`;
            ball.style.animationDuration = `${Math.random() * 2 + 3}s`;
            confettiContainer.appendChild(ball);
        }
    }

    // Ensuring the confetti only falls when a player has won
    useEffect(() => {
        if (winner) {
            setShowConfetti(true);
            generateConfetti();
        }
    }, [winner]);


    // Main return statement for the game function, rendering all the elements above
    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <div className="status">{status}</div>
                <button id="resetButton" onClick={handleReset} style={{ marginTop: '20px' }}>Reset Game</button>
            </div>
            {showConfetti && <div id="confetti"></div>}
        </div>
    );
}

export default Game;
