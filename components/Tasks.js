import { useEffect, useState } from "react";

const Tasks = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(`/api/tasks?projectId=${projectId}`);
      const data = await res.json();
      setTasks(data);
    };
    if (projectId) fetchTasks();
  }, [projectId]);

  return (
    <div className="flex overflow-x-auto space-x-4 p-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="p-4 bg-gray-100 rounded-lg shadow-md min-w-[200px]"
        >
          <h4 className="font-semibold">{task.name}</h4>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${task.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
