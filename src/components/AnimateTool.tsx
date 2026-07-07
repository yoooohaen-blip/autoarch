"use client"

import React, { useState } from 'react'
import { Play, Pause, RefreshCw, Video } from 'lucide-react'

interface AnimateToolProps {
  triggerAnimate: boolean
  onAnimateComplete: () => void
}

const AnimateTool: React.FC<AnimateToolProps> = ({
  triggerAnimate,
  onAnimateComplete,
}) => {
  const [imageUploaded, setImageUploaded] = useState(true)
  const [animating, setAnimating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  React.useEffect(() => {
    if (triggerAnimate && !animating) {
      setCompleted(false)
      setAnimating(true)
      setProgress(0)
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setAnimating(false)
            setCompleted(true)
            setIsPlaying(true)
            onAnimateComplete()
            return 100
          }
          return prev + 4
        })
      }, 120)
    }
  }, [triggerAnimate])

  return (
    <div className="tool-panel-container">
      
      {/* 1. Initial State */}
      {!animating && !completed && (
        <div className="tool-upload-box">
          <div className="tool-upload-circle" style={{ cursor: 'default' }}>
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h4 className="tool-primary-text">Generate drone flythrough animation</h4>
            <p className="tool-secondary-text" style={{ marginTop: '6px' }}>
              Create a fluid camera path animation flythrough based on your layout image.
            </p>
          </div>
          <div style={{ marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px', width: '100%', textAlign: 'left' }}>
            <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#2e62f6', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
              Animation preset parameters:
            </p>
            <p className="tool-prompt-italics">
              Drone tracking path: Front garden overview panning left-to-right (12 seconds loop)
            </p>
          </div>
          <p className="tool-secondary-text" style={{ fontSize: '11px', marginTop: '20px' }}>
            Click <strong style={{ color: '#fff' }}>"Animate Output"</strong> in the settings drawer to build.
          </p>
        </div>
      )}

      {/* 2. Generating animation loader */}
      {animating && (
        <div className="tool-loader-box">
          <div className="tool-loader-circle-wrapper">
            <div className="tool-loader-spinner" />
            <div className="tool-loader-text">{progress}%</div>
          </div>
          <div>
            <h4 className="tool-primary-text" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tracing camera path...</h4>
            <p className="tool-secondary-text" style={{ marginTop: '6px' }}>
              Synthesizing perspective motion fields and interpolating sub-frames.
            </p>
          </div>
        </div>
      )}

      {/* 3. Output interactive animation player */}
      {completed && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className="tool-header-row">
            <div className="tool-status-badge">
              <span className="tool-status-dot active" />
              <span>Interactive Drone Flythrough Video</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', 
                  borderRadius: '6px', padding: '6px 14px', color: '#fff', fontSize: '11px',
                  display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontFamily: 'var(--font-mono)'
                }}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" style={{ width: '12px', height: '12px' }} /> : <Play className="w-3.5 h-3.5" style={{ width: '12px', height: '12px' }} />}
                {isPlaying ? 'Pause Pan' : 'Play Pan'}
              </button>
              <button 
                onClick={() => {
                  setCompleted(false)
                  setProgress(0)
                }}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <RefreshCw className="w-3.5 h-3.5" style={{ width: '14px', height: '14px' }} /> Reset Camera
              </button>
            </div>
          </div>
          
          {/* Animated viewport showing smooth CSS scale/translate zoom-pan */}
          <div className="tool-output-viewport" style={{ flex: 1, minHeight: '300px' }}>
            
            <img 
              src="/og/render_after.jpg" 
              alt="Animate Camera" 
              className={isPlaying ? 'animate-drone-camera' : ''}
              style={{ width: '100%', height: '100%', objectFit: 'cover', userSelect: 'none', pointerEvents: 'none' }}
            />
            
            <div style={{ 
              position: 'absolute', bottom: '16px', left: '16px', right: '16px',
              backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
              padding: '10px 16px', borderRadius: '6px', border: '1px solid var(--border)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
            }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Camera motion: Drone Orbit Pan</span>
              <a 
                href="/og/render_after.jpg" 
                download="auto_arch_drone_flythrough.mp4"
                style={{ fontSize: '10px', color: '#2e62f6', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontWeight: 600 }}
              >
                DOWNLOAD .MP4
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default AnimateTool
