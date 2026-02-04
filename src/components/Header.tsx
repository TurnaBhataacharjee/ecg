import React from 'react'

const Header: React.FC = () => {
  return (
    <header id="main-header" data-visual-editor-id="app-header" className="bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <i className="bi bi-heart-pulse-fill text-white text-4xl"></i>
            </div>
            <div>
              <h1 id="app-title" data-visual-editor-id="main-title" className="text-3xl sm:text-4xl font-bold text-white font-primary">
                CardioAI
              </h1>
              <p className="text-primary-100 text-sm sm:text-base">Advanced ECG Analysis System</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
            <i className="bi bi-shield-check text-accent-200 text-xl"></i>
            <span className="text-white text-sm font-medium">Medical Grade AI</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
