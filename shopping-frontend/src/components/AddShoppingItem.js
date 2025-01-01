import React, { useState } from "react";
import axios from "axios";

const AddShoppingItem = ({ onItemAdded }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Neu

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Doppelte Klicks verhindern

    setIsSubmitting(true); // Schützt vor mehrfachen Anfragen
    try {
      const response = await axios.post(
        "https://fuzzy-potato-wrggvj79x697h96pv-5199.app.github.dev/api/ShoppingItems/",
        { name, amount: parseInt(amount, 10) }
      );

      onItemAdded(response.data);
      setName("");
      setAmount("");
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Items:", error);
    } finally {
      setIsSubmitting(false); // Button nach Abschluss wieder aktivieren
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
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Hinzufügen..." : "Hinzufügen"} {/* Button Zustand anzeigen */}
      </button>
    </form>
  );
};

export default AddShoppingItem;
