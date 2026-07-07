"use client"

import React, { useState, useRef, useEffect } from 'react'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
  isBlurryBefore?: boolean
  isVectorAfter?: boolean
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className = '',
  isBlurryBefore = false,
  isVectorAfter = false,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50) // percentage
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(position)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [isDragging])

  return (
    <div
      ref={containerRef}
      className={`slider-container relative border border-white/10 group shadow-2xl ${className}`}
      onMouseDown={(e) => {
        e.preventDefault()
        setIsDragging(true)
        handleMove(e.clientX)
      }}
      onTouchStart={(e) => {
        setIsDragging(true)
        handleMove(e.touches[0].clientX)
      }}
    >
      {/* Before Image */}
      <img
        src={beforeImage}
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        style={{ filter: isBlurryBefore ? 'blur(3.5px) contrast(90%)' : 'none' }}
      />
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-white/90 text-xs px-2.5 py-1 rounded-[4px] font-mono tracking-wider select-none">
        {beforeLabel}
      </div>

      {/* After Image */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img
          src={afterImage}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            width: containerRef.current?.getBoundingClientRect().width || '100%',
            filter: isVectorAfter ? 'invert(1) grayscale(100%) contrast(800%) brightness(1.2)' : 'none'
          }}
        />
      </div>
      <div className="absolute top-4 right-4 bg-accent/80 backdrop-blur-md border border-white/10 text-white text-xs px-2.5 py-1 rounded-[4px] font-mono tracking-wider select-none">
        {afterLabel}
      </div>

      {/* Slider Bar & Handle */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-black shadow-lg border border-neutral-300 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200">
          <svg
            className="w-4 h-4 text-neutral-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M8 9l-4 4 4 4m8 0l4-4-4-4"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default BeforeAfterSlider
