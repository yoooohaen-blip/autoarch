"use client"

import React, { useState } from 'react'
import { RefreshCw, Compass } from 'lucide-react'

interface VisualizeToolProps {
  prompt: string
  triggerVisualize: boolean
  onVisualizeComplete: () => void
}

const VisualizeTool: React.FC<VisualizeToolProps> = ({
  prompt,
  triggerVisualize,
  onVisualizeComplete,
}) => {
  const [visualizing, setVisualizing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)

  React.useEffect(() => {
    if (triggerVisualize && !visualizing) {
      setCompleted(false)
      setVisualizing(true)
      setProgress(0)
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setVisualizing(false)
            setCompleted(true)
            onVisualizeComplete()
            return 100
          }
          return prev + 5
        })
      }, 100)
    }
  }, [triggerVisualize])

  return (
    <div className="tool-panel-container">
      
      {/* 1. Initial State */}
      {!visualizing && !completed && (
        <div className="tool-upload-box">
          <div className="tool-upload-circle" style={{ cursor: 'default' }}>
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="tool-primary-text">Describe an architectural scene</h4>
            <p className="tool-secondary-text" style={{ marginTop: '6px' }}>
              Explain materials, lighting, style, foliage, and context to generate renders.
            </p>
          </div>
          <div style={{ marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px', width: '100%', textAlign: 'left' }}>
            <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#2e62f6', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
              Example Prompt:
            </p>
            <p className="tool-prompt-italics">
              "A high-end concrete villa overlooking a pine forest at golden hour, minimalist style, 8k resolution"
            </p>
          </div>
        </div>
      )}

      {/* 2. Visualizing state */}
      {visualizing && (
        <div className="tool-loader-box">
          <div className="tool-loader-circle-wrapper">
            <div className="tool-loader-spinner" />
            <div className="tool-loader-text">{progress}%</div>
          </div>
          <div>
            <h4 className="tool-primary-text" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Generating scene...</h4>
            <p className="tool-secondary-text" style={{ marginTop: '6px' }}>
              Synthesizing texture fields and mapping details.
            </p>
          </div>
        </div>
      )}

      {/* 3. Output state */}
      {completed && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className="tool-header-row">
            <div className="tool-status-badge">
              <span className="tool-status-dot active" />
              <span>Scene Generated Successfully</span>
            </div>
            <button 
              onClick={() => {
                setCompleted(false)
                setProgress(0)
              }}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw className="w-3.5 h-3.5" style={{ width: '14px', height: '14px' }} /> Start New Scene
            </button>
          </div>
          
          <div className="tool-output-viewport">
            <img 
              src="/og/render_after.jpg" 
              alt="Visualize Output" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {prompt && (
              <div style={{ 
                position: 'absolute', bottom: '16px', left: '16px', right: '16px', 
                backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', 
                padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border)',
                fontSize: '12px', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' 
              }}>
                Prompt: "{prompt}"
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default VisualizeTool
