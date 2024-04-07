import { WINNER_COMBOS } from "./constants";

export const checkWinnerFrom = (boardToCheck) => {
  // revisamos todas la combinaciones ganadoras
  // para ver si x u o gano
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]; // x u o
    }
  }
  // Si no hay ganador
  return null;
};

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};
