import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ECGChartProps {
  data: number[]
  label: string
  color: string
}

const ECGChart: React.FC<ECGChartProps> = ({ data, label, color }) => {
  const chartData = {
    labels: data.map((_, i) => i),
    datasets: [
      {
        label: label,
        data: data,
        borderColor: color,
        backgroundColor: `${color}20`,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.1
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        grid: {
          color: '#e2e8f0'
        }
      },
      x: {
        grid: {
          color: '#e2e8f0'
        },
        ticks: {
          maxTicksLimit: 10
        }
      }
    }
  }

  return (
    <div className="h-48">
      <Line data={chartData} options={options} />
    </div>
  )
}

export default ECGChart
