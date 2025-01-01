import React, { useState, useEffect, useCallback } from "react";
import ShoppingList from "./components/ShoppingList";
import AddShoppingItem from "./components/AddShoppingItem";
import axios from "axios";

function App() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchItems = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://fuzzy-potato-wrggvj79x697h96pv-5199.app.github.dev/api/ShoppingItems");
            setItems(response.data);
        } catch (error) {
            setError("Fehler beim Laden der Daten!");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleItemAdded = async (newItem) => {
        try {
            const response = await axios.post(
                "https://fuzzy-potato-wrggvj79x697h96pv-5199.app.github.dev/api/ShoppingItems/",
                newItem
            );
            setItems((prevItems) => [...prevItems, response.data]); // Nur lokales State-Update
        } catch (error) {
            console.error("Fehler beim Hinzufügen des Items:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://fuzzy-potato-wrggvj79x697h96pv-5199.app.github.dev/api/ShoppingItems/${id}`);
            setItems(prevItems => prevItems.filter(item => item.id !== id));
        } catch (error) {
            console.error("Fehler beim Löschen des Items:", error);
        }
    };

    const handleItemUpdated = async (updatedItem) => {
        try {
            await axios.put(`https://fuzzy-potato-wrggvj79x697h96pv-5199.app.github.dev/api/ShoppingItems/${updatedItem.id}`, updatedItem);
            setItems(prevItems => prevItems.map(item => item.id === updatedItem.id ? updatedItem : item));
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Items:", error);
        }
    };


    if (loading) {
        return <p>Daten werden geladen...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="App">
            <AddShoppingItem onItemAdded={handleItemAdded} />
            <ShoppingList items={items} onDelete={handleDelete} onEdit={handleItemUpdated} />
        </div>
    );
}

export default App;