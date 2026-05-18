export const LoadingSkeleton = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`animate-pulse rounded-xl bg-slate-700/30 border border-white/5 ${className}`}>
      <div className="p-6 space-y-4">
        <div className="h-4 bg-slate-600/50 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-slate-600/30 rounded"></div>
          <div className="h-3 bg-slate-600/30 rounded w-5/6"></div>
        </div>
        <div className="h-10 bg-slate-600/40 rounded-lg mt-4"></div>
      </div>
    </div>
  )
}
