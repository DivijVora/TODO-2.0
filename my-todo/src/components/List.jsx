import React, { useState } from 'react';
import ListItem from './ListItem';
import '../styles/list.css';

function List({ list, onUpdateItem, onDeleteItem, onDeleteList }) {
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
            <div className="list-title flex items-center justify-between">
                <h3>{list.title}</h3>
                <button
                    title="Delete list"
                    onClick={() => onDeleteList && onDeleteList(list._id)}
                    className="ml-2 inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                        <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                    </svg>
                    <span className="text-sm font-medium">Delete List</span>
                </button>
            </div>
            <div className="list-content">
                {list.list.map((item) => (
                    <ListItem
                        key={item.id}
                        item={item}
                        selected={selectedItemId === item.id}
                        onSelect={setSelectedItemId}
                        onUpdate={handleItemUpdate}
                        onDelete={() => onDeleteItem && onDeleteItem(list._id, item.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default List;