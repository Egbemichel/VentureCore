//Add CustomModal
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useZIndex } from "@/context/ZIndexContext";

const AddTask = () => {
  const router = useRouter();
  const { projectId } = router.query;

  const [members, setMembers] = useState([]);
  const { isZIndexReduced } = useZIndex();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    assignedToId: "",
    progress: 0,
    cost: 0,
    deadline: "",
  });

  useEffect(() => {
    if (!projectId) return;

    const fetchMembers = async () => {
      const res = await fetch(`/api/team-members?projectId=${projectId}`);
      const data = await res.json();
      setMembers(data);
    };

    fetchMembers();
  }, [projectId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        deadline: new Date(formData.deadline).toISOString(),
        projectId,
      }),
    });

    if (res.ok) {
      router.reload();
    } else {
      console.error("Failed to add task");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-lg mx-auto ml-4 mr-4 space-y-4 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-xl font-bold text-center">Add Task</h2>

      <input
        type="text"
        name="name"
        placeholder="Task Name"
        onChange={handleChange}
        required
        className={`w-full p-2 border rounded ${
          isZIndexReduced ? "z-0" : "z-10"
        } relative`}
      />

      <textarea
        name="description"
        placeholder="Task Description"
        onChange={handleChange}
        required
        className={`w-full p-2 border rounded ${
          isZIndexReduced ? "z-0" : "z-10"
        } relative`}
      />

      {/* Select Team Member */}
      <select
        name="assignedToId"
        onChange={handleChange}
        required
        className={`w-full p-2 border rounded ${
          isZIndexReduced ? "z-0" : "z-10"
        } relative`}
      >
        <option value="">Select a Team Member</option>
        {members.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name} ({member.role})
          </option>
        ))}
      </select>

      <input
        type="number"
        name="progress"
        placeholder="Progress (%)"
        onChange={handleChange}
        required
        min="0"
        max="100"
        className={`w-full p-2 border rounded ${
          isZIndexReduced ? "z-0" : "z-10"
        } relative`}
      />

      <input
        type="number"
        name="cost"
        placeholder="Cost"
        onChange={handleChange}
        required
        min="0"
        className={`w-full p-2 border rounded ${
          isZIndexReduced ? "z-0" : "z-10"
        } relative`}
      />

      <input
        type="date"
        name="deadline"
        onChange={handleChange}
        required
        className={`w-full p-2 border rounded ${
          isZIndexReduced ? "z-0" : "z-10"
        } relative`}
      />

      <button
        type="submit"
        className={`w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 ${
          isZIndexReduced ? "z-0" : "z-10"
        } relative`}
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
