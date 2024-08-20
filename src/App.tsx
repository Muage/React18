import React, { useState } from 'react';
import './App.css';
import Board from './Board';

function Game() {
  const [reverse, setReverse] = useState(true)
  const [currentMove, setCurrentMove] = useState(0)
  const [history, setHistory] = useState([{squares: Array(9).fill(null), location: ''}])

  const currentSquares = history[currentMove].squares
  const xIsNext = currentMove % 2 === 0

  function handlePlay(nextSquares: string[], location: string) {
    const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, location }]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove: any) {
    setCurrentMove(nextMove)
  }

  const moves = history.map((squares, move) => {
    let description
    if(move > 0) {
      description = `Go to move #${move} (${squares.location})`
    } else {
      description = 'Go to game start'
    }
    return (
      <li key={move}>
        {move === currentMove ? (
          <div>당신은 {move + 1}번째 순서에 있습니다…</div>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    )
  })

  const handleOrder = () => {
    setReverse(!reverse)
  }

  if(!reverse) moves.reverse()

  return (
    <div className="game">
      
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div className="game-info">
        <button onClick={handleOrder}>정렬</button>

        <ol>{moves}</ol>
      </div>

    </div>
  )
}

export default Game