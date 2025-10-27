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
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`
                bg-gray-900 text-white flex flex-col
                transition-all duration-300 ease-in-out
                ${sidebarOpen ? 'w-72' : 'w-20'}
            `}>
                {/* Top Section */}
                <div className="flex-none">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="w-12 h-12 flex items-center justify-center rounded hover:bg-gray-800 transition-colors"
                            >
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            {sidebarOpen && (
                                <h2 className="text-xl font-bold whitespace-nowrap">Todo App</h2>
                            )}
                        </div>
                    </div>

                    {/* Create List Button */}
                    <div className="p-4 border-b border-gray-700">
                        <button className="w-full flex items-center gap-3 px-3 py-3 rounded hover:bg-gray-800 transition-colors">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            {sidebarOpen && (
                                <span className="text-sm font-semibold whitespace-nowrap">Create List</span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Lists Section (Scrollable) */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 space-y-1">
                        <button className="w-full flex items-center gap-3 px-3 py-3 rounded hover:bg-gray-800 transition-colors">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            {sidebarOpen && <span>Work Tasks</span>}
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-3 rounded hover:bg-gray-800 transition-colors">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {sidebarOpen && <span>Personal</span>}
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-3 rounded hover:bg-gray-800 transition-colors">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            {sidebarOpen && <span>Ideas</span>}
                        </button>
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
                            {sidebarOpen && <span>Settings</span>}
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-3 rounded hover:bg-gray-800 transition-colors text-red-400 hover:text-red-300"
                        >
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            {sidebarOpen && <span>Logout</span>}
                        </button>
                    </div>
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

export default Main;