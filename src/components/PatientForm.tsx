import React, { useState } from 'react'
import { PatientInfo } from '../types/ecg'

interface PatientFormProps {
  onSubmit: (info: PatientInfo) => void
}

const PatientForm: React.FC<PatientFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<PatientInfo>({
    name: '',
    age: 0,
    gender: 'male',
    patientId: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.age > 0 && formData.patientId) {
      onSubmit(formData)
    }
  }

  return (
    <div id="patient-form-section" data-visual-editor-id="patient-info-form" className="bg-white rounded-2xl shadow-xl p-6 border border-secondary-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-primary-100 p-3 rounded-xl">
          <i className="bi bi-person-fill text-primary-600 text-2xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-secondary-800">Patient Information</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-secondary-700 mb-2">
            Patient Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-secondary-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
            placeholder="Enter patient name"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-secondary-700 mb-2">
              Age
            </label>
            <input
              type="number"
              value={formData.age || ''}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
              className="w-full px-4 py-3 rounded-xl border-2 border-secondary-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
              placeholder="Age"
              required
              min="1"
              max="120"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary-700 mb-2">
              Gender
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-secondary-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-secondary-700 mb-2">
            Patient ID
          </label>
          <input
            type="text"
            value={formData.patientId}
            onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-secondary-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
            placeholder="Enter patient ID"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
        >
          <i className="bi bi-check-circle text-xl"></i>
          <span>Continue to ECG Upload</span>
        </button>
      </form>
    </div>
  )
}

export default PatientForm
