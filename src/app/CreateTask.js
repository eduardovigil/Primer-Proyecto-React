import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const CreateTask = ({ projectId }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `/api/projects/${projectId}/tasks`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Enviar token JWT
          },
        }
      );
      console.log('Tarea creada:', response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la tarea');
    }
  };

  if (!authToken) return <p>No estás autenticado</p>;

  return (
    <div>
      <h1>Crear Tarea</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título de la tarea"
        />
        <button type="submit">Crear Tarea</button>
      </form>
    </div>
  );
};

export default CreateTask;
