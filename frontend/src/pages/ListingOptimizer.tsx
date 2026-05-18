import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Copy, Check, Zap, Sparkles, Loader2 } from 'lucide-react'

export default function ListingOptimizer() {
  const navigate = useNavigate()
  const [asin, setAsin] = useState('')
  const [originalTitle, setOriginalTitle] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [loadingText, setLoadingText] = useState('准备生成...')
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // 模拟 AI 生成的加载状态轮播
  useEffect(() => {
    if (isGenerating) {
      const stages = [
        '正在连接亚马逊数据库...',
        '正在分析核心关键词...',
        '正在优化标题结构...',
        '正在润色卖点描述...',
        '最终校验中...'
      ]
      let index = 0
      const interval = setInterval(() => {
        setLoadingText(stages[index % stages.length])
        index++
      }, 800)
      return () => clearInterval(interval)
    }
  }, [isGenerating])

  const handleGenerate = () => {
    if (!asin || !originalTitle) {
      alert('请至少填写 ASIN 和原始标题')
      return
    }
    setIsGenerating(true)
    setResult(null)
    
    // 模拟 4 秒的 AI 处理过程
    setTimeout(() => {
      setIsGenerating(false)
      setResult(`【优化后的标题】\n${originalTitle} - 升级版 | 2026最新款 | 适用于亚马逊运营的高效工具\n\n【优化后的卖点】\n1. 🚀 **智能算法驱动**：基于大数据分析，精准匹配用户搜索习惯。\n2. 💎 **玻璃拟态设计**：符合现代审美，提升品牌专业度。\n3. ⚡ **极速响应**：毫秒级数据处理，告别等待焦虑。`)
    }, 4000)
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 pl-64 pt-24 pr-8 pb-8 relative z-0">
      {/* 顶部导航 */}
      <div className="flex items-center mb-8">
        <button onClick={() => navigate('/tools')} className="p-2 hover:bg-white/5 rounded-full transition-colors mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#FF6B00]" />
          Listing 智能优化器
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-180px)]">
        {/* 左侧：输入区 */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 overflow-y-auto">
          <h2 className="text-lg font-semibold text-white mb-2">原始信息录入</h2>
          
          <div>
            <label className="block text-sm text-slate-400 mb-1">产品 ASIN</label>
            <input 
              type="text" 
              value={asin}
              onChange={(e) => setAsin(e.target.value)}
              placeholder="例如：B08XYZ1234"
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 focus:border-[#FF6B00] focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">原始标题</label>
            <textarea 
              value={originalTitle}
              onChange={(e) => setOriginalTitle(e.target.value)}
              rows={3}
              placeholder="粘贴您当前的商品标题..."
              className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-3 focus:border-[#FF6B00] focus:outline-none transition-all resize-none"
            />
          </div>

          <div className="mt-auto pt-4">
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                isGenerating 
                  ? 'bg-slate-700 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#FF6B00] to-orange-600 hover:shadow-lg hover:shadow-orange-500/20'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {loadingText}
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  开始智能优化 (消耗 50 积分)
                </>
              )}
            </button>
          </div>
        </div>

        {/* 右侧：结果区 */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">AI 优化结果</h2>
            {result && (
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1 text-sm text-[#FF6B00] hover:text-orange-400 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? '已复制' : '一键复制'}
              </button>
            )}
          </div>

          <div className="flex-1 bg-slate-900/50 rounded-xl p-4 border border-white/5 overflow-y-auto font-mono text-sm leading-relaxed whitespace-pre-wrap">
            {result ? (
              <div className="animate-in fade-in duration-500">{result}</div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-3">
                <Sparkles className="w-12 h-12 opacity-20" />
                <p>在左侧输入信息并点击生成<br/>AI 将为您打造高转化率 Listing</p>
              </div>
            )}
          </div>

          {result && (
            <div className="mt-4 flex gap-3">
              <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors text-sm font-medium">
                重新生成
              </button>
              <button className="flex-1 py-3 bg-[#FF6B00]/20 hover:bg-[#FF6B00]/30 border border-[#FF6B00]/50 text-[#FF6B00] rounded-xl transition-colors text-sm font-medium">
                采纳并保存
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
