import { Home, Zap, BookOpen, User, Settings, LogOut } from 'lucide-react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const menuItems = [
  { id: 'home', label: '首页仪表盘', icon: Home },
  { id: 'tools', label: 'AI 智能工具箱', icon: Zap },
  { id: 'learning', label: '运营学习中心', icon: BookOpen },
  { id: 'profile', label: '个人资产管理', icon: User },
]

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 glass-nav flex flex-col border-r border-white/10 bg-[#0f172a]/50 backdrop-blur-xl">
      {/* Logo 区域 */}
      <div className="p-6 flex items-center gap-3 border-b border-white/5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
          <Zap size={20} className="text-white" fill="currentColor" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-wide">亚马逊 AI Hub</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Operation Center</p>
        </div>
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                isActive 
                  ? 'bg-gradient-to-r from-orange-500/20 to-transparent text-orange-400 border-l-4 border-orange-500' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white border-l-4 border-transparent'
              }`}
            >
              {/* 选中态背景光效 */}
              {isActive && (
                <div className="absolute inset-0 bg-orange-500/5 blur-md"></div>
              )}
              
              <Icon size={20} className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="font-medium relative z-10">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* 底部功能区 */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
          <Settings size={20} />
          <span className="font-medium">系统偏好设置</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
          <LogOut size={20} />
          <span className="font-medium">退出登录</span>
        </button>
      </div>
    </aside>
  )
}
