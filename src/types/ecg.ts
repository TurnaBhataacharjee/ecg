export interface ECGData {
  lead1: number[]
  lead2: number[]
  lead3: number[]
  samplingRate: number
  duration: number
}

export interface PatientInfo {
  name: string
  age: number
  gender: string
  patientId: string
}

export interface AnalysisResult {
  condition: string
  confidence: number
  heartRate: number
  rhythm: string
  recommendations: string[]
  severity: 'normal' | 'mild' | 'moderate' | 'severe'
  timestamp: number
}
