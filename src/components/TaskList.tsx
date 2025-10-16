import React, { useEffect, useState } from 'react';
import { getAllTasks } from '../db/indexedDB';

interface Task {
  id?: number;
  title: string;
  description: string;
  timestamp: number;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    const allTasks = await getAllTasks();
    setTasks(allTasks);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <strong>{task.title}</strong> — {task.description}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
