import React, { useState } from "react";

const TicketGenerator = () => {
  const [numTickets, setNumTickets] = useState(1);
  const [tickets, setTickets] = useState([]);

  // Generate a random tambola ticket
  const generateTicket = () => {
    // Generate the required number of random numbers for the ticket
    const ticketNumbers = Array.from({ length: 15 }, () =>
      Math.floor(Math.random() * 90) + 1
    );
    setTickets((prevTickets) => [...prevTickets, ticketNumbers]);
  };

  // Handle input change for number of tickets
  const handleInputChange = (e) => {
    setNumTickets(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setTickets([]);
    for (let i = 0; i < numTickets; i++) {
      generateTicket();
    }
  };

  return (
    <div>
      <h1>Tambola Ticket Generator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Number of Tickets:
          <input
            type="number"
            min="1"
            value={numTickets}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Generate Tickets</button>
      </form>
      {tickets.map((ticket, index) => (
        <div key={index} className="ticket">
          {ticket.map((num) => (
            <div key={num} className="ticket-number">
              {num}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TicketGenerator;
