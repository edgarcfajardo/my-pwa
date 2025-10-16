import React, { useEffect, useState } from 'react';
import { getTasks, type Task } from '../db/indexedDB';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    const allTasks = await getTasks();
    setTasks(allTasks);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <h2>Lista de tareas</h2>
      {tasks.length === 0 && <p>No hay tareas guardadas.</p>}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
