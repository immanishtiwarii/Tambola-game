import React, { useState, useEffect } from "react";

const TambolaBoard = () => {
  const [number, setNumber] = useState(null);
  const [calledNumbers, setCalledNumbers] = useState([]);
  
  // Load called numbers from local storage on initial render
  useEffect(() => {
    const storedNumbers = localStorage.getItem("calledNumbers");
    if (storedNumbers) {
      setCalledNumbers(JSON.parse(storedNumbers));
    }
  }, []);
  
  // Update called numbers and store them in local storage
  const updateCalledNumbers = (num) => {
    const updatedNumbers = [...calledNumbers, num];
    setCalledNumbers(updatedNumbers);
    localStorage.setItem("calledNumbers", JSON.stringify(updatedNumbers));
  };
  
  // Generate a random number between 1-90
  const generateRandomNumber = () => {
    const newNumber = Math.floor(Math.random() * 90) + 1;
    setNumber(newNumber);
    updateCalledNumbers(newNumber);
  };
  
  // Reset the called numbers and clear local storage
  const resetGame = () => {
    setNumber(null);
    setCalledNumbers([]);
    localStorage.removeItem("calledNumbers");
  };

  return (
    <div>
      <h1>Tambola Board</h1>
      <button onClick={generateRandomNumber}>Generate Next Number</button>
      <button onClick={resetGame}>New Game</button>
      {number && <p>Number called: {number}</p>}
      <div className="board">
        {Array.from({ length: 90 }, (_, i) => i + 1).map((num) => (
          <div
            key={num}
            className={`number ${calledNumbers.includes(num) ? "called" : ""}`}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TambolaBoard;
