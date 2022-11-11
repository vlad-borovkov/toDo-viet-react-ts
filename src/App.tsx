import { useState } from 'react';
import TodoApp from './components/TodoApp/TodoApp';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='page'>
      <TodoApp />
    </div>
  );
}

export default App;
