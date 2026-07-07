"use client"

import React, { useState } from 'react'
import { Upload, RefreshCw } from 'lucide-react'
import BeforeAfterSlider from './BeforeAfterSlider'

interface StageToolProps {
  stylePreset: string
  triggerStage: boolean
  onStageComplete: () => void
}

const StageTool: React.FC<StageToolProps> = ({
  stylePreset,
  triggerStage,
  onStageComplete,
}) => {
  const [imageUploaded, setImageUploaded] = useState(false)
  const [staging, setStaging] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState('')

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageUploaded(true)
      setUploadedFileName(e.target.files[0].name)
      setCompleted(false)
      setProgress(0)
    }
  }

  React.useEffect(() => {
    if (triggerStage && !staging) {
      setCompleted(false)
      setStaging(true)
      setProgress(0)
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setStaging(false)
            setCompleted(true)
            onStageComplete()
            return 100
          }
          return prev + 5
        })
      }, 100)
    }
  }, [triggerStage])

  return (
    <div className="tool-panel-container">
      
      {/* 1. Initial State: Upload Empty room photo */}
      {!imageUploaded && !staging && !completed && (
        <div className="tool-upload-box">
          <div className="tool-upload-circle">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileUpload}
              className="tool-upload-input"
            />
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h4 className="tool-primary-text">Upload room photo to furnish</h4>
            <p className="tool-secondary-text" style={{ marginTop: '6px' }}>
              Drop in an empty lounge, bedroom, or facade to virtually furnish.
            </p>
          </div>
          <div style={{ marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px', width: '100%' }}>
            <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>
              or load our empty concrete sample:
            </p>
            <button 
              onClick={() => {
                setImageUploaded(true)
                setUploadedFileName('empty_concrete_lounge.jpg')
              }}
              className="tool-load-sample-btn"
            >
              Load empty_concrete_lounge.jpg
            </button>
          </div>
        </div>
      )}

      {/* 2. Uploaded / Waiting state */}
      {imageUploaded && !staging && !completed && (
        <div className="tool-waiting-box">
          <div className="tool-icon-frame">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '22px', height: '22px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>
            <h4 className="tool-primary-text" style={{ wordBreak: 'break-all' }}>{uploadedFileName}</h4>
            <p className="tool-secondary-text" style={{ color: '#2e62f6', textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', marginTop: '4px' }}>
              Ready to stage
            </p>
            <p className="tool-secondary-text" style={{ fontSize: '11px', marginTop: '20px' }}>
              Choose your furnishing style in the settings panel and click <strong style={{ color: '#fff' }}>"Furnish Space"</strong>.
            </p>
          </div>
          <div style={{ marginTop: '10px' }}>
            <label className="btn-pill-border" style={{ fontSize: '11px', padding: '6px 14px' }}>
              Change file
              <input type="file" onChange={handleFileUpload} accept="image/*" style={{ display: 'none' }} />
            </label>
          </div>
        </div>
      )}

      {/* 3. Generating Staging state */}
      {staging && (
        <div className="tool-loader-box">
          <div className="tool-loader-circle-wrapper">
            <div className="tool-loader-spinner" />
            <div className="tool-loader-text">{progress}%</div>
          </div>
          <div>
            <h4 className="tool-primary-text" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Staging space...</h4>
            <p className="tool-secondary-text" style={{ marginTop: '6px' }}>
              Applying room geometry conditioning and placing furniture: <strong style={{ color: '#fff' }}>{stylePreset}</strong>.
            </p>
          </div>
        </div>
      )}

      {/* 4. Complete Staged output state */}
      {completed && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className="tool-header-row">
            <div className="tool-status-badge">
              <span className="tool-status-dot active" />
              <span>Virtually Staged ({stylePreset})</span>
            </div>
            <button 
              onClick={() => {
                setCompleted(false)
                setImageUploaded(false)
                setProgress(0)
              }}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw className="w-3.5 h-3.5" style={{ width: '14px', height: '14px' }} /> Start New Staging
            </button>
          </div>
          
          <div className="tool-output-viewport">
            <BeforeAfterSlider 
              beforeImage="/og/pro.jpg"
              afterImage="/og/change_furniture_after.jpg"
              beforeLabel="Raw Interior Space"
              afterLabel={`Virtually Staged (${stylePreset})`}
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default StageTool
