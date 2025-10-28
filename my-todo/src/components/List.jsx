import React, { useState } from 'react';
import ListItem from './ListItem';
import '../styles/list.css';

function List({ list, onUpdateItem, onDeleteItem, onDeleteList }) {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [newItemText, setNewItemText] = useState('');

    // Handle updates to list items
    const handleItemUpdate = (updatedItem) => {
        onUpdateItem(list._id, updatedItem);
    };

    const handleAddItem = () => {
        if (!newItemText.trim()) return;
        
        // Create new item with temporary negative ID and medium priority
        onUpdateItem(list._id, {
            id: -Date.now(), // Generate new unique negative ID each time
            task: newItemText.trim(),
            completed: false,
            priority: 2, // Medium priority by default
            starred: false
        });

        // Clear input
        setNewItemText('');
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
                
                <div className="mt-4 flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        value={newItemText}
                        onChange={e => setNewItemText(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter' && newItemText.trim()) {
                                handleAddItem();
                            }
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                        onClick={handleAddItem}
                        disabled={!newItemText.trim()}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>Add Task</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default List;