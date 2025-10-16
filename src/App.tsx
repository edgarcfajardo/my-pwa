import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h1>Lista de tareas offline</h1>
      <TaskForm onTaskSaved={() => setRefresh(!refresh)} />
      <TaskList key={refresh ? 'r1' : 'r2'} />
      <OfflineStatus />
    </div>
  );
};

// Componente para mostrar si estamos offline
const OfflineStatus: React.FC = () => {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return (
    <div style={{ color: isOnline ? 'green' : 'red' }}>
      {isOnline ? '🔵 Conexión disponible' : '🔴 Offline — los datos se guardan localmente'}
    </div>
  );
};

export default App;
