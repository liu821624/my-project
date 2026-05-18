import { useNavigate } from 'react-router-dom'
import { Play, Zap, Search, BookOpen, ArrowRight } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0f172a] pl-64 pt-24 pr-8 pb-8 space-y-8 relative z-0">
      {/* 欢迎横幅 */}
      <div className="glass-card p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group min-h-[220px] shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10 flex-1">
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">早上好，刘高尚 👋</h1>
          <p className="text-slate-400 mb-8 text-lg leading-relaxed">今日已完成 30% 的学习目标，距离亚马逊运营专家又近了一步！</p>
          <button 
            onClick={() => navigate('/learning')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_35px_rgba(255,107,0,0.6)] flex items-center gap-3 transform hover:-translate-y-0.5"
          >
            <Play size={20} fill="currentColor" />
            继续学习
          </button>
        </div>
        <div className="relative z-10 w-48 h-48 flex items-center justify-center flex-shrink-0">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(255,107,0,0.3)]" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1e293b" strokeWidth="2.5" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#FF6B00" strokeWidth="2.5" strokeDasharray="30, 100" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold text-white">30%</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">今日进度</span>
            </div>
          </div>
        </div>
      </div>

      {/* 快速入口 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: '继续学习', icon: Play, color: 'from-blue-500 to-cyan-500', desc: '亚马逊基础运营', path: '/learning' },
          { title: 'Listing 优化', icon: Zap, color: 'from-orange-500 to-red-500', desc: 'AI 智能改写', path: '/tools/listing-optimizer' },
          { title: '关键词研究', icon: Search, color: 'from-purple-500 to-pink-500', desc: '挖掘蓝海词汇', path: '/tools/keyword-research' },
          { title: '学习记录', icon: BookOpen, color: 'from-emerald-500 to-teal-500', desc: '查看历史课程', path: '/profile' },
        ].map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => navigate(item.path)}
            className="glass-card p-6 rounded-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group flex flex-col h-full border border-white/5 hover:border-orange-500/30 hover:shadow-[0_10px_30px_-10px_rgba(255,107,0,0.2)]"
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform flex-shrink-0 ring-2 ring-white/10`}>
              <item.icon className="text-white" size={26} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-slate-400 mb-6 flex-grow leading-relaxed">{item.desc}</p>
            <div className="flex items-center text-orange-400 text-sm font-medium group-hover:gap-3 transition-all mt-auto group-hover:text-orange-300">
              立即进入 <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* 最近学习 */}
      <div className="glass-card p-8 rounded-2xl border border-white/5">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">最近学习</h2>
          <button className="text-sm text-slate-400 hover:text-orange-400 transition-colors">查看全部</button>
        </div>
        <div className="space-y-5">
          {[
            { title: '亚马逊选品逻辑与数据分析', progress: 75, time: '2小时前' },
            { title: 'Listing 黄金标题撰写技巧', progress: 40, time: '昨天' },
            { title: 'PPC 广告高阶投放策略', progress: 10, time: '3天前' },
          ].map((course, idx) => (
            <div key={idx} className="flex items-center gap-6 p-5 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-white/10 group">
              <div className="w-20 h-20 rounded-xl bg-slate-800 flex-shrink-0 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                <Play size={28} className="text-orange-500/80 group-hover:text-orange-400 transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-lg truncate group-hover:text-orange-100 transition-colors">{course.title}</h4>
                <p className="text-xs text-slate-400 mt-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  上次观看：{course.time}
                </p>
                <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full transition-all duration-1000 ease-out" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
              <span className="text-lg text-orange-400 font-bold">{course.progress}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}