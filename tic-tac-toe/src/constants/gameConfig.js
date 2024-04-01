const minGridSize = 3;
const maxGridSize = 10;
const conditionToWinForOrthogonal = {
  Left: [-1, -2],
  Between: [-1, 1],
  Right: [1, 2],
};
const conditionToWinForDiagonal = {
  NorthWest: [
    [-2, -2],
    [-1, -1],
  ],
  NorthEast: [
    [-2, 2],
    [-1, 1],
  ],
  SouthWest: [
    [2, 2],
    [1, 1],
  ],
  SouthEast: [
    [2, -2],
    [1, -1],
  ],
  NorthWestToSouthEast: [
    [-1, -1],
    [1, 1],
  ],
  SouthWestToNorthEast: [
    [1, -1],
    [-1, 1],
  ],
};
export {
  minGridSize,
  maxGridSize,
  conditionToWinForDiagonal,
  conditionToWinForOrthogonal,
};
