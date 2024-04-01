const Square = ({ value, isWonSquare, handleClicked }) => {
	const backgroundColor = isWonSquare ? "bg-rose-300" : "bg-white";
	const textColor = isWonSquare ? "text-red-600	" : "text-black";
	const fontWeight = isWonSquare ? "font-semibold" : "font-light";
	const className = `square ${backgroundColor} ${fontWeight} ${textColor}`;

	return (
		<button className={className} onClick={handleClicked}>
			{value}
		</button>
	);
};
export default Square;
