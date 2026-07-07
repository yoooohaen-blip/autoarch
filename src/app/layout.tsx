import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'blmn.ai | Render Architecture with AI',
  description: 'Unlimited AI renderings with full creative control. Render, iterate, animate, and design photorealistic visuals for architects and real estate teams.',
  keywords: 'AI rendering, architecture, design, staging, floor plans, facade rendering',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
