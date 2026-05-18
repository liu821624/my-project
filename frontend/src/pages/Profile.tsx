import { User, Wallet, CreditCard, History, ArrowUpRight, ArrowDownLeft, ShieldCheck } from 'lucide-react'

// 模拟用户数据
const userData = {
  name: '刘高尚',
  level: '高级会员 (Advanced VIP)',
  balance: 2850,
  points: 12400,
  transactions: [
    { id: 1, type: 'recharge', desc: '积分充值 - 尊享套餐', amount: '+5000', date: '2026-05-17 14:30', status: 'success' },
    { id: 2, type: 'consume', desc: 'AI 工具调用 - Listing 优化', amount: '-50', date: '2026-05-17 15:12', status: 'success' },
    { id: 3, type: 'consume', desc: '课程解锁 - 第五章高阶打法', amount: '-200', date: '2026-05-16 09:45', status: 'success' },
    { id: 4, type: 'recharge', desc: '积分充值 - 基础套餐', amount: '+1000', date: '2026-05-15 10:20', status: 'success' },
  ]
}

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* 顶部个人信息卡片 */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-8 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-slate-700 border-4 border-[#FF6B00]/30 flex items-center justify-center text-3xl font-bold text-white">
              {userData.name[0]}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="px-3 py-1 bg-[#FF6B00]/20 text-[#FF6B00] rounded-lg text-sm font-medium border border-[#FF6B00]/30 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  {userData.level}
                </span>
                <span className="text-slate-400 text-sm">ID: 8829103</span>
              </div>
            </div>
          </div>
          <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors font-medium">
            编辑资料
          </button>
        </div>

        {/* 资产统计网格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2 text-slate-400">
              <Wallet className="w-5 h-5" />
              <span className="text-sm">当前余额</span>
            </div>
            <p className="text-3xl font-bold text-white">¥ {userData.balance.toFixed(2)}</p>
            <button className="mt-4 w-full py-2 bg-[#FF6B00] hover:bg-orange-600 rounded-lg text-white text-sm font-bold transition-colors">
              立即充值
            </button>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2 text-slate-400">
              <CreditCard className="w-5 h-5" />
              <span className="text-sm">可用积分</span>
            </div>
            <p className="text-3xl font-bold text-[#FF6B00]">{userData.points.toLocaleString()}</p>
            <p className="mt-4 text-xs text-slate-500">积分可用于解锁课程或调用 AI 工具</p>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2 text-slate-400">
              <History className="w-5 h-5" />
              <span className="text-sm">本月消耗</span>
            </div>
            <p className="text-3xl font-bold text-white">¥ 450.00</p>
            <p className="mt-4 text-xs text-slate-500">较上月增长 12% · 累计调用 28 次</p>
          </div>
        </div>

        {/* 交易流水记录 */}
        <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <History className="w-5 h-5 text-[#FF6B00]" />
            近期交易记录
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-700/50 text-slate-400 text-sm">
                  <th className="pb-4 font-medium">交易描述</th>
                  <th className="pb-4 font-medium">时间</th>
                  <th className="pb-4 font-medium">状态</th>
                  <th className="pb-4 font-medium text-right">金额/积分</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {userData.transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-slate-700/30 last:border-0 hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 text-slate-200">{tx.desc}</td>
                    <td className="py-4 text-slate-500">{tx.date}</td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-xs border border-green-500/20">
                        成功
                      </span>
                    </td>
                    <td className={`py-4 text-right font-mono font-bold ${tx.type === 'recharge' ? 'text-green-400' : 'text-slate-200'}`}>
                      {tx.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
