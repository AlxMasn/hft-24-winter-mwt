import React, { useState } from "react";
import axios from "axios";

const EditShoppingItem = ({ item, onItemUpdated }) => {
  const [name, setName] = useState(item.name);
  const [amount, setAmount] = useState(item.amount);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5199/api/ShoppingItems/${item.id}`, {
        name,
        amount: parseInt(amount, 10),
      });

      onItemUpdated(response.data); // Aktualisiertes Item zurückgeben
    } catch (error) {
      console.error("Fehler beim Bearbeiten des Items:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Item bearbeiten</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Anzahl:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit">Speichern</button>
    </form>
  );
};

export default EditShoppingItem;
