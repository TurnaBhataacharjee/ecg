import React, { useState } from 'react'
import { Todo } from '../types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, newText: string) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim())
    }
    setIsEditing(false)
  }

  return (
    <div
      id={`todo-item-${todo.id}`}
      data-visual-editor-id={`todo-${todo.id}`}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 sm:p-5 border border-secondary-100 hover:border-accent-300"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          id={`toggle-${todo.id}`}
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
            todo.completed
              ? 'bg-accent-500 border-accent-500'
              : 'border-secondary-300 hover:border-accent-400'
          }`}
        >
          {todo.completed && <i className="bi bi-check text-white text-lg"></i>}
        </button>

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
            className="flex-1 px-3 py-2 border-2 border-accent-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-200 text-sm sm:text-base"
            autoFocus
          />
        ) : (
          <span
            className={`flex-1 text-sm sm:text-base transition-all duration-300 ${
              todo.completed
                ? 'line-through text-secondary-400'
                : 'text-secondary-800'
            }`}
          >
            {todo.text}
          </span>
        )}

        <div className="flex gap-2">
          <button
            id={`edit-${todo.id}`}
            onClick={() => setIsEditing(!isEditing)}
            className="text-primary-500 hover:text-primary-700 transition-colors duration-200 p-2"
          >
            <i className="bi bi-pencil text-lg"></i>
          </button>
          <button
            id={`delete-${todo.id}`}
            onClick={() => onDelete(todo.id)}
            className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2"
          >
            <i className="bi bi-trash text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoItem
