import { useState, useEffect } from 'react'
import { Play, Lock, CheckCircle, BookOpen, Clock, Award } from 'lucide-react'
import { LoadingSkeleton } from '../components/LoadingSkeleton'

// 模拟课程数据
const courseData = {
  title: '亚马逊运营从零到一实战课',
  progress: 35,
  chapters: [
    { id: 1, title: '第一章：亚马逊平台基础认知', duration: '45:00', isLocked: false, isCompleted: true },
    { id: 2, title: '第二章：选品逻辑与市场洞察', duration: '60:00', isLocked: false, isCompleted: false },
    { id: 3, title: '第三章：Listing 极致优化技巧', duration: '55:00', isLocked: false, isCompleted: false },
    { id: 4, title: '第四章：FBA 物流与库存管理', duration: '40:00', isLocked: true, isCompleted: false },
    { id: 5, title: '第五章：站内广告高阶打法', duration: '70:00', isLocked: true, isCompleted: false },
    { id: 6, title: '第六章：品牌建设与站外引流', duration: '50:00', isLocked: true, isCompleted: false },
  ]
}

export default function LearningCenter() {
  const [currentChapter, setCurrentChapter] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 模拟数据加载过程
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <LoadingSkeleton className="h-[400px]" />
        <div className="grid grid-cols-3 gap-6">
          <LoadingSkeleton className="h-32" />
          <LoadingSkeleton className="h-32" />
          <LoadingSkeleton className="h-32" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-8">
      <div className="max-w-7xl mx-auto">
        {/* 顶部课程信息 */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-[#FF6B00]" />
              {courseData.title}
            </h1>
            <p className="text-slate-400 mt-2">总进度: {courseData.progress}% · 已学 3/6 章</p>
          </div>
          <div className="px-4 py-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-xl text-[#FF6B00] font-medium flex items-center gap-2">
            <Award className="w-5 h-5" />
            高级会员权益中
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：视频播放区 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative group">
              {/* 模拟视频播放器 */}
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
                <div className="text-center">
                  <Play className="w-16 h-16 text-white opacity-80 group-hover:scale-110 transition-transform cursor-pointer" />
                  <p className="mt-4 text-slate-300">点击播放第 {currentChapter} 章</p>
                </div>
              </div>
              {/* 进度条 */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
                <div 
                  className="h-full bg-[#FF6B00] transition-all duration-500" 
                  style={{ width: `${(currentChapter / courseData.chapters.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* 课程简介 */}
            <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">本章重点</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                深入解析亚马逊 A9 算法核心逻辑，掌握关键词权重的分配机制。通过真实案例演示如何利用工具挖掘长尾词，并优化 Listing 的标题与五点描述以提升转化率。
              </p>
            </div>
          </div>

          {/* 右侧：章节列表 */}
          <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 h-fit">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#FF6B00]" />
              课程目录
            </h3>
            <div className="space-y-3">
              {courseData.chapters.map((chapter) => (
                <div 
                  key={chapter.id}
                  onClick={() => !chapter.isLocked && setCurrentChapter(chapter.id)}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all cursor-pointer ${
                    currentChapter === chapter.id 
                      ? 'bg-[#FF6B00]/10 border border-[#FF6B00]/30' 
                      : chapter.isLocked 
                        ? 'opacity-50 cursor-not-allowed hover:bg-slate-800/50'
                        : 'hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {chapter.isLocked ? (
                      <Lock className="w-5 h-5 text-slate-500" />
                    ) : chapter.isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <div className={`w-5 h-5 rounded-full border-2 ${currentChapter === chapter.id ? 'border-[#FF6B00]' : 'border-slate-500'}`} />
                    )}
                    <div>
                      <p className={`text-sm font-medium ${currentChapter === chapter.id ? 'text-[#FF6B00]' : 'text-slate-200'}`}>
                        {chapter.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{chapter.duration}</p>
                    </div>
                  </div>
                  {chapter.isLocked && (
                    <span className="text-[10px] px-2 py-1 bg-slate-700 rounded text-slate-400">会员专享</span>
                  )}
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 bg-gradient-to-r from-[#FF6B00] to-orange-600 rounded-xl text-white font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all">
              解锁全部高阶课程
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
