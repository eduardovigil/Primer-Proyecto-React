import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const DeleteTask = ({ projectId, taskId }) => {
  const { authToken } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`/api/projects/${projectId}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Enviar token JWT
        },
      });
      console.log('Tarea eliminada');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al eliminar la tarea');
    }
  };

  if (!authToken) return <p>No estás autenticado</p>;

  return (
    <div>
      <button onClick={handleDeleteTask}>Eliminar Tarea</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default DeleteTask;
