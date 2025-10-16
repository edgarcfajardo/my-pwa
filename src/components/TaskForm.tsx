import React, { useState } from 'react';
import { saveTask } from '../db/indexedDB';

interface TaskFormProps {
  onTaskSaved: () => void;
}

interface TaskData {
  title: string;
  description: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskSaved }) => {
  const [task, setTask] = useState<TaskData>({ title: '', description: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.title.trim()) return;

    await saveTask({
      ...task,
      timestamp: Date.now(),
    });

    setTask({ title: '', description: '' });
    onTaskSaved();
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        name="title"
        type="text"
        placeholder="Título"
        value={task.title}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <textarea
        name="description"
        placeholder="Descripción"
        value={task.description}
        onChange={handleChange}
        style={textareaStyle}
      />
      <button type="submit" style={buttonStyle}>
        Guardar tarea
      </button>
    </form>
  );
};

// Estilos básicos en línea (puedes usar CSS o Tailwind si prefieres)
const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
};

const inputStyle: React.CSSProperties = {
  padding: '8px',
  fontSize: '16px',
};

const textareaStyle: React.CSSProperties = {
  padding: '8px',
  fontSize: '16px',
  minHeight: '80px',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px',
  fontSize: '16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

export default TaskForm;
