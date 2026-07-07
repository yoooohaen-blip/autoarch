"use client"

import React, { useState } from 'react'
import { Upload, RefreshCw, Box } from 'lucide-react'

interface ThreeDToolProps {
  triggerBuild: boolean
  onBuildComplete: () => void
}

const ThreeDTool: React.FC<ThreeDToolProps> = ({
  triggerBuild,
  onBuildComplete,
}) => {
  const [imageUploaded, setImageUploaded] = useState(false)
  const [building, setBuilding] = useState(false)
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
    if (triggerBuild && !building) {
      setCompleted(false)
      setBuilding(true)
      setProgress(0)
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setBuilding(false)
            setCompleted(true)
            onBuildComplete()
            return 100
          }
          return prev + 4
        })
      }, 120)
    }
  }, [triggerBuild])

  return (
    <div className="tool-panel-container">
      
      {/* 1. Initial State: Upload 2D Blueprint */}
      {!imageUploaded && !building && !completed && (
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
            <h4 className="tool-primary-text">Upload floor plan blueprint</h4>
            <p className="tool-secondary-text" style={{ marginTop: '6px' }}>
              Drop in a layout drawing or PDF to extrude into an interactive 3D mesh model.
            </p>
          </div>
          <div style={{ marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px', width: '100%' }}>
            <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>
              or load our sample floorplan blueprint:
            </p>
            <button 
              onClick={() => {
                setImageUploaded(true)
                setUploadedFileName('villa_floorplan_layout.png')
              }}
              className="tool-load-sample-btn"
            >
              Load villa_floorplan_layout.png
            </button>
          </div>
        </div>
      )}

      {/* 2. Uploaded / Waiting state */}
      {imageUploaded && !building && !completed && (
        <div className="tool-waiting-box">
          <div className="tool-icon-frame">
            <Box className="w-6 h-6 text-[#2e62f6]" />
          </div>
          <div>
            <h4 className="tool-primary-text" style={{ wordBreak: 'break-all' }}>{uploadedFileName}</h4>
            <p className="tool-secondary-text" style={{ color: '#2e62f6', textTransform: 'uppercase', fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', marginTop: '4px' }}>
              Blueprint Analyzed
            </p>
            <p className="tool-secondary-text" style={{ fontSize: '11px', marginTop: '20px' }}>
              Click <strong style={{ color: '#fff' }}>"Build 3D Model"</strong> in the settings panel to generate the extrusion mesh.
            </p>
          </div>
          <div style={{ marginTop: '10px' }}>
            <label className="btn-pill-border" style={{ fontSize: '11px', padding: '6px 14px' }}>
              Change blueprint
              <input type="file" onChange={handleFileUpload} accept="image/*" style={{ display: 'none' }} />
            </label>
          </div>
        </div>
      )}

      {/* 3. Extruding 3D model state */}
      {building && (
        <div className="tool-loader-box">
          <div className="tool-loader-circle-wrapper">
            <div className="tool-loader-spinner" />
            <div className="tool-loader-text">{progress}%</div>
          </div>
          <div>
            <h4 className="tool-primary-text" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Extruding 3D Mesh...</h4>
            <p className="tool-secondary-text" style={{ marginTop: '6px' }}>
              Generating OBJ geometries, scaling walls, and mapping textures.
            </p>
          </div>
        </div>
      )}

      {/* 4. Complete 3D viewport state */}
      {completed && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className="tool-header-row">
            <div className="tool-status-badge">
              <span className="tool-status-dot active" />
              <span>Interactive 3D Preview (Obj / Gltf Format)</span>
            </div>
            <button 
              onClick={() => {
                setCompleted(false)
                setImageUploaded(false)
                setProgress(0)
              }}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw className="w-3.5 h-3.5" style={{ width: '14px', height: '14px' }} /> Reset 3D mesh
            </button>
          </div>
          
          {/* CSS 3D Cube Viewer */}
          <div className="tool-output-viewport mesh-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
            
            <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px', zIndex: 10 }}>
              <a 
                href="/og/render_after.jpg" 
                download="auto_arch_model.obj"
                className="btn-pill-border"
                style={{ fontSize: '10px', padding: '4px 10px', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                DOWNLOAD .OBJ
              </a>
              <a 
                href="/og/render_after.jpg" 
                download="auto_arch_model.gltf"
                className="btn-pill-border"
                style={{ fontSize: '10px', padding: '4px 10px', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                DOWNLOAD .GLTF
              </a>
            </div>

            {/* Rotating 3D Object */}
            <div className="rotating-mesh" style={{ width: '160px', height: '160px', position: 'relative' }}>
              
              {/* Front Face */}
              <div 
                style={{ 
                  position: 'absolute', width: '160px', height: '160px', border: '1px solid rgba(46,98,246,0.3)',
                  backgroundImage: "url('/og/render_after.jpg')", backgroundSize: 'cover', backgroundPosition: 'center',
                  transform: "translateZ(80px)", opacity: 0.9
                }}
              />
              {/* Back Face */}
              <div 
                style={{ 
                  position: 'absolute', width: '160px', height: '160px', border: '1px solid rgba(46,98,246,0.3)',
                  backgroundImage: "url('/og/landing_fallback.jpg')", backgroundSize: 'cover', backgroundPosition: 'center',
                  transform: "rotateY(180deg) translateZ(80px)", opacity: 0.9
                }}
              />
              {/* Left Face */}
              <div 
                style={{ 
                  position: 'absolute', width: '160px', height: '160px', border: '1px solid rgba(46,98,246,0.3)',
                  backgroundImage: "url('/og/pro.jpg')", backgroundSize: 'cover', backgroundPosition: 'center',
                  transform: "rotateY(-90deg) translateZ(80px)", opacity: 0.85
                }}
              />
              {/* Right Face */}
              <div 
                style={{ 
                  position: 'absolute', width: '160px', height: '160px', border: '1px solid rgba(46,98,246,0.3)',
                  backgroundImage: "url('/og/change_furniture_after.jpg')", backgroundSize: 'cover', backgroundPosition: 'center',
                  transform: "rotateY(90deg) translateZ(80px)", opacity: 0.85
                }}
              />
              {/* Top Face */}
              <div 
                style={{ 
                  position: 'absolute', width: '160px', height: '160px', border: '1px solid rgba(46,98,246,0.3)',
                  backgroundColor: '#111215', transform: "rotateX(90deg) translateZ(80px)",
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#2e62f6'
                }}
              >
                AUTO ARCH 3D
              </div>
              {/* Bottom Face */}
              <div 
                style={{ 
                  position: 'absolute', width: '160px', height: '160px', border: '1px solid rgba(46,98,246,0.3)',
                  backgroundColor: '#050607', transform: "rotateX(-90deg) translateZ(80px)"
                }}
              />

            </div>

            <div style={{ position: 'absolute', bottom: '16px', textAlign: 'center', pointerEvents: 'none' }}>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', backgroundColor: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                DRAG OR USE MOUSE WHEEL TO NAVIGATE (MOCKUP)
              </span>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default ThreeDTool
