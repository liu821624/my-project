import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* 1. 顶部欢迎语与搜索 */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            欢迎回来，刘高尚 👋
          </h1>
          <p className="text-gray-400">今天是你加入亚马逊运营平台的第 15 天，继续保持！</p>
        </div>
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="搜索课程、工具、知识点..." 
            className="w-full glass-panel rounded-xl py-3 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-all"
          />
        </div>
      </div>

      {/* 2. 核心仪表盘区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：学习进度 */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B00]/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold text-white">学习进度概览</h2>
            <button className="text-xs text-[#FF6B00] hover:underline">查看完整报表</button>
          </div>
          
          <div className="flex items-center gap-10">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-700/30" />
                <circle cx="80" cy="80" r="70" stroke="#FF6B00" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset="110" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">75%</span>
                <span className="text-xs text-gray-400 mt-1">总进度</span>
              </div>
            </div>
            <div className="space-y-6 flex-1">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">已完成课程</span>
                  <span className="text-white font-bold">12 / 16</span>
                </div>
                <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF6B00] w-3/4 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">本周学习时长</span>
                  <span className="text-white font-bold">8.5 小时</span>
                </div>
                <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-1/2 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：快速入口 */}
        <div className="glass-panel rounded-3xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6">AI 工具箱</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Listing 优化', icon: '🚀' },
              { name: '关键词挖掘', icon: '🔍' },
              { name: '竞品分析', icon: '📊' },
              { name: '利润计算', icon: '💰' }
            ].map((tool) => (
              <button key={tool.name} className="glass-panel hover:bg-white/10 transition-all p-4 rounded-2xl flex flex-col items-center justify-center gap-2 group">
                <span className="text-2xl group-hover:scale-110 transition-transform">{tool.icon}</span>
                <span className="text-xs text-gray-300 font-medium">{tool.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. 底部：最近学习与推荐 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel rounded-3xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">最近学习</h2>
            <a href="#" className="text-xs text-gray-400 hover:text-[#FF6B00]">查看全部</a>
          </div>
          <div className="space-y-4">
            {[
              { title: '亚马逊运营从入门到精通', progress: '68%', time: '2 小时前' },
              { title: 'Listing 优化实战指南', progress: '45%', time: '昨天' }
            ].map((course, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF6B00] to-orange-600 flex items-center justify-center text-white font-bold shadow-lg">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium group-hover:text-[#FF6B00] transition-colors">{course.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">最后学习：{course.time}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-[#FF6B00]">{course.progress}</span>
                  <p className="text-xs text-gray-500">已完成</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6">为你推荐</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-white/10 hover:border-[#FF6B00]/50 transition-all cursor-pointer">
              <h3 className="text-white font-medium mb-2">高阶 PPC 广告投放策略</h3>
              <p className="text-xs text-gray-400 mb-4">掌握自动广告与手动广告的精细化运营技巧。</p>
              <button className="px-4 py-2 rounded-lg bg-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold hover:bg-[#FF6B00] hover:text-white transition-all">
                开始学习
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
