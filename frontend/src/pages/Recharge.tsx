import { useState } from 'react';
import { Zap, Check, CreditCard, Smartphone } from 'lucide-react';

const packages = [
  { id: 1, points: 500, price: 49, bonus: 0, isPopular: false },
  { id: 2, points: 1200, price: 99, bonus: 200, isPopular: true },
  { id: 3, points: 3000, price: 199, bonus: 800, isPopular: false },
  { id: 4, points: 10000, price: 599, bonus: 4000, isPopular: false },
];

export default function Recharge() {
  const [selectedId, setSelectedId] = useState(2);
  const [isPaying, setIsPaying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePay = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">积分充值中心</h2>
        <p className="text-slate-400 mt-1">充值积分可用于 AI 工具调用及高阶课程解锁</p>
      </div>

      {/* 套餐选择网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {packages.map((pkg) => (
          <div 
            key={pkg.id}
            onClick={() => setSelectedId(pkg.id)}
            className={`glass-card p-6 rounded-2xl cursor-pointer transition-all duration-300 border relative overflow-hidden ${
              selectedId === pkg.id 
                ? 'border-orange-500 shadow-[0_0_20px_rgba(255,107,0,0.15)] scale-105' 
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            {pkg.isPopular && (
              <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                热门推荐
              </div>
            )}
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1">{pkg.points}</div>
              <div className="text-sm text-orange-400 font-medium mb-4">积分</div>
              
              {pkg.bonus > 0 && (
                <div className="bg-green-500/10 text-green-400 text-xs py-1 px-2 rounded-full inline-block mb-4">
                  赠送 {pkg.bonus} 积分
                </div>
              )}
              
              <div className="text-2xl font-bold text-slate-200">¥{pkg.price}</div>
            </div>
            
            {selectedId === pkg.id && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 支付方式与结算 */}
      <div className="glass-card p-8 rounded-2xl border border-white/10 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
          <span className="text-slate-300">当前选择</span>
          <span className="text-xl font-bold text-white">
            ¥{packages.find(p => p.id === selectedId)?.price} 
            <span className="text-sm text-slate-400 ml-2 font-normal">
              ({packages.find(p => p.id === selectedId)?.points + (packages.find(p => p.id === selectedId)?.bonus || 0)} 积分)
            </span>
          </span>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-white/5 cursor-pointer hover:bg-slate-800/50 transition-colors">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
              <CreditCard size={20} />
            </div>
            <div className="flex-1">
              <div className="text-white font-medium">支付宝 / 微信支付</div>
              <div className="text-xs text-slate-500">支持个人与企业付款</div>
            </div>
            <div className="w-5 h-5 rounded-full border-2 border-orange-500 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <button 
          onClick={handlePay}
          disabled={isPaying}
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 disabled:opacity-70 flex items-center justify-center"
        >
          {isPaying ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
          ) : (
            '立即充值'
          )}
        </button>
      </div>

      {/* 支付成功弹窗 */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glass-card p-8 rounded-3xl text-center animate-in fade-in zoom-in duration-300 border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
            <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Check size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">充值成功！</h3>
            <p className="text-slate-300">积分已实时到账，祝您运营顺利</p>
          </div>
        </div>
      )}
    </div>
  );
}