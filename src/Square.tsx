interface SquareProps {
    value: string
    win: boolean
    onSquareClick: () => void
}
  
export default function Square({ value, win, onSquareClick }: SquareProps) {
    return (
      <button className={`square ${win ? 'win' : ''}`} onClick={onSquareClick}>{value}</button>
    )
}