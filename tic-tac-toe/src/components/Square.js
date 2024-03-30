const Square = ({ value, handleClicked }) => {
  return (
    <button
      className="bg-white border-4 border-indigo-500/100 float-left size-16 box-border text-black text-center"
      onClick={handleClicked}
    >
      {value}
    </button>
  );
};
export default Square;
