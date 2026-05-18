import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageSquare, PieChart, ArrowLeft, Loader2, Download, Zap, AlertCircle, CheckCircle, MinusCircle } from 'lucide-react'
import { Toast } from '../components/Toast'

export default function ReviewAnalyzer() {
  const navigate = useNavigate()
  const [asin, setAsin] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  const startAnalysis = () => {
    if (!asin) {
      setToastMessage('请输入产品 ASIN')
      setToastType('error')
      setShowToast(true)
      return
    }

    setIsGenerating(true)
    const steps = [
      '正在抓取亚马逊评论数据...',
      '正在进行 NLP 情感分析...',
      '正在提取高频痛点与好评词...',
      '正在生成可视化报告...'
    ]
    
    let stepIndex = 0
    setLoadingText(steps[0])
    
    const interval = setInterval(() => {
      stepIndex++
      if (stepIndex < steps.length) {
        setLoadingText(steps[stepIndex])
      } else {
        clearInterval(interval)
        finishAnalysis()
      }
    }, 1500)
  }

  const finishAnalysis = () => {
    setAnalysisResult({
      positive: 65,
      neutral: 20,
      negative: 15,
      keywords: [
        { word: '电池续航', count: 128, type: 'positive' },
        { word: '佩戴舒适', count: 95, type: 'positive' },
        { word: '连接不稳定', count: 42, type: 'negative' },
        { word: '音质清晰', count: 88, type: 'positive' },
        { word: '充电盒易刮花', count: 35, type: 'negative' }
      ],
      reviews: [
        { id: 1, rating: 5, text: "Sound quality is amazing for the price. Battery lasts all day.", date: "2 days ago" },
        { id: 2, rating: 2, text: "Keeps disconnecting from my phone when I'm at the gym.", date: "1 week ago" },
        { id: 3, rating: 4, text: "Good value, but the case feels a bit cheap.", date: "2 weeks ago" }
      ]
    })
    setIsGenerating(false)
    setToastMessage('评论分析完成！已消耗 60 积分')
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
        <button 
          onClick={() => navigate('/tools')}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> 返回工具箱
        </button>

        <div className="glass-card p-8 rounded-2xl border border-slate-700/50">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                <MessageSquare className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">评论情感分析</h2>
                <p className="text-slate-400 text-sm mt-1">自动提取买家痛点，洞察产品改进方向</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-700">
              <span className="text-green-400 font-mono font-bold">⚡ 60 积分/次</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">输入产品 ASIN</label>
              <input 
                type="text" 
                value={asin}
                onChange={(e) => setAsin(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors font-mono"
                placeholder="例如：B08XYZ1234"
              />
            </div>

            <div className="flex justify-end">
              <button 
                onClick={startAnalysis}
                disabled={isGenerating}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 min-w-[160px] justify-center"
              >
                {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />}
                {isGenerating ? loadingText : '开始分析'}
              </button>
            </div>

            {analysisResult && (
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* 左侧：情感分布 */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-slate-900/30 border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <PieChart className="w-5 h-5 text-green-400" /> 情感分布
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-green-400 flex items-center gap-1"><CheckCircle size={14}/> 正面评价</span>
                          <span className="text-white">{analysisResult.positive}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: `${analysisResult.positive}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-400 flex items-center gap-1"><MinusCircle size={14}/> 中性评价</span>
                          <span className="text-white">{analysisResult.neutral}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-500 rounded-full" style={{ width: `${analysisResult.neutral}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-red-400 flex items-center gap-1"><AlertCircle size={14}/> 负面评价</span>
                          <span className="text-white">{analysisResult.negative}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: `${analysisResult.negative}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/30 border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">高频关键词云</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.keywords.map((k: any, i: number) => (
                        <span 
                          key={i}
                          className={`px-3 py-1 rounded-full text-xs border ${
                            k.type === 'positive' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                            'bg-red-500/10 border-red-500/30 text-red-400'
                          }`}
                        >
                          {k.word} ({k.count})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 右侧：评论摘要 */}
                <div className="lg:col-span-2">
                  <div className="bg-slate-900/30 border border-slate-700/50 rounded-xl p-6 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">代表性评论摘要</h3>
                      <button className="text-xs flex items-center gap-1 text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors">
                        <Download size={14} /> 导出报告
                      </button>
                    </div>
                    <div className="space-y-4">
                      {analysisResult.reviews.map((review: any) => (
                        <div key={review.id} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-slate-600'}`} viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs text-slate-500">{review.date}</span>
                          </div>
                          <p className="text-sm text-slate-300 leading-relaxed">{review.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}