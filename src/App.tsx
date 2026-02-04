import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import PatientForm from './components/PatientForm'
import FileUpload from './components/FileUpload'
import ECGChart from './components/ECGChart'
import AnalysisResults from './components/AnalysisResults'
import { PatientInfo, AnalysisResult } from './types/ecg'
import { parseECGFile } from './utils/ecgProcessor'
import { analyzeECG } from './utils/mlModel'
import {
  trackECGPageView,
  trackFileUpload,
  trackAnalysisStart,
  trackAnalysisComplete,
  identifyAnonymousUser
} from './utils/analyticsUsage'

function App() {
  const [step, setStep] = useState<'patient' | 'upload' | 'analysis'>('patient')
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null)
  const [ecgData, setEcgData] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  useEffect(() => {
    trackECGPageView()
    identifyAnonymousUser()
  }, [])

  const handlePatientSubmit = (info: PatientInfo) => {
    setPatientInfo(info)
    setStep('upload')
  }

  const handleFileSelect = async (file: File) => {
    try {
      trackFileUpload(file.name, file.size)
      setIsAnalyzing(true)
      
      const data = await parseECGFile(file)
      setEcgData(data)
      
      trackAnalysisStart()
      const result = await analyzeECG(data)
      
      setAnalysisResult(result)
      trackAnalysisComplete(result.condition, result.confidence)
      setStep('analysis')
    } catch (error) {
      console.error('Error processing file:', error)
      alert('Error processing ECG file. Please check the format and try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleNewAnalysis = () => {
    setStep('patient')
    setPatientInfo(null)
    setEcgData(null)
    setAnalysisResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50 to-accent-50 font-primary">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        {step === 'patient' && (
          <div className="max-w-2xl mx-auto">
            <PatientForm onSubmit={handlePatientSubmit} />
          </div>
        )}

        {step === 'upload' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {patientInfo && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-secondary-100">
                <h3 className="font-bold text-secondary-800 mb-4">Patient Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-secondary-600">Name:</span>
                    <span className="ml-2 font-semibold">{patientInfo.name}</span>
                  </div>
                  <div>
                    <span className="text-secondary-600">Age:</span>
                    <span className="ml-2 font-semibold">{patientInfo.age}</span>
                  </div>
                  <div>
                    <span className="text-secondary-600">Gender:</span>
                    <span className="ml-2 font-semibold capitalize">{patientInfo.gender}</span>
                  </div>
                  <div>
                    <span className="text-secondary-600">ID:</span>
                    <span className="ml-2 font-semibold">{patientInfo.patientId}</span>
                  </div>
                </div>
              </div>
            )}
            
            <FileUpload onFileSelect={handleFileSelect} isAnalyzing={isAnalyzing} />
            
            {isAnalyzing && (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-secondary-100">
                <div className="animate-spin w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"></div>
                <p className="text-lg font-semibold text-secondary-800">Analyzing ECG Data...</p>
                <p className="text-sm text-secondary-600 mt-2">AI model is processing your data</p>
              </div>
            )}
          </div>
        )}

        {step === 'analysis' && ecgData && analysisResult && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-secondary-100">
              <h3 className="text-xl font-bold text-secondary-800 mb-4">ECG Waveforms</h3>
              <div className="space-y-6">
                <ECGChart data={ecgData.lead1.slice(0, 500)} label="Lead I" color="#0284c7" />
                <ECGChart data={ecgData.lead2.slice(0, 500)} label="Lead II" color="#d946ef" />
                <ECGChart data={ecgData.lead3.slice(0, 500)} label="Lead III" color="#14b8a6" />
              </div>
            </div>

            <AnalysisResults result={analysisResult} />

            <div className="flex justify-center">
              <button
                onClick={handleNewAnalysis}
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center space-x-2"
              >
                <i className="bi bi-arrow-clockwise text-xl"></i>
                <span>New Analysis</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
