import { useTodos } from '@/hooks/useTodos';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import FilterBar from '@/components/FilterBar';
import StatsBar from '@/components/StatsBar';

export default function TodoPage() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-600 tracking-tight">
            ✅ My Todos
          </h1>
          <p className="text-slate-500 mt-1 text-sm">Stay organised, get things done.</p>
        </div>

        {/* Add form */}
        <AddTodoForm onAdd={addTodo} />

        {/* Stats */}
        <StatsBar activeCount={activeCount} completedCount={completedCount} />

        {/* Filter bar */}
        <FilterBar filter={filter} onFilterChange={setFilter} />

        {/* List */}
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {/* Clear completed */}
        {completedCount > 0 && (
          <div className="mt-4 text-center">
            <button
              onClick={clearCompleted}
              className="text-sm text-rose-500 hover:text-rose-700 underline underline-offset-2 transition-colors"
            >
              Clear {completedCount} completed {completedCount === 1 ? 'task' : 'tasks'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
