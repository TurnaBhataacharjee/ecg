import React from 'react'
import { Todo } from '../types/todo'

interface StatsProps {
  todos: Todo[]
}

const Stats: React.FC<StatsProps> = ({ todos }) => {
  const total = todos.length
  const completed = todos.filter(t => t.completed).length
  const pending = total - completed

  return (
    <div id="stats-section" data-visual-editor-id="todo-stats" className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-4 sm:p-5 text-center border border-primary-200">
        <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1">{total}</div>
        <div className="text-xs sm:text-sm text-primary-700 font-medium">Total</div>
      </div>
      <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-4 sm:p-5 text-center border border-accent-200">
        <div className="text-2xl sm:text-3xl font-bold text-accent-600 mb-1">{completed}</div>
        <div className="text-xs sm:text-sm text-accent-700 font-medium">Completed</div>
      </div>
      <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-4 sm:p-5 text-center border border-secondary-200">
        <div className="text-2xl sm:text-3xl font-bold text-secondary-600 mb-1">{pending}</div>
        <div className="text-xs sm:text-sm text-secondary-700 font-medium">Pending</div>
      </div>
    </div>
  )
}

export default Stats
