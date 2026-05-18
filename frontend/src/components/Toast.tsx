import { useEffect, useState } from 'react'
import { CheckCircle, AlertCircle, X } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'warning'
  onClose: () => void
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300) // 等待动画结束再卸载
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColors = {
    success: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200',
    error: 'bg-red-500/20 border-red-500/50 text-red-200',
    warning: 'bg-orange-500/20 border-orange-500/50 text-orange-200',
  }

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
    warning: <AlertCircle className="w-5 h-5 text-orange-400" />,
  }

  return (
    <div
      className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-lg transition-all duration-300 ${
        bgColors[type]
      } ${visible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
    >
      {icons[type]}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={() => setVisible(false)} className="ml-2 hover:opacity-70">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
