import "./styles.css";
import React, { useState } from "react";

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
  // console.log("word", word);

  const [gameBoard, setGameBoard] = useState(board);

  // Increment these to move through squares
  const [currentSquare, setCurrentSquare] = useState({
    row: 0,
    col: 0
  });

  function getSquareValueInfo(rowIdx, colIdx) {
    let boardCopy = [...gameBoard];
    return boardCopy[rowIdx][colIdx].val;
  }

  // Click keyboard letter
  function handleKeyboardClick(letter) {
    const { row, col } = currentSquare;
    let boardCopy = [...gameBoard];

    // Set the letter to square
    boardCopy[row][col] = { val: letter };
    setGameBoard(boardCopy);

    // Move to next square
    const currentSquareCopy = { ...currentSquare };
    currentSquareCopy.col++;

    // BROKEN - only works for 1 row
    if ((col + 1) % 5 === 0) {
      console.log("MOVE DOWN A ROW");
      // increase the row by 1
      currentSquareCopy.row++;
    }

    // console.log("currentSquareCopy", currentSquareCopy);
    setCurrentSquare(currentSquareCopy);
  }
  console.log("currentSquare", currentSquare);

  // Click 'Enter' button
  function handleEnter() {
    // Logic to TEST what they've input
    // Update the board w/ the COLOR
  }

  const renderSquares = (row, rowIdx) => {
    return row.map((col, colIdx) => (
      <td key={col} id={col}>
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
      <button key={letter} onClick={() => handleKeyboardClick(letter)}>
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
        <button style={{ marginLeft: "50px" }}>Del</button>
        <button onClick={handleEnter}>Enter</button>
      </div>
    </div>
  );
}
