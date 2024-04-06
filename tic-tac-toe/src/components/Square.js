import classNames from "classnames";

const Square = ({ value, isWonSquare, handleClicked }) => {
	const squareClass = classNames("square", { "is-won-square": isWonSquare });
	return (
		<button className={squareClass} onClick={handleClicked}>
			{value}
		</button>
	);
};
export default Square;
