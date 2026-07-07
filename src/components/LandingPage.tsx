"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Sparkles, 
  ChevronRight, 
  ChevronDown, 
  Menu,
  X,
  Upload,
  Cpu,
  Monitor,
  Compass,
  Layers,
  Home
} from 'lucide-react'
import BeforeAfterSlider from './BeforeAfterSlider'

const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'refine' | 'deliver'>('upload')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // FAQs data
  const faqs = [
    {
      q: "What is Auto Arch / blmn.ai?",
      a: "Auto Arch is a comprehensive tool suite that transforms architectural sketches, floor plans, elevation drawings, and facade plans into photorealistic 3D models and renderings within seconds to streamline your creative process from concept to visual output."
    },
    {
      q: "How does the workflow pricing operate?",
      a: "We offer a simple transparent workflow: pay a base project fee of Rs 25,000 to construct the base 3D model. This single model feeds both interior photorealistic rendering styles and 3-minute camera path animations, allowing for rapid iteration and final delivery."
    },
    {
      q: "Can I render freehand sketches?",
      a: "Yes. The Render tool fully supports freehand sketches. Simply upload the photo, select your style presets, and convert it instantly."
    },
    {
      q: "Can I modify parts of my render after generation?",
      a: "Absolutely. Use the Edit tool in the workspace. You can mask any region and write a text prompt to perform localized edits, swap out furniture, or populate the scene with realistic characters."
    },
    {
      q: "Does Auto Arch support virtual staging?",
      a: "Yes. Our Stage tool enables seamless virtual staging to furnish empty floor plans or room photos realistically in one click."
    },
    {
      q: "How does this benefit architects and real estate professionals?",
      a: "By turning quick sketches or floor plans into premium visuals almost instantly, it empowers architects to iterate layout directions and create stunning client presentations without spending days on heavy CGI rendering software."
    }
  ]

  // Feature grid data
  const tools = [
    {
      id: 'render',
      title: 'Render',
      desc: 'Upload sketches, elevations, or facade plans and get photorealistic renders in seconds.',
      icon: <Sparkles className="w-5 h-5 text-white" />
    },
    {
      id: 'visualize',
      title: 'Visualize from Text',
      desc: 'Explain your vision with a prompt and instantly receive a realistic architectural image.',
      icon: <Compass className="w-5 h-5 text-white" />
    },
    {
      id: 'stage',
      title: 'Virtual Stager',
      desc: 'Virtually furnish and stage your space in one click with Scandinavian, Modern, or Industrial themes.',
      icon: <Layers className="w-5 h-5 text-white" />
    },
    {
      id: 'upscale',
      title: 'AI Upscaler',
      desc: 'Enhance and upscale your renders with high-resolution textures and refined detail up to 4K.',
      icon: <Cpu className="w-5 h-5 text-white" />
    },
    {
      id: 'edit',
      title: 'AI Editor',
      desc: 'Modify your design easily by explaining desired changes or painting with the brush tool.',
      icon: <Layers className="w-5 h-5 text-white" />
    },
    {
      id: '3d',
      title: 'Image to 3D',
      desc: 'Turn a single floor plan photo into a textured 3D model you can interactively view and download.',
      icon: <Monitor className="w-5 h-5 text-white" />
    }
  ]

  return (
    <div className="grid-bg">
      {/* Navigation Header */}
      <header className="navbar">
        <Link href="/" className="nav-logo">
          <div className="logo-icon" />
          <span className="logo-text">Auto Arch</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-menu">
          <a href="#workflow" className="nav-link-item">How It Works</a>
          <a href="#features" className="nav-link-item">Features</a>
          <a href="#flowchart" className="nav-link-item">Workflow Pricing</a>
          <a href="#faq" className="nav-link-item">FAQs</a>
        </nav>

        <div className="nav-actions">
          <button className="lang-selector">
            <span>EN</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <Link href="/render" className="nav-link-item">Pricing</Link>
          <Link href="/render" className="btn-pill-border">
            Start Generating
          </Link>
          {/* GridSwitcher dots */}
          <div className="grid-menu-icon">
            <div className="grid-dot" />
            <div className="grid-dot" />
            <div className="grid-dot" />
            <div className="grid-dot" />
            <div className="grid-dot" />
            <div className="grid-dot" />
            <div className="grid-dot" />
            <div className="grid-dot" />
            <div className="grid-dot" />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-text-muted hover:text-white transition-colors ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#000',
          borderBottom: '1px solid var(--border)',
          padding: '20px',
          gap: '15px',
          zIndex: 99
        }} className="md:hidden">
          <a href="#workflow" onClick={() => setMobileMenuOpen(false)} className="nav-link-item">How It Works</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="nav-link-item">Features</a>
          <a href="#flowchart" onClick={() => setMobileMenuOpen(false)} className="nav-link-item">Workflow Pricing</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="nav-link-item">FAQs</a>
          <hr style={{ borderColor: 'var(--border)' }} />
          <Link href="/render" onClick={() => setMobileMenuOpen(false)} className="btn-pill-border text-center">
            Start Generating
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-sec">
        <h1 className="hero-title-text">
          Render Architecture in Seconds
        </h1>
        <p className="hero-subtitle-text">
          Unlimited AI renderings with full creative control. Turn sketches, plans, elevations, and 3D views into photorealistic renders. Built for architecture teams.
        </p>

        {/* Visualizer Preview Row (matches Screenshot 2 EXACTLY!) */}
        <div className="preview-container-row">
          
          {/* Left card: Input (white background 3D sketch) */}
          <div className="preview-item-card white-bg">
            <img 
              src="/og/landing_fallback.jpg" 
              alt="Input" 
              className="preview-img"
              style={{ filter: 'grayscale(100%) brightness(1.2)' }}
            />
            <div className="preview-label">Input</div>
          </div>

          {/* Connection pill */}
          <div className="connector-pill-badge">
            <span>render in golden hour light</span>
            <div className="connector-arrow-btn">
              <ChevronRight className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Right card: Result (photorealistic rendering output) */}
          <div className="preview-item-card">
            <img 
              src="/og/render_after.jpg" 
              alt="Result" 
              className="preview-img"
            />
            <div className="preview-label">Result</div>
          </div>

        </div>
      </section>

      {/* Section: Three steps how it works */}
      <section id="workflow" className="hero-sec" style={{ borderTop: '1px solid var(--border)', paddingTop: '80px' }}>
        <h2 className="sec-title" style={{ marginBottom: '10px' }}>From concept to delivery in three steps</h2>
        <p className="sec-subtitle" style={{ marginBottom: '50px' }}>Auto Arch connects seamlessly with your current design workflow, requiring no manual setups.</p>

        {/* Tabs navigation */}
        <div className="tabs-container">
          <div className="tabs-header-list">
            <button 
              onClick={() => setActiveTab('upload')}
              className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
            >
              1. Upload your design
            </button>
            <button 
              onClick={() => setActiveTab('refine')}
              className={`tab-btn ${activeTab === 'refine' ? 'active' : ''}`}
            >
              2. Render & Refine
            </button>
            <button 
              onClick={() => setActiveTab('deliver')}
              className={`tab-btn ${activeTab === 'deliver' ? 'active' : ''}`}
            >
              3. Deliver
            </button>
          </div>
        </div>

        {/* Tab contents */}
        <div className="tab-content-box">
          <div className="tab-left-content">
            {activeTab === 'upload' && (
              <>
                <span className="tab-step-tag">Step 01</span>
                <h3 className="tab-heading">Upload your files</h3>
                <p className="tab-body">
                  Drop in sketches, hand drawings, CAD exports, Revit elevations, or SketchUp viewports. Auto Arch works with whatever stage your project is at.
                </p>
                <div className="tab-pills-list">
                  <div className="tab-pill-item">✔ Sketches & hand drawings</div>
                  <div className="tab-pill-item">✔ CAD exports & elevations</div>
                  <div className="tab-pill-item">✔ Reference photos</div>
                </div>
              </>
            )}

            {activeTab === 'refine' && (
              <>
                <span className="tab-step-tag">Step 02</span>
                <h3 className="tab-heading">Render and refine with AI</h3>
                <p className="tab-body">
                  Generate photorealistic renders, then fine-tune materials, lighting, composition, and detail until every element matches your vision.
                </p>
                <div className="tab-pills-list">
                  <div className="tab-pill-item">✔ Localized edits</div>
                  <div className="tab-pill-item">✔ Full creative control</div>
                  <div className="tab-pill-item">✔ Preserve design intent</div>
                </div>
              </>
            )}

            {activeTab === 'deliver' && (
              <>
                <span className="tab-step-tag">Step 03</span>
                <h3 className="tab-heading">Deliver market-ready visuals</h3>
                <p className="tab-body">
                  Export polished imagery for client presentations, marketing materials, competitions, and approvals — all in minutes, not days.
                </p>
                <div className="tab-pills-list">
                  <div className="tab-pill-item">✔ Presentation-ready quality</div>
                  <div className="tab-pill-item">✔ Minutes, not days</div>
                  <div className="tab-pill-item">✔ Built for real-world delivery</div>
                </div>
              </>
            )}
            
            <div style={{ marginTop: '20px', textAlign: 'left' }}>
              <Link href="/render" className="btn-pill-border">
                Try this flow
              </Link>
            </div>
          </div>

          <div className="tab-right-preview">
            {activeTab === 'upload' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                <Upload className="w-10 h-10 text-[#444]" />
                <span className="tab-step-tag">DRAG & DROP DWG/JPG HERE</span>
              </div>
            )}

            {activeTab === 'refine' && (
              <BeforeAfterSlider 
                beforeImage="/og/pro.jpg"
                afterImage="/og/change_furniture_after.jpg"
                beforeLabel="Staged Setup"
                afterLabel="Re-staged details"
              />
            )}

            {activeTab === 'deliver' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', gap: '15px', padding: '40px', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                  ✔
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 500 }}>High Resolution Visual Exported</h4>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>4K rendering downloads completed successfully.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CUSTOM FLOWCHART SECTION (From User Screenshot) */}
      <section id="flowchart" className="flowchart-sec">
        <div className="sec-header">
          <h2 className="sec-title">Project Workflow Flowchart</h2>
          <p className="sec-subtitle">Our structural flow from floor plan upload to high-fidelity project delivery.</p>
        </div>

        {/* Dynamic Flowchart Render */}
        <div className="flowchart-container-box">
          
          {/* Step 1 */}
          <div className="flow-card grey-box">
            <h4 className="flow-card-title">Client uploads</h4>
            <p className="flow-card-desc">Floor plan image or PDF</p>
          </div>

          <div className="flow-arrow-down" />

          {/* Step 2 */}
          <div className="flow-card rust-box">
            <h4 className="flow-card-title">Pays base fee</h4>
            <p className="flow-card-desc mono">Rs 25,000 per project</p>
          </div>

          <div className="flow-arrow-down" />

          {/* Step 3 */}
          <div className="flow-card purple-box">
            <h4 className="flow-card-title">AI builds 3D model</h4>
            <p className="flow-card-desc">One model, built once</p>
          </div>

          {/* Connection text */}
          <div style={{ textAlign: 'center', margin: '15px 0' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.05em', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>same model feeds both outputs</p>
            <div className="flow-arrow-down" style={{ margin: '10px auto 0 auto' }} />
          </div>

          {/* Split Outputs (Step 4) */}
          <div className="flow-split-row">
            <div className="flow-card teal-box" style={{ maxWidth: '100%' }}>
              <h4 className="flow-card-title" style={{ fontSize: '12px' }}>Interior renders</h4>
              <p className="flow-card-desc" style={{ fontSize: '10px' }}>Still images, multiple styles</p>
            </div>
            <div className="flow-card teal-box" style={{ maxWidth: '100%' }}>
              <h4 className="flow-card-title" style={{ fontSize: '12px' }}>3 min flythrough</h4>
              <p className="flow-card-desc" style={{ fontSize: '10px' }}>Camera path render</p>
            </div>
          </div>

          {/* Merge lines */}
          <div className="flow-split-merge-lines">
            <div className="flow-line-left" />
            <div className="flow-line-right" />
          </div>
          <div className="flow-arrow-down" style={{ margin: '0 auto 10px auto' }} />

          {/* Step 5 */}
          <div className="flow-card blue-box" style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#000',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              padding: '2px 10px',
              fontSize: '9px',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              whiteSpace: 'nowrap'
            }}>
              App flow from floor plan upload to project delivery
            </div>
            <h4 className="flow-card-title" style={{ marginTop: '5px' }}>Client reviews</h4>
            <p className="flow-card-desc">Approve or request changes</p>
          </div>

          <div className="flow-arrow-down" />

          {/* Step 6 */}
          <div className="flow-card orange-box">
            <h4 className="flow-card-title">Optional top-ups</h4>
            <p className="flow-card-desc">Extra style, extra flythrough, rush</p>
          </div>

          {/* Revision connection text */}
          <div style={{ textAlign: 'center', margin: '15px 0' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.05em', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>2 revision rounds included</p>
            <div className="flow-arrow-down" style={{ margin: '10px auto 0 auto' }} />
          </div>

          {/* Step 7 */}
          <div className="flow-card green-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <h4 className="flow-card-title">Final delivery</h4>
            <p className="flow-card-desc">Renders, video, downloadable</p>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              ↓
            </div>
          </div>

        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="tools-sec">
        <div className="sec-header">
          <h2 className="sec-title">AI-powered visualization tools at your fingertips</h2>
          <p className="sec-subtitle">Switch between unified tool interfaces seamlessly to stage a room, vectorize sketches, upscale resolutions or animate outputs.</p>
        </div>

        <div className="tools-grid">
          {tools.map((t) => (
            <div key={t.id} className="tool-card">
              <div>
                <div className="tool-icon-box">
                  {t.icon}
                </div>
                <h3 className="tool-title">{t.title}</h3>
                <p className="tool-desc">{t.desc}</p>
              </div>
              <Link href={`/render?tool=${t.id}`} className="tool-action-btn">
                Try Tool <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-sec">
        <h2 className="sec-title" style={{ textAlign: 'center', marginBottom: '40px' }}>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                className="faq-question-btn"
                onClick={() => toggleFaq(i)}
              >
                <span>{faq.q}</span>
                <ChevronDown className="w-4 h-4 text-text-muted" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              
              {openFaq === i && (
                <div className="faq-answer-box">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-sec">
        <div className="footer-top">
          
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <div className="logo-icon" style={{ width: '16px', height: '16px' }} />
              <span className="logo-text" style={{ fontSize: '12px' }}>Auto Arch</span>
            </Link>
            <p className="footer-brand-desc">
              Next-generation AI engines for rapid architectural rendering, design iteration, and 3D textured mesh exports.
            </p>
          </div>

          <div>
            <h5 className="footer-col-title">Features</h5>
            <ul className="footer-links-list">
              <li><Link href="/render" className="footer-link">Sketch to Render</Link></li>
              <li><Link href="/render" className="footer-link">Staging AI</Link></li>
              <li><Link href="/render" className="footer-link">3D Generator</Link></li>
              <li><Link href="/render" className="footer-link">Detail Upscaler</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="footer-col-title">Solutions</h5>
            <ul className="footer-links-list">
              <li><a href="#flowchart" className="footer-link">Workflow Pricing</a></li>
              <li><Link href="/render" className="footer-link">Interactive Board</Link></li>
              <li><a href="#faq" className="footer-link">Client Reviews</a></li>
            </ul>
          </div>

          <div>
            <h5 className="footer-col-title">Company</h5>
            <ul className="footer-links-list">
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Terms of Service</a></li>
              <li><a href="#" className="footer-link">Legal Notice</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} AUTO ARCH VIRTUAL. All rights reserved.</p>
          <p>Providing visualization tools globally.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
