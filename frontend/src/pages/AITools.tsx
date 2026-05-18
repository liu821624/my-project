import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Search, MessageSquare, BarChart2, ArrowRight, Star, TrendingUp, ShieldCheck, Globe, BookOpen, Loader2, Copy, Check, Sparkles, ChevronLeft } from 'lucide-react'

// 模拟工具数据
const toolsData = [
  { id: 'listing', name: 'Listing 智能优化', desc: '一键生成高转化标题与五点描述', category: 'listing', points: 50, icon: <MessageSquare className="w-6 h-6 text-orange-500" /> },
  { id: 'keywords', name: '竞品流量词挖掘', desc: '深度解析竞品 ASIN 核心流量来源', category: 'keywords', points: 80, icon: <Search className="w-6 h-6 text-blue-400" /> },
  { id: 'reviews', name: '评论情感分析', desc: '自动提取买家痛点与好评关键词', category: 'reviews', points: 60, icon: <BarChart2 className="w-6 h-6 text-green-400" /> },
  { id: 'ads', name: '广告文案生成器', desc: '针对 SP/SB 广告的创意文案产出', category: 'ads', points: 40, icon: <TrendingUp className="w-6 h-6 text-purple-400" /> },
  { id: 'translation', name: '多语言翻译助手', desc: '亚马逊本地化语境精准翻译', category: 'translation', points: 30, icon: <Globe className="w-6 h-6 text-yellow-400" /> },
  { id: 'compliance', name: '合规性风险检测', desc: '扫描 Listing 违禁词与侵权风险', category: 'compliance', points: 100, icon: <ShieldCheck className="w-6 h-6 text-red-400" /> },
]

const categories = [
  { id: 'all', name: '全部工具', icon: <Zap className="w-5 h-5" /> },
  { id: 'listing', name: 'Listing 优化', icon: <MessageSquare className="w-5 h-5" /> },
  { id: 'keywords', name: '关键词挖掘', icon: <Search className="w-5 h-5" /> },
  { id: 'reviews', name: '评论分析', icon: <BarChart2 className="w-5 h-5" /> },
  { id: 'ads', name: '广告投放', icon: <TrendingUp className="w-5 h-5" /> },
  { id: 'translation', name: '多语言翻译', icon: <Globe className="w-5 h-5" /> },
  { id: 'compliance', name: '合规检测', icon: <ShieldCheck className="w-5 h-5" /> },
]

export default function AITools() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null)
  
  // 工具内部状态
  const [inputStep, setInputStep] = useState(1)
  const [asin, setAsin] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const filteredTools = toolsData.filter(tool => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleToolClick = (id: string) => {
    if (id === 'listing') {
      navigate('/tools/listing-optimizer')
    } else if (id === 'keywords') {
      navigate('/tools/keyword-research')
    } else if (id === 'reviews') {
      navigate('/tools/review-analyzer')
    } else {
      setSelectedToolId(id)
      setInputStep(1)
      setResult(null)
      setAsin('')
    }
  }

  const handleGenerate = () => {
    if (!asin) return
    setIsGenerating(true)
    // 模拟 API 调用延迟
    setTimeout(() => {
      setResult(`【AI 优化建议】\n\n标题：${asin} 无线蓝牙耳机 - 2024 升级版降噪运动耳机，超长续航 40 小时，IPX7 防水...\n\n五点描述：\n1. 【沉浸式音质】采用最新蓝牙 5.3 芯片...\n2. 【舒适佩戴】人体工学耳翼设计...\n3. 【智能降噪】ENC 环境降噪技术...`)
      setIsGenerating(false)
    }, 2500)
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const selectedTool = toolsData.find(t => t.id === selectedToolId)

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 pl-64 pt-24 pr-8 pb-8">
      {!selectedTool ? (
        <>
          {/* 顶部标题与搜索区 */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Zap className="w-8 h-8 text-[#FF6B00]" />
                AI 运营工具箱
              </h1>
              <p className="text-slate-400 mt-2">高效赋能亚马逊运营，每一次调用都在创造价值</p>
            </div>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="搜索工具或指令..." 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#FF6B00] transition-all backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-8">
            {/* 左侧分类导航 */}
            <aside className="w-64 hidden md:block space-y-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeCategory === cat.id 
                      ? 'bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20' 
                      : 'hover:bg-slate-800/50 text-slate-400'
                  }`}
                >
                  {cat.icon}
                  <span className="font-medium">{cat.name}</span>
                </button>
              ))}
              
              <div className="mt-8 p-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 mb-2 text-[#FF6B00]">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-bold">会员权益</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">高级会员每月赠送 5000 积分</p>
                <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors">
                  查看权益详情
                </button>
              </div>
            </aside>

            {/* 右侧工具网格 */}
            <main className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map(tool => (
                  <div key={tool.id} onClick={() => handleToolClick(tool.id)} className="group relative bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 hover:border-[#FF6B00]/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700 group-hover:border-[#FF6B00]/30 transition-colors">
                        {tool.icon}
                      </div>
                      <span className="px-2 py-1 bg-slate-900/80 rounded-lg text-xs font-mono text-[#FF6B00] border border-[#FF6B00]/20">
                        ⚡ {tool.points} 积分
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FF6B00] transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                      {tool.desc}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-[10px] text-slate-300">
                            U{i}
                          </div>
                        ))}
                      </div>
                      <button className="text-sm font-medium text-[#FF6B00] hover:text-[#ff8533] transition-colors flex items-center gap-1">
                        立即使用 <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </>
      ) : (
        /* 具体工具操作界面 */
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={() => setSelectedToolId(null)}
            className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" /> 返回工具列表
          </button>

          <div className="glass-card p-8 rounded-2xl border border-slate-700/50">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-700/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FF6B00]/10 rounded-xl border border-[#FF6B00]/20">
                  {selectedTool?.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedTool?.name}</h2>
                  <p className="text-slate-400 text-sm mt-1">{selectedTool?.desc}</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-700">
                <span className="text-[#FF6B00] font-mono font-bold">⚡ {selectedTool?.points} 积分/次</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">请输入产品 ASIN 或原始文案</label>
                <textarea 
                  value={asin}
                  onChange={(e) => setAsin(e.target.value)}
                  className="w-full h-40 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00] transition-colors resize-none font-mono text-sm"
                  placeholder="例如：B08XYZ1234 或 粘贴你的产品原始标题..."
                />
              </div>

              <div className="flex justify-end gap-4">
                <button 
                  onClick={() => setSelectedToolId(null)}
                  className="px-6 py-2.5 text-slate-400 hover:text-white transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !asin}
                  className="px-8 py-2.5 bg-gradient-to-r from-[#FF6B00] to-red-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                  {isGenerating ? 'AI 正在深度思考...' : '开始生成'}
                </button>
              </div>

              {result && (
                <div className="mt-8 p-6 bg-slate-900/30 border border-slate-700/50 rounded-xl space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#FF6B00]" /> AI 优化结果
                    </h3>
                    <button onClick={handleCopy} className="text-xs flex items-center gap-1 text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800">
                      {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                      {copied ? '已复制到剪贴板' : '复制结果'}
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm text-slate-200 leading-relaxed font-sans bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                    {result}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
