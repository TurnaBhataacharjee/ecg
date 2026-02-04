import React from 'react'
import { Todo } from '../types/todo'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, newText: string) => void
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onEdit }) => {
  if (todos.length === 0) {
    return (
      <div id="empty-state" data-visual-editor-id="empty-todos" className="text-center py-12 sm:py-16">
        <div className="bg-secondary-50 rounded-2xl p-8 sm:p-12 inline-block">
          <i className="bi bi-inbox text-6xl sm:text-7xl text-secondary-300 mb-4 block"></i>
          <p className="text-secondary-500 text-base sm:text-lg font-medium">No tasks yet. Add one to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div id="todo-list-container" data-visual-editor-id="todos-list" className="space-y-3 sm:space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

export default TodoList
