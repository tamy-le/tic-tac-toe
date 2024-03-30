import Square from "./Square";

const renderSquares = (gridSide, currentBoard, handleClickedSquare) => {
  const gridSquares = [];
  for (let row = 0; row < gridSide; row += 1) {
    const rowSquares = [];
    for (let col = 0; col < gridSide; col += 1) {
      const index = row * gridSide + col;
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

const Board = ({ gridSide, currentBoard, handleClickedSquare }) => {
  const squares = renderSquares(gridSide, currentBoard, handleClickedSquare);
  return <main>{squares}</main>;
};
export default Board;
