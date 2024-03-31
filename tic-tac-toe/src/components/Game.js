import { useState } from "react";
import Board from "./Board";
import { checkWinner, checkDraw, convertIndexToRowCol } from "./WinnerCheck";

const Game = () => {
  const minGridSize = 3;
  const maxGridSize = 10;
  const [inputGridSize, setInputGridSize] = useState(minGridSize);
  const [history, setHistory] = useState([
    { squares: Array(minGridSize ** 2).fill(""), index: -1 },
  ]);
  const [gridSize, setGridSize] = useState(minGridSize);
  const [currentMove, setCurrentMove] = useState(0);
  const [status, setStatus] = useState("Game Start");
  const [winner, setWinner] = useState("");
  const [toggle, setToggle] = useState(false);
  const [winningSquares, setWinningSquares] = useState();

  const handleClickedSquare = (index) => {
    if (
      history[currentMove].squares[index] ||
      currentMove != history.length - 1 ||
      winner
    ) {
      return;
    }
    const newBoard = [...history[currentMove].squares];
    newBoard[index] = currentMove % 2 == 0 ? "X" : "O";
    setHistory([...history, { squares: newBoard, index: index }]);
    setCurrentMove(currentMove + 1);
    let statusHolder = `Next player: ${newBoard[index] == "O" ? "X" : "O"}`;
    let wonSquares = checkWinner(newBoard, index, gridSize);
    if (wonSquares) {
      setWinner(newBoard[index]);
      setWinningSquares(wonSquares);
      statusHolder = `Winner is ${newBoard[index]}`;
    } else if (checkDraw(newBoard)) {
      statusHolder = "Draw! You guys suck";
    }
    setStatus(statusHolder);
  };

  const handleGridSize = (event) => {
    let newSize = parseInt(event.target.value);
    if (isNaN(newSize)) {
      newSize = minGridSize;
    }
    if (newSize >= minGridSize && newSize <= maxGridSize) {
      setGridSize(newSize);
      setHistory([{ squares: Array(newSize ** 2).fill(""), index: -1 }]);
      setStatus("Game Start");
      setWinner("");
      setCurrentMove(0);
      setWinningSquares();
      setToggle(false);
    }
    setInputGridSize(newSize);
  };

  const jumpToMove = (move) => {
    setCurrentMove(move);
  };

  const moves = history.map((squares, move) => {
    const desc = move === 0 ? "Go to game start" : `Go to move #${move}`;

    if (move === 0 || currentMove !== move) {
      return (
        <li key={move}>
          <button
            onClick={() => jumpToMove(move)}
            className="m-1 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded"
          >
            {desc}
          </button>
        </li>
      );
    } else {
      const [currentRow, currentCol] = convertIndexToRowCol(
        squares.index,
        gridSize
      );
      return (
        <li key={move}>
          <span>
            You're at move #{move} at row {currentRow} at column {currentCol}
          </span>
        </li>
      );
    }
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
            currentBoard={history[currentMove].squares}
            winningSquares={winningSquares}
            handleClickedSquare={handleClickedSquare}
          />
          <div className="ml-10">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => setToggle(!toggle)}
            >
              Reserve Moves Order
            </button>
            <ol>{toggle ? [...moves].reverse() : moves}</ol>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Game;
