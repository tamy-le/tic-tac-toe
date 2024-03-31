import { useState } from "react";
import Board from "./Board";
import checkWinner from "./WinnerCheck";

const Game = () => {
  const minGridSize = 3;
  const maxGridSize = 10;
  const [inputGridSize, setInputGridSize] = useState(minGridSize);
  const [history, setHistory] = useState([Array(minGridSize ** 2).fill("")]);
  const [gridSize, setGridSize] = useState(minGridSize);
  const [currentMove, setCurrentMove] = useState(0);
  const [status, setStatus] = useState("Game Start");
  const [winner, setWinner] = useState();

  const handleClickedSquare = (index) => {
    if (history[currentMove][index] || winner) {
      return;
    }
    const newBoard = [...history[currentMove]];
    newBoard[index] = currentMove % 2 == 0 ? "X" : "O";
    setHistory([...history, newBoard]);
    setCurrentMove(currentMove + 1);
    setStatus(`Next player: ${newBoard[index] == "O" ? "X" : "O"}`);
    if (checkWinner(newBoard, index, gridSize)) {
      setWinner(newBoard[index]);
      setStatus(`Winner is ${newBoard[index]}`);
    }
  };

  const handleGridSize = (event) => {
    let newSize = parseInt(event.target.value);
    if (isNaN(newSize)) {
      newSize = minGridSize;
    }
    if (newSize >= minGridSize && newSize <= maxGridSize) {
      setGridSize(newSize);
      setHistory(Array(newSize ** 2).fill(""));
      setStatus("Game Start");
      setWinner("");
      setCurrentMove(0);
    }
    setInputGridSize(newSize);
  };

  const moves = history.map((squares, move) => {
    let description = move > 0 ? `Go to move #${move}` : "Go to game start";
    return <li>{description}</li>;
  });
  return (
    <main className="ml-5 flex">
      <div className="block pb-5 text-white">
        <input
          className="text-black"
          name="grid-size"
          type="number"
          value={inputGridSize}
          min={3}
          max={10}
          onChange={handleGridSize}
        />

        <h1>{status}</h1>
        <div className="flex">
          <Board
            gridSize={gridSize}
            currentBoard={history[currentMove]}
            handleClickedSquare={handleClickedSquare}
          />
          <ol className="ml-10">{moves}</ol>
        </div>
      </div>
    </main>
  );
};
export default Game;
