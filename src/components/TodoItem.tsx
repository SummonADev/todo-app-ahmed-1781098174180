import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const PRIORITY_STYLES: Record<string, string> = {
  low: 'border-l-4 border-emerald-400',
  medium: 'border-l-4 border-amber-400',
  high: 'border-l-4 border-rose-400',
};

const PRIORITY_BADGE: Record<string, string> = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-rose-100 text-rose-700',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function handleSave(): void {
    onEdit(todo.id, draft);
    setEditing(false);
  }

  function handleCancel(): void {
    setDraft(todo.text);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  return (
    <li
      className={clsx(
        'bg-white rounded-xl shadow-sm px-4 py-3 flex items-center gap-3 group transition hover:shadow-md',
        PRIORITY_STYLES[todo.priority]
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
        className={clsx(
          'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500 text-white'
            : 'border-slate-300 hover:border-indigo-400'
        )}
      >
        {todo.completed && <Check size={11} strokeWidth={3} />}
      </button>

      {/* Text / edit input */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full text-sm text-slate-800 border-b border-indigo-400 outline-none bg-transparent pb-0.5"
          />
        ) : (
          <span
            className={clsx(
              'text-sm block truncate',
              todo.completed ? 'line-through text-slate-400' : 'text-slate-800'
            )}
          >
            {todo.text}
          </span>
        )}
        <span
          className={clsx(
            'inline-block mt-0.5 px-1.5 py-0.5 rounded text-xs font-medium',
            PRIORITY_BADGE[todo.priority]
          )}
        >
          {todo.priority}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              aria-label="Save"
              className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition"
            >
              <Check size={15} />
            </button>
            <button
              onClick={handleCancel}
              aria-label="Cancel"
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              aria-label="Edit"
              className="p-1.5 rounded-lg text-indigo-400 hover:bg-indigo-50 transition"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              aria-label="Delete"
              className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50 transition"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
