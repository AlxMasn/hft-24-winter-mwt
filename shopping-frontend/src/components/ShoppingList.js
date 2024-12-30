import React from 'react';
import EditShoppingItem from './EditShoppingItem';

const ShoppingList = ({ items, onDelete, onEdit }) => {
    const [editingItem, setEditingItem] = React.useState(null);

    const handleEditStart = (item) => {
        setEditingItem(item);
    };

    return (
        <div>
            <h1>Shopping List</h1>
            {editingItem ? (
                <EditShoppingItem item={editingItem} onItemUpdated={onEdit} onCancel={() => setEditingItem(null)} />
            ) : items.length === 0 ? (
                <p>Keine Items gefunden.</p>
            ) : (
                <ul>
                    {items.map((item) => (
                        <li key={item.id}> {/* ***KEY-PROP IST NUN ABSOLUT SICHER HIER!*** */}
                            <strong>{item.name}</strong>: {item.amount}
                            <button onClick={() => handleEditStart(item)}>Bearbeiten</button>
                            <button onClick={() => onDelete(item.id)}>Löschen</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ShoppingList;