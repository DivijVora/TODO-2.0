import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../utils/axios';

function Main() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Call the logout endpoint
            await axios.post('http://localhost:5000/api/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local storage and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            navigate('/');
        }

        return (
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <div className={`
        bg-gray-900 text-white flex flex-col
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'w-64' : 'w-16'}
      `}>

                    {/* Section 1: Header */}
                    <div className="p-4 space-y-4 border-b border-gray-700">
                        <div className="flex items-center gap-3">
                            <span
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-2xl cursor-pointer hover:text-gray-300"
                            >
                                &nbsp; ☰
                            </span>
                            {sidebarOpen && (
                                <h2 className="text-xl font-bold whitespace-nowrap">Todo App</h2>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-2xl cursor-pointer hover:text-gray-300">➕</span>
                            {sidebarOpen && (
                                <h2 className="text-sm font-semibold whitespace-nowrap">Create List</h2>
                            )}
                        </div>
                    </div>

                    {/* Section 2: Lists */}
                    {sidebarOpen && (
                        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
                            <p className="px-3 py-2 rounded hover:bg-gray-800 cursor-pointer">
                                Work Tasks
                            </p>
                            <p className="px-3 py-2 rounded hover:bg-gray-800 cursor-pointer">
                                Personal
                            </p>
                            <p className="px-3 py-2 rounded hover:bg-gray-800 cursor-pointer">
                                Ideas
                            </p>
                        </div>
                    )}

                    {/* Settings at bottom */}
                    <div className="p-4 border-t border-gray-700 flex flex-col gap-4">
                        <span className="text-2xl cursor-pointer hover:text-gray-300">⚙️</span>
                        <span
                            onClick={handleLogout}
                            className="text-2xl cursor-pointer hover:text-gray-300"
                            title="Logout"
                        >
                            🚪
                        </span>
                    </div>

                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-hidden">
                    <div className="h-full p-6">
                        <div className="bg-white rounded-lg shadow-lg h-full flex flex-col overflow-hidden">

                            {/* List Title */}
                            <div className="bg-blue-600 text-white px-6 py-4">
                                <h3 className="text-xl font-bold">Work Tasks</h3>
                            </div>

                            {/* List Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-3">
                                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer">
                                    <input type="checkbox" className="w-5 h-5" />
                                    <span>Review PR #123</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer">
                                    <input type="checkbox" className="w-5 h-5" />
                                    <span>Team meeting at 3pm</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer">
                                    <input type="checkbox" className="w-5 h-5" />
                                    <span>Update documentation</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Main;