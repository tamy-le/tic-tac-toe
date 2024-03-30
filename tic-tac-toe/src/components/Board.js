import Square from "./Square";

const renderSquares = (gridSize, currentBoard, handleClickedSquare) => {
  const gridSquares = [];
  for (let row = 0; row < gridSize; row += 1) {
    const rowSquares = [];
    for (let col = 0; col < gridSize; col += 1) {
      const index = row * gridSize + col;
      rowSquares.push(
        <Square
          key={index}
          value={currentBoard[index]}
          handleClicked={() => handleClickedSquare(index)}
        />
      );
    }
    gridSquares.push(
      <div className="table" key={row}>
        {rowSquares}
      </div>
    );
  }
  return gridSquares;
};

const Board = ({ gridSize, currentBoard, handleClickedSquare }) => {
  const squares = renderSquares(gridSize, currentBoard, handleClickedSquare);
  return <main>{squares}</main>;
};
export default Board;
