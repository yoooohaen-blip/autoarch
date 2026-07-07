"use client"

import React, { useState } from 'react'
import { ZoomIn, ZoomOut, RotateCcw, Move } from 'lucide-react'

interface CanvasItem {
  id: number
  src: string
  title: string
  x: number
  y: number
  width: number
}

const CanvasTool: React.FC = () => {
  const [zoom, setZoom] = useState(1)
  const [items, setItems] = useState<CanvasItem[]>([
    { id: 1, src: '/og/landing_fallback.jpg', title: 'Blueprint Sketch', x: 40, y: 50, width: 220 },
    { id: 2, src: '/og/render_after.jpg', title: 'Modern Villa Render', x: 300, y: 120, width: 220 },
    { id: 3, src: '/og/pro.jpg', title: 'Living Room Ref', x: 180, y: 220, width: 220 }
  ])
  const [draggedId, setDraggedId] = useState<number | null>(null)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleMouseDown = (id: number, e: React.MouseEvent) => {
    e.preventDefault()
    setDraggedId(id)
    const item = items.find(it => it.id === id)
    if (item) {
      setDragStart({
        x: e.clientX - item.x,
        y: e.clientY - item.y
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedId === null) return
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === draggedId 
          ? { ...item, x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }
          : item
      )
    )
  }

  const handleMouseUp = () => {
    setDraggedId(null)
  }

  return (
    <div 
      className="chat-container-panel"
      style={{ 
        minHeight: '460px', 
        backgroundColor: '#060708', 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
        userSelect: 'none'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Toolbar */}
      <div style={{ 
        backgroundColor: '#0b0c0e', 
        padding: '12px 24px', 
        borderBottom: '1px solid var(--border)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: '#fff', fontWeight: 600, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Canvas Workspace</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={() => setZoom(prev => Math.min(1.5, prev + 0.1))} 
            style={{ 
              width: '32px', height: '32px', borderRadius: '6px', 
              backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', cursor: 'pointer' 
            }}
            title="Zoom In"
          >
            <ZoomIn style={{ width: '14px', height: '14px' }} />
          </button>
          <button 
            onClick={() => setZoom(prev => Math.max(0.6, prev - 0.1))} 
            style={{ 
              width: '32px', height: '32px', borderRadius: '6px', 
              backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', cursor: 'pointer' 
            }}
            title="Zoom Out"
          >
            <ZoomOut style={{ width: '14px', height: '14px' }} />
          </button>
          <button 
            onClick={() => { setZoom(1); setItems([
              { id: 1, src: '/og/landing_fallback.jpg', title: 'Blueprint Sketch', x: 40, y: 50, width: 220 },
              { id: 2, src: '/og/render_after.jpg', title: 'Modern Villa Render', x: 300, y: 120, width: 220 },
              { id: 3, src: '/og/pro.jpg', title: 'Living Room Ref', x: 180, y: 220, width: 220 }
            ])}} 
            style={{ 
              width: '32px', height: '32px', borderRadius: '6px', 
              backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', cursor: 'pointer' 
            }}
            title="Reset Board"
          >
            <RotateCcw style={{ width: '14px', height: '14px' }} />
          </button>
        </div>
      </div>

      {/* Grid Canvas area */}
      <div 
        className="whiteboard-grid-panel"
        style={{ 
          flex: 1, 
          position: 'relative', 
          overflow: 'hidden', 
          minHeight: '400px', 
          width: '100%',
          transform: `scale(${zoom})`, 
          transformOrigin: 'top left' 
        }}
      >
        {items.map(item => (
          <div
            key={item.id}
            style={{ 
              position: 'absolute', 
              borderRadius: '8px', 
              border: '1px solid var(--border)', 
              backgroundColor: '#111215', 
              overflow: 'hidden', 
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)', 
              cursor: 'grab', 
              left: `${item.x}px`, 
              top: `${item.y}px`, 
              width: `${item.width}px` 
            }}
            onMouseDown={(e) => handleMouseDown(item.id, e)}
          >
            <div style={{ 
              backgroundColor: 'rgba(0,0,0,0.3)', 
              padding: '6px 12px', 
              borderBottom: '1px solid var(--border)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              fontSize: '10px', 
              color: 'var(--text-muted)', 
              fontFamily: 'var(--font-mono)' 
            }}>
              <span>{item.title}</span>
              <Move style={{ width: '12px', height: '12px', opacity: 0.5 }} />
            </div>
            <img 
              src={item.src} 
              alt={item.title} 
              style={{ width: '100%', height: 'auto', display: 'block', pointerEvents: 'none', userSelect: 'none' }} 
            />
          </div>
        ))}
        {items.length === 0 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-faint)', fontSize: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
            Board is empty
          </div>
        )}
      </div>
    </div>
  )
}

export default CanvasTool
