import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, TrendingUp, ArrowLeft, Loader2, Download, Filter, ChevronDown, Zap } from 'lucide-react'
import { Toast } from '../components/Toast'

export default function KeywordResearch() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  // 模拟加载状态轮播
  const startGeneration = () => {
    if (!keyword) {
      setToastMessage('请输入核心关键词或 ASIN')
      setToastType('error')
      setShowToast(true)
      return
    }

    setIsGenerating(true)
    const steps = [
      '正在连接亚马逊数据接口...',
      '正在抓取前台搜索联想词...',
      '正在计算竞争度与蓝海指数...',
      '正在生成最终报告...'
    ]
    
    let stepIndex = 0
    setLoadingText(steps[0])
    
    const interval = setInterval(() => {
      stepIndex++
      if (stepIndex < steps.length) {
        setLoadingText(steps[stepIndex])
      } else {
        clearInterval(interval)
        finishGeneration()
      }
    }, 1200)
  }

  const finishGeneration = () => {
    // 模拟生成数据
    const mockData = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      keyword: `${keyword} ${['for home', 'outdoor', 'gift', 'professional', '2024'][i % 5]}`,
      searchVolume: Math.floor(Math.random() * 50000) + 1000,
      competition: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
      cpc: (Math.random() * 2 + 0.5).toFixed(2),
      relevance: Math.floor(Math.random() * 30) + 70
    }))
    setResults(mockData)
    setIsGenerating(false)
    setToastMessage('关键词挖掘成功！已消耗 30 积分')
    setToastType('success')
    setShowToast(true)
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-8">
      {showToast && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
          onClose={() => setShowToast(false)} 
        />
      )}

      <div className="max-w-6xl mx-auto">
        {/* 顶部导航 */}
        <button 
          onClick={() => navigate('/tools')}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> 返回工具箱
        </button>

        <div className="glass-card p-8 rounded-2xl border border-slate-700/50">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <Search className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">竞品流量词挖掘</h2>
                <p className="text-slate-400 text-sm mt-1">深度解析核心关键词背后的流量机会</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-700">
              <span className="text-blue-400 font-mono font-bold">⚡ 30 积分/次</span>
            </div>
          </div>

          {/* 输入区 */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">核心关键词 / 竞品 ASIN</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-4 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="例如：wireless headphones 或 B08XYZ..."
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={startGeneration}
                disabled={isGenerating}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 min-w-[160px] justify-center"
              >
                {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />}
                {isGenerating ? loadingText : '开始挖掘'}
              </button>
            </div>

            {/* 结果展示区 */}
            {results.length > 0 && (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-400" /> 挖掘结果
                  </h3>
                  <button className="text-sm flex items-center gap-1 text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                    <Download size={14} /> 导出 Excel
                  </button>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900/30">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-800/50 text-slate-300">
                      <tr>
                        <th className="px-6 py-4 font-medium">关键词</th>
                        <th className="px-6 py-4 font-medium">月搜索量</th>
                        <th className="px-6 py-4 font-medium">竞争程度</th>
                        <th className="px-6 py-4 font-medium">建议 CPC ($)</th>
                        <th className="px-6 py-4 font-medium">相关性</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {results.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 text-white font-medium">{item.keyword}</td>
                          <td className="px-6 py-4 text-slate-300">{item.searchVolume.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              item.competition === 'Low' ? 'bg-green-500/20 text-green-400' :
                              item.competition === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {item.competition}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-300">${item.cpc}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 rounded-full" 
                                  style={{ width: `${item.relevance}%` }}
                                />
                              </div>
                              <span className="text-xs text-slate-400">{item.relevance}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}