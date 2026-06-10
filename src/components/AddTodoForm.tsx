import { useState } from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';
import { Priority } from '@/types';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  { value: 'high', label: 'High', color: 'bg-rose-100 text-rose-700 border-rose-300' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    onAdd(text, priority);
    setText('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-4 mb-4 flex flex-col gap-3"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="Add a new task…"
          className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className={clsx(
            'flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition',
            text.trim()
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          )}
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* Priority selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400 font-medium">Priority:</span>
        {PRIORITIES.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPriority(p.value)}
            className={clsx(
              'px-3 py-1 rounded-full text-xs font-semibold border transition',
              p.color,
              priority === p.value ? 'ring-2 ring-offset-1 ring-indigo-400' : 'opacity-60 hover:opacity-100'
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
    </form>
  );
}
