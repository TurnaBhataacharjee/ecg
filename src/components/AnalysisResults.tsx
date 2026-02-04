import React from 'react'
import { AnalysisResult } from '../types/ecg'

interface AnalysisResultsProps {
  result: AnalysisResult
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'normal':
        return 'bg-success-500'
      case 'mild':
        return 'bg-warning-500'
      case 'moderate':
        return 'bg-warning-600'
      case 'severe':
        return 'bg-danger-500'
      default:
        return 'bg-secondary-500'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'normal':
        return 'bi-check-circle-fill'
      case 'mild':
        return 'bi-exclamation-circle-fill'
      case 'moderate':
        return 'bi-exclamation-triangle-fill'
      case 'severe':
        return 'bi-x-circle-fill'
      default:
        return 'bi-info-circle-fill'
    }
  }

  return (
    <div id="analysis-results" data-visual-editor-id="ecg-results" className="bg-white rounded-2xl shadow-xl p-6 border border-secondary-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-success-100 p-3 rounded-xl">
          <i className="bi bi-clipboard-check text-success-600 text-2xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-secondary-800">Analysis Results</h2>
      </div>

      <div className={`${getSeverityColor(result.severity)} rounded-2xl p-6 mb-6 text-white`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <i className={`bi ${getSeverityIcon(result.severity)} text-4xl`}></i>
            <div>
              <h3 className="text-2xl font-bold">{result.condition}</h3>
              <p className="text-sm opacity-90">Detected Condition</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{(result.confidence * 100).toFixed(1)}%</div>
            <p className="text-sm opacity-90">Confidence</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-primary-50 rounded-xl p-4 border border-primary-200">
          <div className="flex items-center space-x-3">
            <i className="bi bi-heart-pulse text-primary-600 text-2xl"></i>
            <div>
              <p className="text-sm text-primary-700 font-medium">Heart Rate</p>
              <p className="text-2xl font-bold text-primary-800">{result.heartRate} BPM</p>
            </div>
          </div>
        </div>

        <div className="bg-accent-50 rounded-xl p-4 border border-accent-200">
          <div className="flex items-center space-x-3">
            <i className="bi bi-activity text-accent-600 text-2xl"></i>
            <div>
              <p className="text-sm text-accent-700 font-medium">Rhythm</p>
              <p className="text-2xl font-bold text-accent-800">{result.rhythm}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary-50 rounded-xl p-6 border border-secondary-200">
        <h4 className="font-bold text-secondary-800 mb-4 flex items-center space-x-2">
          <i className="bi bi-lightbulb text-warning-500 text-xl"></i>
          <span>Recommendations</span>
        </h4>
        <ul className="space-y-2">
          {result.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start space-x-2 text-secondary-700">
              <i className="bi bi-check2 text-success-600 text-lg mt-0.5"></i>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AnalysisResults
