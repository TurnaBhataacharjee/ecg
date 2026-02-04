import React, { useState } from 'react'

interface TodoInputProps {
  onAdd: (text: string) => void
}

const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text.trim())
      setText('')
    }
  }

  return (
    <form id="todo-input-form" data-visual-editor-id="add-todo-form" onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2 sm:gap-3">
        <input
          id="todo-text-input"
          data-visual-editor-id="todo-input-field"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-3 sm:py-4 rounded-xl border-2 border-secondary-200 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200 transition-all duration-300 text-sm sm:text-base"
        />
        <button
          id="add-todo-button"
          data-visual-editor-id="add-todo-btn"
          type="submit"
          className="bg-accent-500 hover:bg-accent-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <i className="bi bi-plus-lg text-xl"></i>
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
    </form>
  )
}

export default TodoInput
