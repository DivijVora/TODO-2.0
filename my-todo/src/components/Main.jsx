import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../utils/axios';
import List from './List';
import '../styles/list.css';

function Main() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const [lists, setLists] = useState([]);
  const [currentListIndex, setCurrentListIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);

  // Load user's todo lists
  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/api/todolist');
        setLists(response.data.lists || []);
      } catch (err) {
        console.error('Failed to load lists:', err);
        setError('Failed to load your todo lists. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const toggleSidebar = () => {
    if (sidebarOpen) {
      // hiding: hide labels immediately so they don't overlap while collapsing
      setShowLabels(false);
      setSidebarOpen(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } else {
      // opening: start animation and set a fallback timeout to show labels after it
      setSidebarOpen(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => setShowLabels(true), 320);
    }
  };
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout endpoint
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/');
    }
  };

  return (
    <div className="h-screen bg-gray-100 relative">
      {/* Sidebar (fixed overlay) */}
      <div
        onTransitionEnd={(e) => {
          if (e.propertyName === 'width' && sidebarOpen) {
            setShowLabels(true);
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          }
        }}
        className={` 
                bg-gray-900 text-white flex flex-col fixed top-0 left-0 h-full z-20
                transition-all duration-300 ease-in-out
                ${sidebarOpen ? 'w-72' : 'w-20'}
            `}
      >
        {/* Top Section */}
        <div className="flex-none">
          {/* Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSidebar}
                className="w-12 h-12 flex items-center justify-center rounded hover:bg-gray-800 transition-colors"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              {showLabels && (
                <h2 className="text-xl font-bold whitespace-nowrap">Todo App</h2>
              )}
            </div>
          </div>

          {/* Create List Button */}
          <div className="p-4 border-b border-gray-700">
            <button
              onClick={async () => {
                const title = prompt('Enter list title');
                if (!title) return;

                try {
                  const response = await axios.patch('/api/todolist', {
                    lists: [{
                      action: 'add',
                      list: {
                        title,
                        list: []
                      }
                    }]
                  });

                  // Append new list to local state if it was created
                  if (response.data.lists?.[0]) {
                    const newList = response.data.lists[0];
                    setLists(prevLists => {
                      const newLists = [...prevLists, newList];
                      // Update current list index to point to the new list
                      setCurrentListIndex(newLists.length - 1);
                      return newLists;
                    });
                  }
                } catch (err) {
                  console.error('Failed to create list:', err);
                  alert('Failed to create list. Please try again.');
                }
              }}
              className="w-full flex items-center gap-3 px-3 py-3 rounded hover:bg-gray-800 transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {showLabels && (
                <span className="text-base font-semibold whitespace-nowrap">Create List</span>
              )}
            </button>
          </div>
        </div>

        {/* Lists Section (Scrollable) */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-1">
            {lists.map((list, index) => (
              <button
                key={list._id}
                onClick={() => setCurrentListIndex(index)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded hover:bg-gray-800 transition-colors
                                    ${index === currentListIndex ? 'bg-gray-800' : ''}`}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                {showLabels && <span>{list.title}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex-none border-t border-gray-700">
          <div className="p-4 space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded hover:bg-gray-800 transition-colors">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {showLabels && <span>Settings</span>}
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-3 rounded hover:bg-gray-800 transition-colors text-red-400 hover:text-red-300"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {showLabels && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content (does not shift when sidebar toggles) */}
      <div className="flex-1 flex items-start justify-center p-6">
        {loading ? (
          <div className="flex items-center justify-center w-full">
            <div className="text-gray-500">Loading your lists...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center w-full">
            <div className="text-red-500">{error}</div>
          </div>
          ) : lists.length === 0 ? (
          <div className="flex items-center justify-center w-full">
            <div className="text-gray-500">No lists yet. Create your first list!</div>
          </div>
          ) : (
          <List
            list={lists[currentListIndex]}
            onUpdateItem={async (listId, updatedItem) => {
              try {
                // Check if this is a new item or an update
                const isNewItem = updatedItem.id < 0;
                const payload = isNewItem ? {
                  // Add new item
                  action: 'add-item',
                  listId,
                  changes: {
                    task: updatedItem.task,
                    completed: updatedItem.completed,
                    priority: updatedItem.priority,
                    starred: updatedItem.starred,
                    due_date: updatedItem.due_date,
                    due_time: updatedItem.due_time
                  }
                } : {
                  // Update existing item
                  action: 'update',
                  listId,
                  changes: {
                    list: lists[currentListIndex].list.map(item => 
                      item.id === updatedItem.id ? updatedItem : item
                    )
                  }
                };

                const response = await axios.patch('/api/todolist', {
                  lists: [payload]
                });

                // Update local state
                setLists(prevLists => {
                  const newLists = [...prevLists];
                  const listIndex = newLists.findIndex(l => l._id === listId);
                  if (listIndex === -1) return prevLists;

                  if (isNewItem && response.data.lists?.[0]?.item) {
                    // Add new item with server-generated ID
                    newLists[listIndex].list.push(response.data.lists[0].item);
                  } else if (!isNewItem) {
                    // Update existing item
                    newLists[listIndex].list = newLists[listIndex].list.map(item =>
                      item.id === updatedItem.id ? updatedItem : item
                    );
                  }
                  return newLists;
                });
              } catch (err) {
                console.error('Failed to update item:', err);
                alert('Failed to update item. Please try again.');
              }
            }}
            onDeleteItem={async (listId, itemId) => {
              try {
                await axios.patch('/api/todolist', {
                  lists: [{ action: 'delete-item', listId, changes: { itemId } }]
                });

                // Update local state to remove the item
                setLists(prev => {
                  const newLists = [...prev];
                  const li = newLists.findIndex(l => l._id === listId);
                  if (li === -1) return prev;
                  newLists[li] = {
                    ...newLists[li],
                    list: newLists[li].list.filter(i => i.id !== itemId)
                  };
                  return newLists;
                });
              } catch (err) {
                console.error('Failed to delete item:', err);
                alert('Failed to delete item. Please try again.');
              }
            }}
            onDeleteList={async (listId) => {
              try {
                await axios.patch('/api/todolist', {
                  lists: [{ action: 'delete', listId }]
                });

                setLists(prev => {
                  const newLists = prev.filter(l => l._id !== listId);
                  // adjust currentListIndex if necessary
                  if (newLists.length === 0) {
                    setCurrentListIndex(0);
                  } else if (currentListIndex >= newLists.length) {
                    setCurrentListIndex(newLists.length - 1);
                  }
                  return newLists;
                });
              } catch (err) {
                console.error('Failed to delete list:', err);
                alert('Failed to delete list. Please try again.');
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Main;