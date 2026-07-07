"use client"

import React, { useState, useRef } from 'react'
import { RefreshCw, Upload } from 'lucide-react'

interface EditToolProps {
  prompt: string
  triggerEdit: boolean
  onEditComplete: () => void
}

const EditTool: React.FC<EditToolProps> = ({
  prompt,
  triggerEdit,
  onEditComplete,
}) => {
  const [editing, setEditing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [brushSize, setBrushSize] = useState(25)
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleClearMask = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }

  const drawMask = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height

    if (isDrawing) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.4)' // Red mask
      ctx.beginPath()
      ctx.arc(x, y, brushSize, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  React.useEffect(() => {
    if (triggerEdit && !editing) {
      setCompleted(false)
      setEditing(true)
      setProgress(0)
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setEditing(false)
            setCompleted(true)
            onEditComplete()
            return 100
          }
          return prev + 5
        })
      }, 100)
    }
  }, [triggerEdit])

  return (
    <div className="tool-panel-container" style={{ justifyContent: 'space-between', alignItems: 'stretch' }}>
      
      {/* 1. Header controls */}
      <div className="tool-header-row" style={{ marginBottom: '16px' }}>
        <div className="tool-status-badge">
          <span className={`tool-status-dot ${completed ? 'active' : ''}`} />
          <span>{completed ? 'Modification Applied Successfully' : 'Drag on image to paint edit mask'}</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button 
            onClick={handleClearMask}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px' }}
          >
            Clear Mask
          </button>
          {completed && (
            <button 
              onClick={() => {
                setCompleted(false)
                setTimeout(handleClearMask, 50)
              }}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw className="w-3.5 h-3.5" style={{ width: '14px', height: '14px' }} /> Reset Edit
            </button>
          )}
        </div>
      </div>

      {/* 2. Main Interactive Masking Canvas Area */}
      <div className="tool-output-viewport" style={{ flex: 1, minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Render base image */}
        <img 
          src={completed ? "/og/change_furniture_after.jpg" : "/og/render_after.jpg"} 
          alt="Base Editor"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', userSelect: 'none' }}
        />

        {/* Translucent overlay for drawing masks */}
        {!completed && (
          <canvas
            ref={canvasRef}
            width={800}
            height={480}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair', zIndex: 10 }}
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
            onMouseMove={drawMask}
          />
        )}

        {completed && (
          <div style={{ 
            position: 'absolute', top: '16px', left: '16px', 
            backgroundColor: 'rgba(16,185,129,0.85)', backdropFilter: 'blur(8px)',
            color: '#fff', fontSize: '10px', fontFamily: 'var(--font-mono)', 
            padding: '6px 12px', borderRadius: '4px', border: '1px solid #10b981' 
          }}>
            Mask applied: Facade modified
          </div>
        )}

      </div>

      {/* Brush settings */}
      {!completed && !editing && (
        <div style={{ 
          marginTop: '16px', display: 'flex', alignItems: 'center', gap: '16px', 
          backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', 
          borderRadius: '8px', padding: '12px 16px' 
        }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Brush Size: {brushSize}px</span>
          <input 
            type="range" 
            min="10" 
            max="60" 
            value={brushSize} 
            onChange={(e) => setBrushSize(Number(e.target.value))}
            style={{ 
              width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.1)', 
              borderRadius: '2px', outline: 'none', cursor: 'pointer', accentColor: '#fff' 
            }}
          />
        </div>
      )}

      {/* Loader */}
      {editing && (
        <div style={{ 
          position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', 
          backdropFilter: 'blur(8px)', zIndex: 20, display: 'flex', 
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' 
        }}>
          <div className="tool-loader-circle-wrapper">
            <div className="tool-loader-spinner" />
            <div className="tool-loader-text">{progress}%</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 className="tool-primary-text" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Inpainting modified areas...</h4>
            <p className="tool-secondary-text" style={{ marginTop: '6px' }}>
              Replacing concrete fields using visual layout prompt mask.
            </p>
          </div>
        </div>
      )}

    </div>
  )
}

export default EditTool
