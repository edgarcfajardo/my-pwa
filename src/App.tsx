import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h1>PWA Offline - Lista de Tareas</h1>
      <TaskForm onTaskSaved={() => setRefresh(prev => !prev)} />
      <TaskList key={refresh ? 1 : 0} />
    </div>
  );
};

export default App;
