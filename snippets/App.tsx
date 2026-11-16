// Sample React component covering TSX language tokens.
import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import type { FC, ReactNode } from 'react';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

type Action =
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: number }
  | { type: 'clear' };

interface TodoListProps<T extends Todo> {
  items: readonly T[];
  onToggle: (id: number) => void;
  renderEmpty?: () => ReactNode;
}

enum Filter {
  All = 'all',
  Active = 'active',
  Done = 'done',
}

const ThemeContext = createContext<'dark' | 'light'>('dark');

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'add':
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case 'toggle':
      return state.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
    case 'clear':
      return [];
    default: {
      const exhaustive: never = action;
      return exhaustive;
    }
  }
}

function TodoList<T extends Todo>({ items, onToggle, renderEmpty }: TodoListProps<T>) {
  const theme = useContext(ThemeContext);

  if (items.length === 0) {
    return <>{renderEmpty?.() ?? <em>Nothing to do</em>}</>;
  }

  return (
    <ul className={`todo-list todo-list--${theme}`}>
      {items.map(({ id, text, done }) => (
        <li key={id}>
          <label>
            <input type="checkbox" checked={done} onChange={() => onToggle(id)} />
            <span style={{ textDecoration: done ? 'line-through' : 'none' }}>{text}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

export const App: FC<{ initial?: Todo[] }> = ({ initial = [] }) => {
  const [todos, dispatch] = useReducer(reducer, initial);
  const filter = Filter.All as Filter;

  const visible = useMemo(
    () => todos.filter((t) => filter === Filter.All || (filter === Filter.Done) === t.done),
    [todos, filter],
  );

  const handleToggle = useCallback((id: number) => dispatch({ type: 'toggle', id }), []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem('text') as HTMLInputElement;
    dispatch({ type: 'add', text: input.value.trim() });
    input.value = '';
  };

  return (
    <ThemeContext.Provider value="dark">
      <form onSubmit={handleSubmit} aria-label="New todo">
        <input name="text" placeholder="What needs doing?" autoFocus />
        <button type="submit">Add</button>
        <button type="button" onClick={() => dispatch({ type: 'clear' })} disabled={!todos.length}>
          Clear
        </button>
      </form>
      <TodoList<Todo> items={visible} onToggle={handleToggle} renderEmpty={() => <p>All done!</p>} />
      <p>
        {visible.length} of {todos.length} items &middot; filter: <code>{filter}</code>
      </p>
    </ThemeContext.Provider>
  );
};

export default App;
