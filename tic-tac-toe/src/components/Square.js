const Square = ({ value, isWonSquare, handleClicked }) => {
  const backgroundColor = isWonSquare ? "bg-rose-300" : "bg-white";
  const textColor = isWonSquare ? "text-red-600	" : "text-black";
  const fontWeight = isWonSquare ? "font-semibold" : "font-light";
  const className = `border-4 border-indigo-500/100 float-left size-16 box-border ${fontWeight} ${textColor} text-center ${backgroundColor}`;

  return (
    <button className={className} onClick={handleClicked}>
      {value}
    </button>
  );
};
export default Square;
