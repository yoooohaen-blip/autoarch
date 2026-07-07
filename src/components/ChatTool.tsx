"use client"

import React, { useState } from 'react'
import { Send, Bot, User } from 'lucide-react'

interface Message {
  sender: 'bot' | 'user'
  text: string
  timestamp: string
}

const ChatTool: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Hello! I am your Auto Arch visual assistant. How can I help you design, render, or refine your architectural ideas today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')

    // Bot Response Logic
    setTimeout(() => {
      let botText = "I can help you build photorealistic outputs for that idea! Select the 'Render' tool in the left sidebar, upload a concept layout or sketch, and type in your prompt."
      
      const query = input.toLowerCase()
      if (query.includes('pricing') || query.includes('cost') || query.includes('fee')) {
        botText = "Auto Arch operates on a flat project workflow: Rs 25,000 builds your project's high-fidelity 3D model, which feeds both photorealistic interior stills and camera-path flythrough rendering options."
      } else if (query.includes('scandinavian') || query.includes('minimalist') || query.includes('brutalist') || query.includes('industrial')) {
        botText = "Those architectural style presets are fully supported! Go to the 'Render' or 'Stage' tool, click on the right settings drawer, select the style preset, and generate your render."
      } else if (query.includes('3d') || query.includes('model') || query.includes('three')) {
        botText = "Yes, you can generate 3D models from elevations or plans! Open the '3D' tool from the left sidebar and try uploading a sketch to see the interactive 3D mesh rendering."
      }

      const botMessage: Message = {
        sender: 'bot',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  return (
    <div className="chat-container-panel" style={{ minHeight: '420px', backgroundColor: '#060708' }}>
      
      {/* Header */}
      <div style={{ 
        backgroundColor: '#0b0c0e', 
        padding: '16px 24px', 
        borderBottom: '1px solid var(--border)', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          backgroundColor: 'rgba(255,255,255,0.05)', 
          border: '1px solid var(--border)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <Bot className="w-4 h-4 text-white" style={{ width: '16px', height: '16px' }} />
        </div>
        <div>
          <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Auto Arch Assistant</h4>
          <p style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Assistant</p>
        </div>
      </div>

      {/* Messages area */}
      <div style={{ 
        flex: 1, 
        padding: '24px', 
        overflowY: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px',
        maxHeight: '340px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {messages.map((msg, i) => (
          <div 
            key={i} 
            style={{ 
              display: 'flex', 
              gap: '12px', 
              maxWidth: '85%', 
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
            }}
          >
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flexShrink: 0,
              border: '1px solid var(--border)',
              backgroundColor: msg.sender === 'bot' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.1)'
            }}>
              {msg.sender === 'bot' ? <Bot style={{ width: '16px', height: '16px' }} /> : <User style={{ width: '16px', height: '16px' }} />}
            </div>
            <div>
              <div style={{ 
                borderRadius: '12px', 
                padding: '12px 16px', 
                fontSize: '13px', 
                lineHeight: '1.5',
                border: '1px solid var(--border)',
                backgroundColor: msg.sender === 'bot' ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.05)',
                color: '#fff'
              }}>
                {msg.text}
              </div>
              <span style={{ fontSize: '9px', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', marginTop: '4px', display: 'block', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <form 
        onSubmit={handleSend} 
        style={{ 
          backgroundColor: '#0b0c0e', 
          padding: '16px', 
          borderTop: '1px solid var(--border)', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about styles, pricing, or console features..."
          style={{ 
            flex: 1, 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            border: '1px solid var(--border)', 
            borderRadius: '8px', 
            padding: '10px 16px', 
            fontSize: '13px', 
            color: '#fff',
            outline: 'none'
          }}
        />
        <button 
          type="submit" 
          style={{ 
            width: '38px', 
            height: '38px', 
            borderRadius: '8px', 
            backgroundColor: '#ffffff', 
            border: 'none', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            cursor: 'pointer' 
          }}
        >
          <Send style={{ width: '16px', height: '16px', color: '#000' }} />
        </button>
      </form>
    </div>
  )
}

export default ChatTool
