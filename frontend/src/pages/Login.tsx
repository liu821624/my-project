import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Lock, Smartphone, QrCode } from 'lucide-react'
import { Toast } from '../components/Toast'

export default function Login() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setError('请输入有效的 11 位手机号码')
      return false
    }
    if (password.length < 6) {
      setError('密码长度不能少于 6 位')
      return false
    }
    setError('')
    return true
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    // 模拟登录请求
    setTimeout(() => {
      setIsLoading(false)
      setToast({ message: '登录成功！欢迎回来，刘高尚', type: 'success' })
      setTimeout(() => navigate('/'), 1500)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden">
      {/* 背景流光 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-orange-900/10 animate-pulse"></div>
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="glass-card p-8 w-full max-w-md z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">亚马逊运营 AI 助手</h1>
          <p className="text-slate-400 text-sm">请登录以访问您的仪表盘</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">手机号码</label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="请输入手机号"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">登录密码</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="请输入密码"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-xs mt-1">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2.5 rounded-lg shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '正在验证...' : '立即登录'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10">
          <button className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-colors">
            <QrCode className="w-5 h-5" />
            <span className="text-sm">使用钉钉扫码登录</span>
          </button>
        </div>
      </div>
    </div>
  )
}
