import React, { useState } from 'react';
import './App.css';

interface SquareProps {
  value: string
  win: boolean
  onSquareClick: () => void
}

interface BoardProps {
  xIsNext: boolean
  squares: string[]
  onPlay: (nextSquares: string[], location: string) => void
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ]

  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i]
      }
    }
  }
  return null
}

function getLocation(index: number) {
  const col = index % 3 + 1
  const row = Math.floor(index / 3) + 1
  return `${col}, ${row}`
}

function Square({ value, win, onSquareClick }: SquareProps) {
  return (
    <button className={`square ${win ? 'win' : ''}`} onClick={onSquareClick}>{value}</button>
  )
}

function Board({ xIsNext, squares, onPlay}: BoardProps) {
  const winInfo = calculateWinner(squares)
  const winner = winInfo ? winInfo.winner : ""
  const winLine = winInfo ? winInfo.line : []
  let status

  if(winner) {
    status = "Winner: " + winner
  } else if(squares.every(Boolean)) {
    status = "Draw!"
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  const handleClick = (index: number) => {
    if(squares[index] || calculateWinner(squares)) {
      return
    }

    const nextSquares = squares.slice()
    if(xIsNext) {
      nextSquares[index] = "X"
    } else {
      nextSquares[index] = "O"
    }
    onPlay(nextSquares, getLocation(index))
  }

  const renderSquares = () => {
    let cols = []
    for(let i = 0; i < 3; i++) {
      let rows = []
      for(let j = 0; j < 3; j++) {
        const index = i * 3 + j
        rows.push(<Square key={j} value={squares[index]} win={winLine.includes(index)} onSquareClick={() => handleClick(index)} />)
      }
      cols.push(<div key={i} className="board-row">{rows}</div>)
    }
    return cols
  }

  return (
    <>
    <div className="status">{status}</div>
    {renderSquares()}
    </>
  )
}

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