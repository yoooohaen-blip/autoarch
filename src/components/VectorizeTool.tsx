"use client"

import React, { useState } from 'react'
import { Upload, RefreshCw, FileText } from 'lucide-react'
import BeforeAfterSlider from './BeforeAfterSlider'

interface VectorizeToolProps {
  triggerVectorize: boolean
  onVectorizeComplete: () => void
}

const VectorizeTool: React.FC<VectorizeToolProps> = ({
  triggerVectorize,
  onVectorizeComplete,
}) => {
  const [imageUploaded, setImageUploaded] = useState(false)
  const [vectorizing, setVectorizing] = useState(false)
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
    if (triggerVectorize && !vectorizing) {
      setCompleted(false)
      setVectorizing(true)
      setProgress(0)
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setVectorizing(false)
            setCompleted(true)
            onVectorizeComplete()
            return 100
          }
          return prev + 5
        })
      }, 100)
    }
  }, [triggerVectorize])

  return (
    <div className="tool-panel-container">
      
      {/* 1. Initial State */}
      {!imageUploaded && !vectorizing && !completed && (
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
            <h4 className="tool-primary-text">Upload drawing or sketch</h4>
            <p className="tool-secondary-text" style={{ marginTop: '6px' }}>
              Upload freehand concept doodles or elevations to trace outline contours.
            </p>
          </div>
          <div style={{ marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px', width: '100%' }}>
            <button 
              onClick={() => {
                setImageUploaded(true)
                setUploadedFileName('villa_elevation_doodle.png')
              }}
              className="tool-load-sample-btn"
            >
              Load villa_elevation_doodle.png
            </button>
          </div>
        </div>
      )}

      {/* 2. Uploaded / Waiting state */}
      {imageUploaded && !vectorizing && !completed && (
        <div className="tool-waiting-box">
          <div className="tool-icon-frame">
            <FileText className="w-6 h-6 text-[#2e62f6]" />
          </div>
          <div>
            <h4 className="tool-primary-text" style={{ wordBreak: 'break-all' }}>{uploadedFileName}</h4>
            <p className="tool-secondary-text" style={{ color: '#2e62f6', textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', marginTop: '4px' }}>
              Ready to vectorize
            </p>
            <p className="tool-secondary-text" style={{ fontSize: '11px', marginTop: '20px' }}>
              Click <strong style={{ color: '#fff' }}>"Run Vectorize"</strong> in the settings panel to trace contour paths.
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

      {/* 3. Processing state */}
      {vectorizing && (
        <div className="tool-loader-box">
          <div className="tool-loader-circle-wrapper">
            <div className="tool-loader-spinner" />
            <div className="tool-loader-text">{progress}%</div>
          </div>
          <div>
            <h4 className="tool-primary-text" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Running tracing paths...</h4>
            <p className="tool-secondary-text" style={{ marginTop: '6px' }}>
              Mapping layout vectors and generating SVG line contours.
            </p>
          </div>
        </div>
      )}

      {/* 4. Complete Vectorized state */}
      {completed && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className="tool-header-row">
            <div className="tool-status-badge">
              <span className="tool-status-dot active" />
              <span>Vector tracing Completed (.SVG Export)</span>
            </div>
            <button 
              onClick={() => {
                setCompleted(false)
                setImageUploaded(false)
                setProgress(0)
              }}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw className="w-3.5 h-3.5" style={{ width: '14px', height: '14px' }} /> Start New Vectorize
            </button>
          </div>
          
          <div className="tool-output-viewport">
            
            <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px', zIndex: 10 }}>
              <a 
                href="/og/landing_fallback.jpg" 
                download="vector_layout.dxf"
                className="btn-pill-border"
                style={{ fontSize: '10px', padding: '4px 10px', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                DOWNLOAD .DXF
              </a>
              <a 
                href="/og/landing_fallback.jpg" 
                download="vector_layout.svg"
                className="btn-pill-border"
                style={{ fontSize: '10px', padding: '4px 10px', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                DOWNLOAD .SVG
              </a>
            </div>

            <div style={{ width: '100%', height: '100%' }}>
              <BeforeAfterSlider 
                beforeImage="/og/landing_fallback.jpg"
                afterImage="/og/landing_fallback.jpg"
                beforeLabel="Raw Layout Sketch"
                afterLabel="Contour DXF Vector lines"
                isBlurryBefore={false}
                isVectorAfter={true}
              />
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default VectorizeTool
