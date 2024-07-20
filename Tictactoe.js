import React, { useState } from 'react';
import Modal from 'react-modal';
import './Tictactoe.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

const Tictactoe = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [move, setMove] = useState('X');
  const [winner, setWinner] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scoreboard, setScoreboard] = useState({
    X: 0,
    O: 0,
    Draws: 0
  });

  const click = (n) => {
    let square = [...board];

    if (board[n] !== '' || winner) {
      return;
    }
    square[n] = move;
    setBoard(square);
    if (checkWin(square)) {
      setWinner(move);
      updateScoreboard(move);
      setIsModalOpen(true);
    } else if (checkDraw(square)) {
      setWinner('Draw');
      updateScoreboard('Draw');
      setIsModalOpen(true);
    } else {
      setMove(move === 'X' ? 'O' : 'X');
    }
  };

  const updateScoreboard = (result) => {
    if (result === 'X') {
      setScoreboard(prevScoreboard => ({
        ...prevScoreboard,
        X: prevScoreboard.X + 1
      }));
    } else if (result === 'O') {
      setScoreboard(prevScoreboard => ({
        ...prevScoreboard,
        O: prevScoreboard.O + 1
      }));
    } else if (result === 'Draw') {
      setScoreboard(prevScoreboard => ({
        ...prevScoreboard,
        Draws: prevScoreboard.Draws + 1
      }));
    }
  };

  const checkDraw = (board) => {
    return board.every(element => element !== '');
  };

  const checkWin = (board) => {
    const conditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let condition of conditions) {
      const [a, b, c] = condition;
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setMove('X');
    setWinner('');
    setIsModalOpen(false);
  };

  return (
    <>
      <h1 className='text-center'>Tic Tac Toe</h1>
      <div className="scoreboard">
        <p>X Wins: {scoreboard.X}</p>
        <p>O Wins: {scoreboard.O}</p>
        <p>Draws: {scoreboard.Draws}</p>
      </div>
      <table>
        <tbody>
          <tr>
            <td onClick={() => click(0)}>{board[0]}</td>
            <td onClick={() => click(1)}>{board[1]}</td>
            <td onClick={() => click(2)}>{board[2]}</td>
          </tr>
          <tr>
            <td onClick={() => click(3)}>{board[3]}</td>
            <td onClick={() => click(4)}>{board[4]}</td>
            <td onClick={() => click(5)}>{board[5]}</td>
          </tr>
          <tr>
            <td onClick={() => click(6)}>{board[6]}</td>
            <td onClick={() => click(7)}>{board[7]}</td>
            <td onClick={() => click(8)}>{board[8]}</td>
          </tr>
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={resetGame}
        contentLabel="Game Result"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}</h2>
        <button onClick={resetGame}>Reset Game</button>
      </Modal>
    </>
  );
};

export default Tictactoe;







