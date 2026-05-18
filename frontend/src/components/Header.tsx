import { useState } from 'react'
import { Search, Bell, User, ChevronDown } from 'lucide-react'

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="h-20 glass-nav border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-50 backdrop-blur-xl bg-[#0f172a]/80">
      {/* 全局搜索区 */}
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="搜索课程、AI 工具或运营文档..." 
            className="w-full bg-slate-800/30 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-orange-500/50 focus:bg-slate-800/50 transition-all placeholder:text-slate-500 shadow-inner"
          />
        </div>
      </div>

      {/* 右侧功能区 */}
      <div className="flex items-center gap-6">
        {/* 消息通知 */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          
          {/* 模拟通知下拉框 */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 glass-card rounded-xl p-4 border border-white/10 shadow-2xl animate-fade-in-down">
              <h4 className="text-sm font-bold text-white mb-3 border-b border-white/10 pb-2">最新消息</h4>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-orange-500 shrink-0"></div>
                  <div>
                    <p className="text-xs text-white font-medium">积分充值成功</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">您的账户已到账 500 积分</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0"></div>
                  <div>
                    <p className="text-xs text-white font-medium">新课程上线</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">《亚马逊 PPC 高阶投放策略》已更新</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* 用户信息 */}
        <div className="flex items-center gap-3 pl-6 border-l border-white/10 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-white">刘高尚</p>
            <p className="text-xs text-orange-400 flex items-center justify-end gap-1">
              Advanced VIP <ChevronDown size={12} />
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-red-600 flex items-center justify-center border-2 border-white/20 shadow-lg shadow-orange-500/20">
            <User size={20} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  )
}
