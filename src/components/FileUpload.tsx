import React, { useRef } from 'react'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  isAnalyzing: boolean
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isAnalyzing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }

  return (
    <div id="file-upload-section" data-visual-editor-id="ecg-file-upload" className="bg-white rounded-2xl shadow-xl p-6 border border-secondary-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-accent-100 p-3 rounded-xl">
          <i className="bi bi-file-earmark-medical text-accent-600 text-2xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-secondary-800">Upload ECG Data</h2>
      </div>

      <div className="border-2 border-dashed border-secondary-300 rounded-2xl p-8 text-center hover:border-primary-400 transition-all duration-300 bg-secondary-50">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.json,.txt"
          onChange={handleFileChange}
          className="hidden"
          disabled={isAnalyzing}
        />
        
        <div className="space-y-4">
          <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
            <i className="bi bi-cloud-upload text-primary-600 text-4xl"></i>
          </div>
          
          <div>
            <p className="text-lg font-semibold text-secondary-800 mb-2">
              Upload Contec 9805 ECG Data
            </p>
            <p className="text-sm text-secondary-500">
              Supported formats: CSV, JSON, TXT (3-lead data)
            </p>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center space-x-2"
          >
            <i className="bi bi-upload text-xl"></i>
            <span>Select File</span>
          </button>
        </div>
      </div>

      <div className="mt-6 bg-primary-50 rounded-xl p-4 border border-primary-200">
        <div className="flex items-start space-x-3">
          <i className="bi bi-info-circle text-primary-600 text-xl mt-0.5"></i>
          <div className="text-sm text-primary-800">
            <p className="font-semibold mb-1">Device Compatibility</p>
            <p>This system is optimized for Contec 9805 3-lead Holter device data format.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileUpload
