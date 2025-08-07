import React, { useState } from 'react';
import { RetroWindow } from './RetroWindow';

interface TodoWindowProps {
  onClose?: () => void;
}

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export const TodoWindow: React.FC<TodoWindowProps> = ({ onClose }) => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: 'Finish portfolio website', completed: true, priority: 'high' },
    { id: 2, text: 'Call Subhash', completed: true, priority: 'medium' },
    { id: 3, text: 'Cry a little', completed: true, priority: 'low' },
    { id: 4, text: 'Sleep', completed: false, priority: 'high' },
    { id: 5, text: 'Fix code', completed: false, priority: 'medium' },
    { id: 6, text: 'Debug life', completed: false, priority: 'low' },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = () => {
    if (newTodo.trim()) {
      const newItem: TodoItem = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        priority: 'medium'
      };
      setTodos(prev => [...prev, newItem]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔥';
      case 'medium': return '⚡';
      case 'low': return '🌱';
      default: return '📝';
    }
  };

  return (
    <RetroWindow
      title="TODO.exe"
      onClose={onClose}
      initialSize={{ width: 400, height: 450 }}
    >
      <div className="h-full max-h-full overflow-auto p-2 break-words w-full max-w-[95vw] mx-auto pb-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-retro-green">📝 Daily Tasks</h2>
            <div className="text-sm text-muted-foreground">
              {todos.filter(t => t.completed).length}/{todos.length} completed
            </div>
          </div>

          {/* Add new todo */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add new task..."
              className="flex-1 retro-button bg-muted text-foreground px-3 py-2 rounded border border-border"
            />
            <button
              onClick={addTodo}
              className="retro-button bg-green-900 hover:bg-green-800 text-green-300 px-3 py-2 rounded border border-green-600"
            >
              ➕ Add
            </button>
          </div>

          {/* Filter buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`retro-button px-3 py-1 rounded text-xs ${
                filter === 'all' 
                  ? 'bg-blue-900 text-blue-300 border-blue-600' 
                  : 'bg-muted text-muted-foreground border-border'
              }`}
            >
              All ({todos.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`retro-button px-3 py-1 rounded text-xs ${
                filter === 'active' 
                  ? 'bg-green-900 text-green-300 border-green-600' 
                  : 'bg-muted text-muted-foreground border-border'
              }`}
            >
              Active ({todos.filter(t => !t.completed).length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`retro-button px-3 py-1 rounded text-xs ${
                filter === 'completed' 
                  ? 'bg-purple-900 text-purple-300 border-purple-600' 
                  : 'bg-muted text-muted-foreground border-border'
              }`}
            >
              Completed ({todos.filter(t => t.completed).length})
            </button>
          </div>

          {/* Todo list */}
          <div className="space-y-2">
            {filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-3 rounded border ${
                  todo.completed 
                    ? 'bg-muted border-gray-600' 
                    : 'bg-window-bg border-border'
                }`}
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    todo.completed 
                      ? 'bg-green-600 border-green-500' 
                      : 'bg-transparent border-gray-400'
                  }`}
                >
                  {todo.completed && <span className="text-white text-xs">✓</span>}
                </button>
                
                <div className="flex-1">
                  <div className={`flex items-center gap-2 ${
                    todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                  }`}>
                    <span className="text-sm">{getPriorityIcon(todo.priority)}</span>
                    <span className="text-sm">{todo.text}</span>
                    <span className={`text-xs ${getPriorityColor(todo.priority)}`}>
                      {todo.priority}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          {/* Mood status */}
          <div className="border-t border-border pt-4 mt-4">
            <div className="text-sm text-accent mb-2">💭 Mood Status</div>
            <div className="text-sm">Thinking... 🤔</div>
          </div>

          {/* Quick actions */}
          <div className="flex gap-2">
            <button
              onClick={() => setTodos(prev => prev.map(todo => ({ ...todo, completed: false })))}
              className="retro-button bg-blue-900 hover:bg-blue-800 text-blue-300 px-3 py-1 rounded border border-blue-600 text-xs"
            >
              🔄 Reset All
            </button>
            <button
              onClick={() => setTodos(prev => prev.filter(todo => !todo.completed))}
              className="retro-button bg-red-900 hover:bg-red-800 text-red-300 px-3 py-1 rounded border border-red-600 text-xs"
            >
              🗑️ Clear Completed
            </button>
          </div>
        </div>
      </div>
    </RetroWindow>
  );
};
