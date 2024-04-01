import {
	conditionToWinForDiagonal,
	conditionToWinForOrthogonal,
} from "constants/gameConfig";

const convertRowColToIndex = (row, col, gridSize) => {
	return row >= 0 && row < gridSize && col >= 0 && col < gridSize
		? row * gridSize + col
		: -1;
};

const convertIndexToRowCol = (index, gridSize) => {
	const row = Math.floor(index / gridSize);
	const col = index % gridSize;
	return [row, col];
};

const checkThreeSquareEqual = (board, index1, index2, index3) => {
	return (
		board[index1] != "" &&
		board[index1] == board[index2] &&
		board[index2] == board[index3]
	);
};

const checkRow = (
	currentBoard,
	currentRow,
	currentCol,
	indexCurrent,
	gridSize,
) => {
	for (const rowDirection of Object.values(conditionToWinForOrthogonal)) {
		const indexNeighbor1 = convertRowColToIndex(
			currentRow + rowDirection[0],
			currentCol,
			gridSize,
		);
		const indexNeighbor2 = convertRowColToIndex(
			currentRow + rowDirection[1],
			currentCol,
			gridSize,
		);
		if (indexNeighbor1 == -1 || indexNeighbor2 == -1) {
			continue;
		} else if (
			checkThreeSquareEqual(
				currentBoard,
				indexCurrent,
				indexNeighbor1,
				indexNeighbor2,
			)
		) {
			return [indexCurrent, indexNeighbor1, indexNeighbor2];
		}
	}
	return null;
};
const checkCol = (
	currentBoard,
	currentRow,
	currentCol,
	indexCurrent,
	gridSize,
) => {
	for (const colDirection of Object.values(conditionToWinForOrthogonal)) {
		const indexNeighbor1 = convertRowColToIndex(
			currentRow,
			currentCol + colDirection[0],
			gridSize,
		);
		const indexNeighbor2 = convertRowColToIndex(
			currentRow,
			currentCol + colDirection[1],
			gridSize,
		);
		if (indexNeighbor1 == -1 || indexNeighbor2 == -1) {
			continue;
		} else if (
			checkThreeSquareEqual(
				currentBoard,
				indexCurrent,
				indexNeighbor1,
				indexNeighbor2,
			)
		) {
			return [indexCurrent, indexNeighbor1, indexNeighbor2];
		}
	}

	return null;
};
const checkDiagonal = (
	currentBoard,
	currentRow,
	currentCol,
	indexCurrent,
	gridSize,
) => {
	for (const diagonalDirection of Object.values(conditionToWinForDiagonal)) {
		const indexNeighbor1 = convertRowColToIndex(
			currentRow + diagonalDirection[0][0],
			currentCol + diagonalDirection[0][1],
			gridSize,
		);
		const indexNeighbor2 = convertRowColToIndex(
			currentRow + diagonalDirection[1][0],
			currentCol + diagonalDirection[1][1],
			gridSize,
		);

		if (indexNeighbor1 == -1 || indexNeighbor2 == -1) {
			continue;
		} else if (
			checkThreeSquareEqual(
				currentBoard,
				indexCurrent,
				indexNeighbor1,
				indexNeighbor2,
			)
		) {
			return [indexCurrent, indexNeighbor1, indexNeighbor2];
		}
	}

	return null;
};

const checkDraw = (currentBoard) => {
	return !currentBoard.includes("");
};

const checkWinner = (currentBoard, currentIndex, gridSize) => {
	const [currentRow, currentCol] = convertIndexToRowCol(
		currentIndex,
		gridSize,
	);
	let wonSquares =
		checkRow(
			currentBoard,
			currentRow,
			currentCol,
			currentIndex,
			gridSize,
		) ||
		checkCol(
			currentBoard,
			currentRow,
			currentCol,
			currentIndex,
			gridSize,
		) ||
		checkDiagonal(
			currentBoard,
			currentRow,
			currentCol,
			currentIndex,
			gridSize,
		);
	return wonSquares;
};

export { checkDraw, checkWinner, convertIndexToRowCol };
