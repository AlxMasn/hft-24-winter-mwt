import React, { useState } from "react";
import ShoppingList from "./components/ShoppingList";
import AddShoppingItem from "./components/AddShoppingItem";

function App() {
  const [items, setItems] = useState([]);

  const handleItemAdded = (newItem) => {
    setItems([...items, newItem]); // Neues Item zur Liste hinzufügen
  };

  return (
    <div className="App">
      <AddShoppingItem onItemAdded={handleItemAdded} />
      <ShoppingList items={items} setItems={setItems} />
    </div>
  );
}

export default App;
