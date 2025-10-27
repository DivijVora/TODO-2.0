import { useState } from "react";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
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
        <div className="p-4 border-t border-gray-700">
          <span className="text-2xl cursor-pointer hover:text-gray-300">⚙️</span>
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

export default App;