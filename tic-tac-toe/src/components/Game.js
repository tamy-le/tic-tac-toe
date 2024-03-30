import { useState } from "react";
import Board from "./Board";

const Game = () => {
  const minGridSize = 3;
  const maxGridSize = 10;
  const [inputGridSize, setInputGridSize] = useState(minGridSize);
  const [currentBoard, setCurrentBoard] = useState(
    Array(minGridSize ** 2).fill("")
  );
  const [gridSize, setGridSize] = useState(minGridSize);
  const [currentMove, setCurrentMove] = useState(0);

  const handleClickedSquare = (index) => {
    if (currentBoard[index]) {
      return;
    }
    const newBoard = [...currentBoard];
    newBoard[index] = currentMove % 2 == 0 ? "X" : "O";
    setCurrentBoard(newBoard);
    setCurrentMove(currentMove + 1);
  };

  const handleGridSize = (event) => {
    let newSize = parseInt(event.target.value);
    if (isNaN(newSize)) {
      newSize = minGridSize;
    }
    if (newSize >= minGridSize && newSize <= maxGridSize) {
      setGridSize(newSize);
      setCurrentBoard(Array(newSize ** 2).fill(""));
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
      <Board
        gridSide={gridSize}
        currentBoard={currentBoard}
        handleClickedSquare={handleClickedSquare}
      />
    </main>
  );
};
export default Game;
