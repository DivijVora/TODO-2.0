import React, { useState } from 'react';
import ListItem from './ListItem';
import '../styles/list.css';

function List({ list, onUpdateItem }) {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [showAddItem, setShowAddItem] = useState(false);
    const [newItemId] = useState(() => -Date.now()); // Unique negative ID for new item

    // Handle updates to list items
    const handleItemUpdate = (updatedItem) => {
        if (updatedItem.id === newItemId) {
            if (updatedItem.task?.trim()) {
                // New item with content - send to backend
                onUpdateItem(list._id, updatedItem);
                setShowAddItem(false); // Hide the add item UI
            }
        } else {
            onUpdateItem(list._id, updatedItem);
        }
    };

    const handleAddItemClick = () => {
        setShowAddItem(true);
        setSelectedItemId(newItemId);
    };

    return (
        <div className="list-container">
            <div className="list-title">
                <h3>{list.title}</h3>
            </div>
            <div className="list-content">
                {list.list.map((item) => (
                    <ListItem
                        key={item.id}
                        item={item}
                        selected={selectedItemId === item.id}
                        onSelect={setSelectedItemId}
                        onUpdate={handleItemUpdate}
                    />
                ))}
            </div>
        </div>
    );
}

export default List;