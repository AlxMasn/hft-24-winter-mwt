import React, { useState, useEffect } from "react";
import axios from "axios";
import EditShoppingItem from "./EditShoppingItem"; // Falls diese Komponente existiert

const ShoppingList = () => {
  const [items, setItems] = useState([]); // Zustand für die Items
  const [error, setError] = useState(null); // Fehlerzustand
  const [editingItem, setEditingItem] = useState(null); // Zustand für das zu bearbeitende Item

  // Daten von der API laden
  useEffect(() => {
    axios
      .get("http://localhost:5199/api/ShoppingItems") // API-URL anpassen
      .then((response) => {
        setItems(response.data); // Items in den Zustand laden
      })
      .catch((error) => {
        setError("Fehler beim Laden der Daten!");
      });
  }, []);

  // Item löschen
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5199/api/ShoppingItems/${id}`);
      setItems(items.filter((item) => item.id !== id)); // Item aus der Liste entfernen
    } catch (error) {
      console.error("Fehler beim Löschen des Items:", error);
    }
  };

  // Bearbeiten starten
  const handleEdit = (item) => {
    setEditingItem(item);
  };

  // Aktualisiertes Item in die Liste einfügen
  const handleItemUpdated = (updatedItem) => {
    setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
    setEditingItem(null); // Bearbeitungsmodus beenden
  };

  // Wenn ein Fehler vorliegt, wird nur die Fehlermeldung angezeigt
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Shopping List</h1>
      {/* Bearbeiten-Modus */}
      {editingItem ? (
        <EditShoppingItem
          item={editingItem}
          onItemUpdated={handleItemUpdated}
        />
      ) : (
        <>
          {/* Liste der Items */}
          {items.length === 0 ? (
            <p>Keine Items gefunden.</p>
          ) : (
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <strong>{item.name}</strong>: {item.amount}
                  <button onClick={() => handleEdit(item)}>Bearbeiten</button>
                  <button onClick={() => handleDelete(item.id)}>Löschen</button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ShoppingList;
