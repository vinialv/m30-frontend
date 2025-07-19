import { useTheme } from 'next-themes'
import { toast, ToastOptions } from 'react-toastify'

export function useToast() {
  const { resolvedTheme } = useTheme()

  const baseOptions: ToastOptions = {
    position: 'top-center',
    theme: resolvedTheme === 'dark' ? 'dark' : 'light',
    style: {
      fontFamily: 'Mukta, sans-serif',
      color: 'var(--color-foreground)',
      background: 'var(--secondary)',
      fontWeight: 300,
    },
  }

  const toastSuccess = (message: string, options?: ToastOptions) =>
    toast.success(message, { ...baseOptions, ...options })

  const toastError = (message: string, options?: ToastOptions) =>
    toast.error(message, { ...baseOptions, ...options })

  const toastInfo = (message: string, options?: ToastOptions) =>
    toast.info(message, { ...baseOptions, ...options })

  const toastWarning = (message: string, options?: ToastOptions) =>
    toast.warning(message, { ...baseOptions, ...options })

  const toastDefault = (message: string, options?: ToastOptions) =>
    toast(message, { ...baseOptions, ...options })

  return {
    toastSuccess,
    toastError,
    toastInfo,
    toastWarning,
    toastDefault,
  }
}
