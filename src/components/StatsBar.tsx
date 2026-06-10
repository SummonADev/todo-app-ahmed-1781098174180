import { CheckCircle2, Circle } from 'lucide-react';

type StatsBarProps = {
  activeCount: number;
  completedCount: number;
};

export default function StatsBar({ activeCount, completedCount }: StatsBarProps) {
  const total = activeCount + completedCount;
  const pct = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <Circle size={15} className="text-indigo-400" />
          <span>{activeCount} remaining</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <CheckCircle2 size={15} className="text-emerald-500" />
          <span>{completedCount} done</span>
        </div>
        <span className="text-sm font-bold text-indigo-600">{pct}%</span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
