import Square from './Square';

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

export default function Board({ xIsNext, squares, onPlay}: BoardProps) {
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