import * as tf from '@tensorflow/tfjs'
import { AnalysisResult } from '../types/ecg'

const CONDITIONS = [
  'Normal Sinus Rhythm',
  'Atrial Fibrillation',
  'Ventricular Tachycardia',
  'Bradycardia',
  'Premature Ventricular Contractions'
]

export const analyzeECG = async (ecgData: any): Promise<AnalysisResult> => {
  await tf.ready()
  
  const lead1Normalized = normalizeData(ecgData.lead1.slice(0, 1000))
  const lead2Normalized = normalizeData(ecgData.lead2.slice(0, 1000))
  const lead3Normalized = normalizeData(ecgData.lead3.slice(0, 1000))
  
  const inputTensor = tf.tensor3d([
    [lead1Normalized, lead2Normalized, lead3Normalized]
  ])
  
  const predictions = await simulateMLPrediction(inputTensor)
  
  const maxIndex = predictions.indexOf(Math.max(...predictions))
  const confidence = predictions[maxIndex]
  
  const heartRate = calculateHeartRate(ecgData.lead1)
  const rhythm = determineRhythm(heartRate, maxIndex)
  const severity = determineSeverity(maxIndex, confidence)
  
  inputTensor.dispose()
  
  return {
    condition: CONDITIONS[maxIndex],
    confidence: confidence,
    heartRate: heartRate,
    rhythm: rhythm,
    recommendations: generateRecommendations(maxIndex, severity),
    severity: severity,
    timestamp: Date.now()
  }
}

const normalizeData = (data: number[]): number[] => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  return data.map(v => (v - min) / range)
}

const simulateMLPrediction = async (tensor: tf.Tensor): Promise<number[]> => {
  await new Promise(resolve => window.setTimeout(resolve, 2000))
  
  const random = Math.random()
  
  if (random < 0.6) {
    return [0.92, 0.03, 0.02, 0.02, 0.01]
  } else if (random < 0.8) {
    return [0.15, 0.78, 0.03, 0.02, 0.02]
  } else if (random < 0.9) {
    return [0.10, 0.05, 0.75, 0.05, 0.05]
  } else if (random < 0.95) {
    return [0.08, 0.07, 0.05, 0.72, 0.08]
  } else {
    return [0.12, 0.08, 0.10, 0.05, 0.65]
  }
}

const calculateHeartRate = (data: number[]): number => {
  const peaks = detectPeaks(data)
  if (peaks.length < 2) return 75
  
  const intervals = []
  for (let i = 1; i < peaks.length; i++) {
    intervals.push(peaks[i] - peaks[i - 1])
  }
  
  const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
  return Math.round((60 * 250) / avgInterval)
}

const detectPeaks = (data: number[]): number[] => {
  const peaks: number[] = []
  const threshold = Math.max(...data) * 0.6
  
  for (let i = 10; i < data.length - 10; i++) {
    if (data[i] > threshold && data[i] > data[i - 1] && data[i] > data[i + 1]) {
      if (peaks.length === 0 || i - peaks[peaks.length - 1] > 50) {
        peaks.push(i)
      }
    }
  }
  
  return peaks
}

const determineRhythm = (heartRate: number, conditionIndex: number): string => {
  if (conditionIndex === 1) return 'Irregular'
  if (conditionIndex === 2) return 'Fast Irregular'
  if (conditionIndex === 3) return 'Slow Regular'
  if (conditionIndex === 4) return 'Irregular'
  
  if (heartRate < 60) return 'Slow Regular'
  if (heartRate > 100) return 'Fast Regular'
  return 'Normal Regular'
}

const determineSeverity = (conditionIndex: number, confidence: number): 'normal' | 'mild' | 'moderate' | 'severe' => {
  if (conditionIndex === 0) return 'normal'
  
  if (conditionIndex === 1 || conditionIndex === 4) {
    if (confidence > 0.8) return 'moderate'
    return 'mild'
  }
  
  if (conditionIndex === 2) {
    if (confidence > 0.8) return 'severe'
    return 'moderate'
  }
  
  if (conditionIndex === 3) {
    if (confidence > 0.8) return 'moderate'
    return 'mild'
  }
  
  return 'mild'
}

const generateRecommendations = (conditionIndex: number, severity: string): string[] => {
  const recommendations: { [key: number]: string[] } = {
    0: [
      'Continue regular health monitoring',
      'Maintain a healthy lifestyle with regular exercise',
      'Schedule routine cardiac checkups annually'
    ],
    1: [
      'Consult with a cardiologist immediately',
      'Consider anticoagulation therapy to prevent stroke',
      'Monitor for symptoms like palpitations or dizziness',
      'Avoid excessive caffeine and alcohol'
    ],
    2: [
      'Seek immediate emergency medical attention',
      'This condition requires urgent intervention',
      'Do not delay treatment - call emergency services',
      'Prepare for possible hospitalization'
    ],
    3: [
      'Consult with a cardiologist for evaluation',
      'May require pacemaker consideration',
      'Monitor for symptoms of fatigue or dizziness',
      'Avoid medications that slow heart rate'
    ],
    4: [
      'Schedule follow-up with cardiologist',
      'Monitor frequency and duration of episodes',
      'Reduce stress and avoid stimulants',
      'Consider Holter monitoring for 24-48 hours'
    ]
  }
  
  return recommendations[conditionIndex] || recommendations[0]
}
