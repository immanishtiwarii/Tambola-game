import React, { useState, useEffect,useCallback } from "react";

// Component for Tambola Ticket
const Ticket = ({ ticketNumbers }) => {
  return (
    <div className="ticket">
      <h3>Tambola Ticket</h3>
      <ul>
        {ticketNumbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
};

// Component for Tambola Board
const Board = ({ calledNumbers }) => {
  return (
    <div className="board">
      <h3>Tambola Board</h3>
      <ul>
        {Array.from({ length: 90 }, (_, index) => index + 1).map((number) => (
          <li
            key={number}
            className={calledNumbers.includes(number) ? "called" : ""}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [tickets, setTickets] = useState([]);

  const generateTickets = useCallback(() => {
    const newTickets = [];
    for (let i = 0; i < 20; i++) {
      const ticketNumbers = getRandomNumbers(1, 90, 15);
      newTickets.push(ticketNumbers);
    }
    setTickets(newTickets);
  }, []);
  
  useEffect(() => {
    const storedTickets = localStorage.getItem("tambolaTickets");
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    } else {
      generateTickets();
    }
  }, [generateTickets]);
  

  useEffect(() => {
    localStorage.setItem("tambolaTickets", JSON.stringify(tickets));
  }, [tickets]);

  

  const getRandomNumbers = (min, max, count) => {
    const numbers = [];
    while (numbers.length < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    return numbers.sort((a, b) => a - b);
  };

  const callNextNumber = () => {
    const remainingNumbers = Array.from({ length: 90 }, (_, index) => index + 1)
      .filter((number) => !calledNumbers.includes(number));
    if (remainingNumbers.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
      const calledNumber = remainingNumbers[randomIndex];
      setCalledNumbers([...calledNumbers, calledNumber]);
    }
  };

  const resetGame = () => {
    setCalledNumbers([]);
    generateTickets();
  };

  return (
    <div className="game">
      <h2>Tambola Game</h2>
      <button onClick={callNextNumber}>Call Next Number</button>
      <button onClick={resetGame}>New Game</button>
      <Board calledNumbers={calledNumbers} />
      <div className="tickets">
        {tickets.map((ticket, index) => (
          <Ticket key={index} ticketNumbers={ticket} />
        ))}
      </div>
    </div>
  );
}

export default App