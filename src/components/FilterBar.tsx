import clsx from 'clsx';
import { FilterStatus } from '@/types';

type FilterBarProps = {
  filter: FilterStatus;
  onFilterChange: (f: FilterStatus) => void;
};

const OPTIONS: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterBar({ filter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex gap-1 bg-white rounded-xl shadow-sm p-1 mb-4">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onFilterChange(opt.value)}
          className={clsx(
            'flex-1 py-1.5 rounded-lg text-sm font-medium transition',
            filter === opt.value
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-500 hover:bg-indigo-50'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
