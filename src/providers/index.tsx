'use client'

import { ThemeProvider } from './theme'
import { ToastContainer } from 'react-toastify'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastContainer />
      <ThemeProvider
        attribute='class'
        defaultTheme='light'
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  )
}
