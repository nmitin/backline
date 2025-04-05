// src/components/AdminNavigation.tsx
import React from 'react'

// Определяем компонент как обычный React-компонент
const AdminNavigation: React.FC = () => {
  return (
    <div className="p-4 mb-4 border-b">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Навигация по сайту</h2>
        <div className="flex gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Перейти на сайт
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminNavigation
