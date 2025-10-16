import React, { useState } from 'react';
import { saveTask, type Task } from '../db/indexedDB';

interface TaskFormProps {
  onTaskSaved: () => void;
}

type TaskData = Pick<Task, 'title' | 'description'>;

const TaskForm: React.FC<TaskFormProps> = ({ onTaskSaved }) => {
  const [task, setTask] = useState<TaskData>({ title: '', description: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.title.trim()) return;
    setSaving(true);
    setError(null);
    try {
      await saveTask({ ...task, timestamp: Date.now() });
      setTask({ title: '', description: '' });
      onTaskSaved();
    } catch (err) {
      setError('No se pudo guardar la tarea. Intenta de nuevo.');
    } finally {
      setSaving(false);
    }
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
      {error && <span style={errorStyle}>{error}</span>}
      <button type="submit" style={buttonStyle} disabled={saving}>
        {saving ? 'Guardando…' : 'Guardar tarea'}
      </button>
    </form>
  );
};

// Estilos en línea
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

const errorStyle: React.CSSProperties = {
  color: '#d32f2f',
  fontSize: '14px',
};

export default TaskForm;
