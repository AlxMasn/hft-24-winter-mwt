import React, { useState } from "react";
import axios from "axios";

const AddShoppingItem = ({ onItemAdded }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5199/api/ShoppingItems", {
        name,
        amount: parseInt(amount, 10),
      });

      onItemAdded(response.data); // Callback, um das neue Item in der Liste anzuzeigen
      setName("");
      setAmount("");
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Items:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Neues Item hinzufügen</h2>
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
      <button type="submit">Hinzufügen</button>
    </form>
  );
};

export default AddShoppingItem;
