'use client'
import { ThemeProvider } from '@/components/theme-provider'
import { SpeedInsights } from '@vercel/speed-insights/next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const PostHogPageView = dynamic(() => import('./PostHogPageView'))

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SpeedInsights />
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  )
}
