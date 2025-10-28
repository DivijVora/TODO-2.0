import React, { useState, useRef, useEffect } from 'react';
import '../styles/list.css';

// Priority helper functions
const getPriorityClass = (priority) => {
    switch (priority) {
        case 1: return 'high';
        case 2: return 'medium';
        case 3: return 'low';
        default: return '';
    }
};

const getPriorityLabel = (priority) => {
    switch (priority) {
        case 1: return 'High';
        case 2: return 'Med';
        case 3: return 'Low';
        default: return '';
    }
};

function ListItem({ 
    item, 
    onUpdate, 
    selected, 
    onSelect 
}) {
    const [isEditing, setIsEditing] = useState(item.isNew); // Start in editing mode for new items
    const textRef = useRef(null);

    // Focus empty item when it mounts
    useEffect(() => {
        if (item.isNew && textRef.current) {
            textRef.current.focus();
        }
    }, [item.isNew]);

    // Handle text editing completion
    const handleBlur = () => {
        const newText = textRef.current?.textContent?.trim() || "";
        setIsEditing(false);
        
        if (textRef.current && newText !== item.task) {
            onUpdate({
                ...item,
                task: newText
            });
        }
    };

    // Handle keydown events when editing
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            textRef.current?.blur();
        }
        if (e.key === 'Escape') {
            if (textRef.current) {
                textRef.current.textContent = item.task;
                textRef.current.blur();
            }
        }
    };

    // Toggle starred status
    const toggleStar = (e) => {
        e.stopPropagation();
        onUpdate({
            ...item,
            starred: !item.starred
        });
    };

    // Toggle completed status
    const toggleComplete = (e) => {
        e.stopPropagation();
        onUpdate({
            ...item,
            completed: !item.completed
        });
    };

    return (
        <div 
            className={`list-item ${selected ? 'selected' : ''} ${
                item.priority ? `priority-border-${getPriorityClass(item.priority)}` : ''
            } ${item.isNew ? 'new-item' : ''}`}
            onClick={() => onSelect(item.id)}
        >
            <input
                type="checkbox"
                className="list-item-checkbox"
                checked={item.completed}
                onChange={toggleComplete}
                onClick={(e) => e.stopPropagation()}
            />
            
            <button
                className={`list-item-star ${item.starred ? 'starred' : ''}`}
                onClick={toggleStar}
            >
                <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            </button>

            <div className="list-item-content">
                <div
                    ref={textRef}
                    className="list-item-text"
                    contentEditable={isEditing}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(true);
                        textRef.current?.focus();
                    }}
                    suppressContentEditableWarning={true}
                >
                    {item.task}
                </div>

                {(item.due_date || item.due_time || item.priority) && (
                    <div className="list-item-details">
                        {item.due_date && (
                            <span>{new Date(item.due_date).toLocaleDateString()}</span>
                        )}
                        {item.due_time && (
                            <span>{item.due_time}</span>
                        )}
                        {item.priority > 0 && (
                            <div className="relative inline-block">
                                <span 
                                    className={`list-item-priority priority-${getPriorityClass(item.priority)}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const nextPriority = (item.priority % 3) + 1;
                                        onUpdate({
                                            ...item,
                                            priority: nextPriority
                                        });
                                    }}
                                >
                                    {getPriorityLabel(item.priority)}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListItem;