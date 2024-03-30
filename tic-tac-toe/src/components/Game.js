import { useState } from "react";
import Board from "./Board";
import checkWinner from "./WinnerCheck";

const Game = () => {
  const minGridSize = 3;
  const maxGridSize = 10;
  const [inputGridSize, setInputGridSize] = useState(minGridSize);
  const [currentBoard, setCurrentBoard] = useState(
    Array(minGridSize ** 2).fill("")
  );
  const [gridSize, setGridSize] = useState(minGridSize);
  const [currentMove, setCurrentMove] = useState(0);
  const [status, setStatus] = useState("Game Start");
  const [winner, setWinner] = useState();

  const handleClickedSquare = (index) => {
    console.log("aaa");

    if (currentBoard[index] || winner) {
      return;
    }
    const newBoard = [...currentBoard];
    newBoard[index] = currentMove % 2 == 0 ? "X" : "O";
    setCurrentBoard(newBoard);
    setCurrentMove(currentMove + 1);
    setStatus(`Turn of ${newBoard[index] == "O" ? "X" : "O"}`);
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
      setCurrentBoard(Array(newSize ** 2).fill(""));
      setStatus("Game Start");
      setWinner("");
      setCurrentMove(0);
    }
    setInputGridSize(newSize);
  };
  return (
    <main className="ml-5">
      <div className="block pb-5">
        <input
          className="text-black"
          name="grid-size"
          type="number"
          value={inputGridSize}
          min={3}
          max={10}
          onChange={handleGridSize}
        />
      </div>
      <div className="text-white">
        <h1>{status}</h1>
      </div>
      <Board
        gridSize={gridSize}
        currentBoard={currentBoard}
        handleClickedSquare={handleClickedSquare}
      />
    </main>
  );
};
export default Game;
