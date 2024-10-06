import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const UpdateTask = ({ projectId, taskId }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `/api/projects/${projectId}/tasks/${taskId}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Enviar token JWT
          },
        }
      );
      console.log('Tarea actualizada:', response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar la tarea');
    }
  };

  if (!authToken) return <p>No estás autenticado</p>;

  return (
    <div>
      <h1>Actualizar Tarea</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleUpdateTask}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nuevo título de la tarea"
        />
        <button type="submit">Actualizar Tarea</button>
      </form>
    </div>
  );
};

export default UpdateTask;
