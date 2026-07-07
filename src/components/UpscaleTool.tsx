"use client"

import React, { useState } from 'react'
import { Upload, RefreshCw, Cpu } from 'lucide-react'
import BeforeAfterSlider from './BeforeAfterSlider'

interface UpscaleToolProps {
  triggerUpscale: boolean
  onUpscaleComplete: () => void
}

const UpscaleTool: React.FC<UpscaleToolProps> = ({
  triggerUpscale,
  onUpscaleComplete,
}) => {
  const [imageUploaded, setImageUploaded] = useState(false)
  const [upscaling, setUpscaling] = useState(false)
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
    if (triggerUpscale && !upscaling) {
      setCompleted(false)
      setUpscaling(true)
      setProgress(0)
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setUpscaling(false)
            setCompleted(true)
            onUpscaleComplete()
            return 100
          }
          return prev + 5
        })
      }, 100)
    }
  }, [triggerUpscale])

  return (
    <div className="tool-panel-container">
      
      {/* 1. Initial State: Upload */}
      {!imageUploaded && !upscaling && !completed && (
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
            <h4 className="tool-primary-text">Upload image to upscale</h4>
            <p className="tool-secondary-text" style={{ marginTop: '6px' }}>
              Enhance details, lines, and textures in low-resolution architectural assets.
            </p>
          </div>
          <div style={{ marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px', width: '100%' }}>
            <button 
              onClick={() => {
                setImageUploaded(true)
                setUploadedFileName('low_res_sketchup_export.jpg')
              }}
              className="tool-load-sample-btn"
            >
              Load low_res_sketchup_export.jpg
            </button>
          </div>
        </div>
      )}

      {/* 2. Uploaded / Waiting state */}
      {imageUploaded && !upscaling && !completed && (
        <div className="tool-waiting-box">
          <div className="tool-icon-frame">
            <Cpu className="w-6 h-6 text-[#2e62f6]" />
          </div>
          <div>
            <h4 className="tool-primary-text" style={{ wordBreak: 'break-all' }}>{uploadedFileName}</h4>
            <p className="tool-secondary-text" style={{ color: '#2e62f6', textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', marginTop: '4px' }}>
              Low-Resolution Detected
            </p>
            <p className="tool-secondary-text" style={{ fontSize: '11px', marginTop: '20px' }}>
              Click <strong style={{ color: '#fff' }}>"Run Upscale"</strong> in the settings drawer to increase resolution.
            </p>
          </div>
          <div style={{ marginTop: '10px' }}>
            <label className="btn-pill-border" style={{ fontSize: '11px', padding: '6px 14px' }}>
              Change image
              <input type="file" onChange={handleFileUpload} accept="image/*" style={{ display: 'none' }} />
            </label>
          </div>
        </div>
      )}

      {/* 3. Upscaling state */}
      {upscaling && (
        <div className="tool-loader-box">
          <div className="tool-loader-circle-wrapper">
            <div className="tool-loader-spinner" />
            <div className="tool-loader-text">{progress}%</div>
          </div>
          <div>
            <h4 className="tool-primary-text" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Upscaling...</h4>
            <p className="tool-secondary-text" style={{ marginTop: '6px' }}>
              Synthesizing detail mapping fields and expanding grid lines.
            </p>
          </div>
        </div>
      )}

      {/* 4. Complete Upscaled output state */}
      {completed && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className="tool-header-row">
            <div className="tool-status-badge">
              <span className="tool-status-dot active" />
              <span>Upscaling Completed (4K Resolution)</span>
            </div>
            <button 
              onClick={() => {
                setCompleted(false)
                setImageUploaded(false)
                setProgress(0)
              }}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw className="w-3.5 h-3.5" style={{ width: '14px', height: '14px' }} /> Start New Upscale
            </button>
          </div>
          
          <div className="tool-output-viewport">
            <BeforeAfterSlider 
              beforeImage="/og/render_after.jpg"
              afterImage="/og/render_after.jpg"
              beforeLabel="Raw Low-Res Input"
              afterLabel="AI Upscaled 4K Result"
              isBlurryBefore={true}
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default UpscaleTool
