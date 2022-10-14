import "./styles.css";
import React, { useEffect, useState } from "react";

// let board = [
//   ["", "", "", "", ""],
//   ["", "", "", "", ""],
//   ["", "", "", "", ""],
//   ["", "", "", "", ""],
//   ["", "", "", "", ""],
//   ["", "", "", "", ""]
// ];

export default function App() {
  // Can probably just use the empty strings above?
  let board = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29]
  ];

  let alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];

  // Not dynamic, can hook up to API & useState
  const word = "enjoy".split("");
  const [gameBoard, setGameBoard] = useState(board);
  const [remainingLetters, setRemainingLetters] = useState(alphabet);
  const [isWinner, setIsWinner] = useState(false);

  // Increment these to move through squares
  const [currentSquare, setCurrentSquare] = useState({
    row: 0,
    col: 0
  });
  const { row, col } = currentSquare;

  useEffect(() => {
    if (isWinner) alert("Winner!");
  }, [isWinner]);

  function getSquareValueInfo(rowIdx, colIdx) {
    let boardCopy = [...gameBoard];
    return boardCopy[rowIdx][colIdx].val;
  }

  // Click keyboard letter
  function handleKeyboardClick(letter) {
    if (!isWinner) {
      let boardCopy = [...gameBoard];

      // Set the letter to square
      boardCopy[row][col] = { val: letter };
      setGameBoard(boardCopy);

      // Move to next square
      const currentSquareCopy = { ...currentSquare };
      currentSquareCopy.col++;
      setCurrentSquare(currentSquareCopy);

      // User must now hit 'Del' or 'Enter'
      if ((col + 1) % 5 === 0) {
        return;
      }
    }
  }

  // Click 'Delete' button
  function handleDelete() {
    const _gameBoard = [...gameBoard];
    let _currentSquare = { ...currentSquare };
    const currentVal = _gameBoard[row][col - 1];

    currentVal.val = "";
    _gameBoard[row][col - 1] = currentVal;
    _currentSquare.col--;

    setGameBoard(_gameBoard);
    setCurrentSquare(_currentSquare);
  }

  // Click 'Enter' button
  function handleEnter() {
    if (!isWinner) {
      if (col % 5 === 0) {
        const guess = gameBoard[row].map(({ val }) => val);

        // Check square letter & apply color
        let coloredSquares = [];
        let boardCopy = [...gameBoard];
        let winnerCounter = 0;
        gameBoard[row].forEach((square, idx) => {
          if (word.includes(square.val)) {
            if (word[idx] === square.val) {
              square.color = "green";

              // Check for winner
              winnerCounter++;
            } else {
              square.color = "yellow";
            }
          } else {
            square.color = null;
          }
          coloredSquares.push(square);
        });
        boardCopy[row] = coloredSquares;
        setGameBoard(boardCopy);

        // Check for winner
        if (winnerCounter === 5) {
          setIsWinner(true);
        }

        // Remove chosen letters from 'remainingLetters'
        let filteredLetters = [];
        remainingLetters.forEach((letter) => {
          if (!guess.includes(letter)) filteredLetters.push(letter);
        });
        setRemainingLetters(filteredLetters);

        // - Move to next row
        const currentSquareCopy = { ...currentSquare };
        currentSquareCopy.row++;
        currentSquareCopy.col = 0;
        setCurrentSquare(currentSquareCopy);
      }
    }
  }

  function getClassName(row, col) {
    return gameBoard[row][col].color;
  }

  const renderSquares = (row, rowIdx) => {
    return row.map((col, colIdx) => (
      <td key={col} id={col} className={getClassName(rowIdx, colIdx)}>
        {getSquareValueInfo(rowIdx, colIdx)}
      </td>
    ));
  };

  const renderGameBoard = () => {
    return board.map((row, idx) => (
      <tr key={row}>{renderSquares(row, idx)}</tr>
    ));
  };

  const renderKeyboard = () => {
    return alphabet.map((letter) => (
      <button
        key={letter}
        className={!remainingLetters.includes(letter) ? "used" : ""}
        onClick={() => handleKeyboardClick(letter)}
      >
        {letter}
      </button>
    ));
  };

  return (
    <div className="App">
      <div className="game-board">
        <table>
          <tbody>{renderGameBoard()}</tbody>
        </table>
      </div>
      <div className="keyboard">
        {renderKeyboard()}
        <button style={{ marginLeft: "50px" }} onClick={handleDelete}>
          Del
        </button>
        <button onClick={handleEnter}>Enter</button>
      </div>
    </div>
  );
}
