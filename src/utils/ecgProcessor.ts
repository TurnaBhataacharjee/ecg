import * as tf from '@tensorflow/tfjs'

export const parseECGFile = async (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        
        if (file.name.endsWith('.json')) {
          const data = JSON.parse(content)
          resolve(data)
        } else if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
          const lines = content.split('\n').filter(line => line.trim())
          const data = lines.map(line => {
            const values = line.split(',').map(v => parseFloat(v.trim()))
            return values
          })
          
          resolve({
            lead1: data.map(d => d[0] || 0),
            lead2: data.map(d => d[1] || 0),
            lead3: data.map(d => d[2] || 0),
            samplingRate: 250,
            duration: data.length / 250
          })
        } else {
          reject(new Error('Unsupported file format'))
        }
      } catch (error) {
        reject(error)
      }
    }
    
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}

export const calculateHeartRate = (ecgData: number[]): number => {
  const peaks = detectRPeaks(ecgData)
  if (peaks.length < 2) return 0
  
  const intervals = []
  for (let i = 1; i < peaks.length; i++) {
    intervals.push(peaks[i] - peaks[i - 1])
  }
  
  const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
  const heartRate = Math.round((60 * 250) / avgInterval)
  
  return heartRate
}

const detectRPeaks = (data: number[]): number[] => {
  const peaks: number[] = []
  const threshold = Math.max(...data) * 0.6
  
  for (let i = 1; i < data.length - 1; i++) {
    if (data[i] > threshold && data[i] > data[i - 1] && data[i] > data[i + 1]) {
      peaks.push(i)
    }
  }
  
  return peaks
}

export const normalizeECGData = (data: number[]): number[] => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min
  
  return data.map(v => (v - min) / range)
}
