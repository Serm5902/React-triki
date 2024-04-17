//Hooks
import { useState } from 'react';
// Otros imports
import confetti from 'canvas-confetti';
import { checkWinnerFrom, checkEndGame } from '../logic/board';
import { TURNS } from '../logic/constants';
import { saveGameStorage, resetGameStorage } from '../logic/storage/storage';

export function GameLogic() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });
  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null);

  // Con esto hacemos reset al juego
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    // Quitando el localStorage para cuando hacemos reset del juego
    resetGameStorage();
  };

  // Con esto actualizamos el tablero
  const updateBoard = (index) => {
    // no actualizamos esta posición
    // si ya tiene algo
    if (board[index] || winner) return;

    // actualizamos el tablero
    // spread y rest operator son de suma importancia en javascript
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Guardar el estado del juego
    saveGameStorage({ board: newBoard, turn: newTurn });

    // revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    }
    // check  if game is over
    else if (checkEndGame(newBoard)) {
      setWinner(false); // Empate
    }
  };

  return {
    board,
    turn,
    winner,
    resetGame,
    updateBoard,
  };
}
