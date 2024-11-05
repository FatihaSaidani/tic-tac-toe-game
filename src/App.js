import React from "react";
import Game from "./components/Game"
import './App.css';

// Renders title, description, confetti, and Game component
function App () {
  return (
    <>
    <h1 id="title">Tic-Tac-Toe</h1>
    <p id="description">The classic, much loved game of noughts and crosses!</p>
    <div id="confetti"></div>
    <Game/>
    </>
  );
}
export default App;