"use client"

import React, { useState } from 'react'
import { Upload, RefreshCw } from 'lucide-react'
import BeforeAfterSlider from './BeforeAfterSlider'

interface RenderToolProps {
  stylePreset: string
  prompt: string
  triggerRender: boolean
  onRenderComplete: () => void
}

const RenderTool: React.FC<RenderToolProps> = ({
  stylePreset,
  prompt,
  triggerRender,
  onRenderComplete,
}) => {
  const [imageUploaded, setImageUploaded] = useState(false)
  const [rendering, setRendering] = useState(false)
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
    if (triggerRender && !rendering) {
      setCompleted(false)
      setRendering(true)
      setProgress(0)
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setRendering(false)
            setCompleted(true)
            onRenderComplete()
            return 100
          }
          return prev + 5
        })
      }, 100)
    }
  }, [triggerRender])

  return (
    <div className="tool-panel-container">
      
      {/* 1. Initial State: Upload CAD/Sketch */}
      {!imageUploaded && !rendering && !completed && (
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
            <h4 className="tool-primary-text">Upload elevation plan or sketch</h4>
            <p className="tool-secondary-text" style={{ marginTop: '6px' }}>
              Drag & drop CAD elevations, freehand sketches, or facade plans to render.
            </p>
          </div>
          <div style={{ marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px', width: '100%' }}>
            <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>
              or load our elevation blueprint:
            </p>
            <button 
              onClick={() => {
                setImageUploaded(true)
                setUploadedFileName('blueprint_villa_elevation.dwg')
              }}
              className="tool-load-sample-btn"
            >
              Load blueprint_villa_elevation.dwg
            </button>
          </div>
        </div>
      )}

      {/* 2. Uploaded / Waiting state */}
      {imageUploaded && !rendering && !completed && (
        <div className="tool-waiting-box">
          <div className="tool-icon-frame">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '22px', height: '22px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h4 className="tool-primary-text" style={{ wordBreak: 'break-all' }}>{uploadedFileName}</h4>
            <p className="tool-secondary-text" style={{ color: '#2e62f6', textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', marginTop: '4px' }}>
              Ready to render
            </p>
            {prompt && (
              <p className="tool-prompt-italics" style={{ marginTop: '16px' }}>
                "{prompt}"
              </p>
            )}
            <p className="tool-secondary-text" style={{ fontSize: '11px', marginTop: '20px' }}>
              Click the <strong style={{ color: '#fff' }}>"Generate Render"</strong> button in the right settings panel to run the AI visualizer.
            </p>
          </div>
          <div style={{ marginTop: '10px' }}>
            <label className="btn-pill-border" style={{ fontSize: '11px', padding: '6px 14px' }}>
              Change file
              <input type="file" onChange={handleFileUpload} accept="image/*" className="hidden" style={{ display: 'none' }} />
            </label>
          </div>
        </div>
      )}

      {/* 3. Generating Render state */}
      {rendering && (
        <div className="tool-loader-box">
          <div className="tool-loader-circle-wrapper">
            <div className="tool-loader-spinner" />
            <div className="tool-loader-text">{progress}%</div>
          </div>
          <div>
            <h4 className="tool-primary-text" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Rendering...</h4>
            <p className="tool-secondary-text" style={{ marginTop: '6px' }}>
              Applying layout constraints and style preset: <strong style={{ color: '#fff' }}>{stylePreset}</strong>.
            </p>
          </div>
        </div>
      )}

      {/* 4. Complete Render output state */}
      {completed && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className="tool-header-row">
            <div className="tool-status-badge">
              <span className="tool-status-dot active" />
              <span>Render Completed ({stylePreset})</span>
            </div>
            <button 
              onClick={() => {
                setCompleted(false)
                setImageUploaded(false)
                setProgress(0)
              }}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw className="w-3.5 h-3.5" style={{ width: '14px', height: '14px' }} /> Start New Render
            </button>
          </div>
          
          <div className="tool-output-viewport">
            <BeforeAfterSlider 
              beforeImage="/og/landing_fallback.jpg"
              afterImage="/og/render_after.jpg"
              beforeLabel="Blueprint Input"
              afterLabel={`AI Render Output (${stylePreset})`}
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default RenderTool
