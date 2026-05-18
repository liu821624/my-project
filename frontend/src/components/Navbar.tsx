import { Link, useLocation } from 'react-router-dom'
import { Home, Zap, BookOpen, User, LogOut } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: <Home size={20} />, label: '仪表盘' },
    { path: '/tools', icon: <Zap size={20} />, label: 'AI 工具箱' },
    { path: '/learning', icon: <BookOpen size={20} />, label: '学习中心' },
    { path: '/profile', icon: <User size={20} />, label: '个人中心' },
  ]

  return (
    <aside className="glass-nav">
      <div className="nav-header">
        <div className="logo-icon">🚀</div>
        <h1 className="logo-text">Amazon Hub</h1>
      </div>
      
      <nav className="nav-links">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {isActive && <div className="active-indicator" />}
            </Link>
          )
        })}
      </nav>

      <div className="nav-footer">
        <button className="logout-btn glass-card">
          <LogOut size={18} />
          <span>退出登录</span>
        </button>
      </div>
    </aside>
  )
}

export default Navbar
