"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Bot,
  Sparkles,
  Layers,
  Cpu,
  Image as ImageIcon,
  Compass,
  Monitor,
  Video,
  FileText,
  Home,
  CheckCircle,
  HelpCircle
} from 'lucide-react'

// Sub-tools
import ChatTool from './ChatTool'
import RenderTool from './RenderTool'
import CanvasTool from './CanvasTool'
import StageTool from './StageTool'
import ThreeDTool from './ThreeDTool'
import VisualizeTool from './VisualizeTool'
import UpscaleTool from './UpscaleTool'
import EditTool from './EditTool'
import AnimateTool from './AnimateTool'
import VectorizeTool from './VectorizeTool'

type ToolType = 'chat' | 'render' | 'canvas' | 'visualize' | 'stage' | 'upscale' | 'edit' | 'animate' | 'vectorize' | '3d'

const Workspace: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('render')
  const [stylePreset, setStylePreset] = useState('Modern Villa')
  const [prompt, setPrompt] = useState('A photorealistic architectural layout with glass facade and concrete walls in forest context')
  const [resolution, setResolution] = useState('Standard')
  const [credits, setCredits] = useState(3)
  
  // Interactive triggers for tool generation states
  const [triggerRender, setTriggerRender] = useState(false)
  const [triggerStage, setTriggerStage] = useState(false)
  const [triggerBuild3D, setTriggerBuild3D] = useState(false)
  const [triggerVisualize, setTriggerVisualize] = useState(false)
  const [triggerUpscale, setTriggerUpscale] = useState(false)
  const [triggerEdit, setTriggerEdit] = useState(false)
  const [triggerAnimate, setTriggerAnimate] = useState(false)
  const [triggerVectorize, setTriggerVectorize] = useState(false)

  // Listen to search params for direct tool launching
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const tool = params.get('tool')
      if (tool && ['chat', 'render', 'canvas', 'visualize', 'stage', 'upscale', 'edit', 'animate', 'vectorize', '3d'].includes(tool)) {
        setActiveTool(tool as ToolType)
      }
    }
  }, [])

  const handleGenerate = () => {
    if (activeTool === 'render') {
      setTriggerRender(true)
    } else if (activeTool === 'stage') {
      setTriggerStage(true)
    } else if (activeTool === '3d') {
      setTriggerBuild3D(true)
    } else if (activeTool === 'visualize') {
      setTriggerVisualize(true)
    } else if (activeTool === 'upscale') {
      setTriggerUpscale(true)
    } else if (activeTool === 'edit') {
      setTriggerEdit(true)
    } else if (activeTool === 'animate') {
      setTriggerAnimate(true)
    } else if (activeTool === 'vectorize') {
      setTriggerVectorize(true)
    }
  }

  const handleRenderComplete = () => {
    setTriggerRender(false)
    if (credits > 0) setCredits(prev => prev - 1)
  }

  const handleStageComplete = () => {
    setTriggerStage(false)
    if (credits > 0) setCredits(prev => prev - 1)
  }

  const handleBuildComplete = () => {
    setTriggerBuild3D(false)
    if (credits > 0) setCredits(prev => prev - 1)
  }

  const handleVisualizeComplete = () => {
    setTriggerVisualize(false)
    if (credits > 0) setCredits(prev => prev - 1)
  }

  const handleUpscaleComplete = () => {
    setTriggerUpscale(false)
    if (credits > 0) setCredits(prev => prev - 1)
  }

  const handleEditComplete = () => {
    setTriggerEdit(false)
    if (credits > 0) setCredits(prev => prev - 1)
  }

  const handleAnimateComplete = () => {
    setTriggerAnimate(false)
    if (credits > 0) setCredits(prev => prev - 1)
  }

  const handleVectorizeComplete = () => {
    setTriggerVectorize(false)
    if (credits > 0) setCredits(prev => prev - 1)
  }

  const handleToolChange = (tool: ToolType) => {
    setActiveTool(tool)
  }

  // Sidebar tools definition
  const sidebarItems = [
    { id: 'chat', label: 'AI Chat', icon: <Bot className="w-5 h-5" /> },
    { id: 'render', label: 'Render', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'canvas', label: 'Canvas', icon: <Layers className="w-5 h-5" /> },
    { id: 'visualize', label: 'Visualize', icon: <Compass className="w-5 h-5" /> },
    { id: 'stage', label: 'Stage', icon: <Home className="w-5 h-5" /> },
    { id: 'upscale', label: 'Upscale', icon: <Cpu className="w-5 h-5" /> },
    { id: 'edit', label: 'Edit', icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'animate', label: 'Animate', icon: <Video className="w-5 h-5" /> },
    { id: 'vectorize', label: 'Vectorize', icon: <FileText className="w-5 h-5" /> },
    { id: '3d', label: '3D Mesh', icon: <Monitor className="w-5 h-5" /> }
  ] as const

  return (
    <div className="workspace-layout">
      
      {/* Top Header */}
      <header className="workspace-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div style={{ width: '1px', height: '16px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase' }}>
            Auto Arch Console
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.03)', 
            border: '1px solid var(--border)', 
            borderRadius: '20px', 
            padding: '6px 14px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px' 
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2e62f6', display: 'inline-block' }} />
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.9)' }}>
              {credits} Credits Left
            </span>
          </div>
          
          <button 
            onClick={() => setCredits(3)} 
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '11px', 
              color: 'var(--text-muted)', 
              textTransform: 'uppercase', 
              cursor: 'pointer',
              fontWeight: 600,
              letterSpacing: '0.05em'
            }}
          >
            Refill
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="workspace-container-body">
        
        {/* Left Sidebar */}
        <nav className="sidebar-tools-panel">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleToolChange(item.id as ToolType)}
              className={`sidebar-btn ${activeTool === item.id ? 'active' : ''}`}
              title={item.label}
            >
              {item.icon}
            </button>
          ))}
        </nav>

        {/* Center Viewport */}
        <div className="center-viewport-panel">
          
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 300, color: '#fff', textTransform: 'capitalize' }}>
              {activeTool === '3d' ? '3D Mesh' : activeTool} Tool
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {activeTool === 'chat' && "Get design feedback or layout queries resolved directly by AI."}
              {activeTool === 'render' && "Upload a drawing/elevation layout to convert into photo rendering."}
              {activeTool === 'canvas' && "Organize, move, and size reference photos on a blackboard."}
              {activeTool === 'visualize' && "Describe an architectural scene using prompts and generate rendering."}
              {activeTool === 'stage' && "Place virtual furniture configurations onto an empty interior image."}
              {activeTool === '3d' && "Automatically build a rotating 3D mesh model from a 2D floorplan."}
              {activeTool === 'upscale' && "Enhance and upscale your renders with high-resolution textures up to 4K."}
              {activeTool === 'edit' && "Modify parts of your design layout by explaining changes or painting masks."}
              {activeTool === 'animate' && "Generate flythrough video animations from your layout photos."}
              {activeTool === 'vectorize' && "Trace sketch layouts and elevations into vector files."}
            </p>
          </div>

          <div style={{ flex: 1 }}>
            {activeTool === 'chat' && <ChatTool />}
            {activeTool === 'render' && (
              <RenderTool 
                stylePreset={stylePreset}
                prompt={prompt}
                triggerRender={triggerRender}
                onRenderComplete={handleRenderComplete}
              />
            )}
            {activeTool === 'canvas' && <CanvasTool />}
            {activeTool === 'stage' && (
              <StageTool 
                stylePreset={stylePreset}
                triggerStage={triggerStage}
                onStageComplete={handleStageComplete}
              />
            )}
            {activeTool === '3d' && (
              <ThreeDTool 
                triggerBuild={triggerBuild3D}
                onBuildComplete={handleBuildComplete}
              />
            )}
            {activeTool === 'visualize' && (
              <VisualizeTool 
                prompt={prompt}
                triggerVisualize={triggerVisualize}
                onVisualizeComplete={handleVisualizeComplete}
              />
            )}
            {activeTool === 'upscale' && (
              <UpscaleTool 
                triggerUpscale={triggerUpscale}
                onUpscaleComplete={handleUpscaleComplete}
              />
            )}
            {activeTool === 'edit' && (
              <EditTool 
                prompt={prompt}
                triggerEdit={triggerEdit}
                onEditComplete={handleEditComplete}
              />
            )}
            {activeTool === 'animate' && (
              <AnimateTool 
                triggerAnimate={triggerAnimate}
                onAnimateComplete={handleAnimateComplete}
              />
            )}
            {activeTool === 'vectorize' && (
              <VectorizeTool 
                triggerVectorize={triggerVectorize}
                onVectorizeComplete={handleVectorizeComplete}
              />
            )}
          </div>
          
        </div>

        {/* Right Settings Panel (Control Drawer) */}
        {activeTool !== 'canvas' && activeTool !== 'chat' && (
          <aside className="control-drawer-panel">
            <div className="settings-section">
              <div>
                <h4 className="control-section-title">Settings Panel</h4>
                <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.05)', marginTop: '8px' }} />
              </div>

              {/* Style selector */}
              {activeTool !== '3d' && (
                <div className="control-input-group">
                  <label className="control-label">Style Preset</label>
                  <select 
                    value={stylePreset}
                    onChange={(e) => setStylePreset(e.target.value)}
                    className="control-select"
                  >
                    <option value="Modern Villa">Modern Villa</option>
                    <option value="Brutalist Concrete">Brutalist Concrete</option>
                    <option value="Scandinavian Minimalist">Scandinavian Minimalist</option>
                    <option value="Industrial Warehouse">Industrial Warehouse</option>
                    <option value="Japanese Zen">Japanese Zen</option>
                  </select>
                </div>
              )}

              {/* Text prompt */}
              {['render', 'visualize', 'edit'].includes(activeTool) && (
                <div className="control-input-group">
                  <label className="control-label">Text Prompt</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    placeholder="Describe materials, lighting, context, foliage..."
                    className="control-textarea"
                  />
                </div>
              )}

              {/* Resolution options */}
              {['render', 'visualize', 'upscale', 'edit'].includes(activeTool) && (
                <div className="control-input-group">
                  <label className="control-label">Output Resolution</label>
                  <div className="resolution-btn-grid">
                    {['Standard', 'HD', '4K'].map((res) => (
                      <button
                        key={res}
                        onClick={() => setResolution(res)}
                        className={`resolution-btn-item ${resolution === res ? 'active' : ''}`}
                      >
                        {res}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips alert box */}
              <div style={{ 
                borderRadius: '8px', 
                backgroundColor: 'rgba(255,255,255,0.01)', 
                border: '1px solid rgba(255,255,255,0.05)', 
                padding: '14px', 
                display: 'flex', 
                gap: '10px' 
              }}>
                <HelpCircle className="w-4 h-4 text-white" style={{ width: '16px', height: '16px', flexShrink: '0', marginTop: '2px' }} />
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Generating high-fidelity visual renders will consume exactly 1 credit. Free users refill anytime.
                </p>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              className="control-btn-generate"
              style={{ marginTop: '20px' }}
            >
              {activeTool === 'render' && "Generate Render"}
              {activeTool === 'stage' && "Furnish Space"}
              {activeTool === '3d' && "Build 3D Model"}
              {activeTool === 'visualize' && "Generate Scene"}
              {activeTool === 'upscale' && "Run Upscale"}
              {activeTool === 'edit' && "Modify Design"}
              {activeTool === 'animate' && "Animate Output"}
              {activeTool === 'vectorize' && "Run Vectorize"}
            </button>
          </aside>
        )}

      </div>
    </div>
  )
}

export default Workspace
