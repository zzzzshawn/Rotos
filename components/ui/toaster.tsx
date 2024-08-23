"use client"

import {
  Toast,
  ToastClose,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, icon, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="h-10">
            <div className="flex items-center gap-1">
              {icon && <>{icon}</>}
              {title && <ToastTitle>{title}</ToastTitle>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
