import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const Tasks = ({ projectId }) => {
  const { authToken } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`/api/projects/${projectId}/tasks`, {
          headers: {
            Authorization: `Bearer ${authToken}`, // Enviar token JWT
          },
        });
        setTasks(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar tareas');
      }
    };

    if (authToken && projectId) {
      fetchTasks();
    }
  }, [authToken, projectId]);

  if (!authToken) return <p>No estás autenticado</p>;

  return (
    <div>
      <h1>Tareas del Proyecto</h1>
      {error && <p>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
