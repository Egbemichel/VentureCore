//Styling needs to be done
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useZIndex } from "@/context/ZIndexContext";

const ManageTeam = () => {
  const router = useRouter();
  const { projectId } = router.query;

  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [role, setRole] = useState("member");
  const { isZIndexReduced } = useZIndex();

  useEffect(() => {
    if (!projectId) return;

    const fetchUsers = async () => {
      const res = await fetch("/api/users"); // Fetch all users
      const data = await res.json();
      setUsers(data);
    };

    const fetchMembers = async () => {
      const res = await fetch(`/api/team-members?projectId=${projectId}`);
      const data = await res.json();
      setMembers(data);
    };

    fetchUsers();
    fetchMembers();
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/team-members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId, userId: selectedUser, role }),
    });

    if (res.ok) {
      setSelectedUser("");
      setRole("member");
      router.reload();
    } else {
      console.error("Failed to add member");
    }
  };

  return (
    <div className={`p-4 max-w-lg mx-auto ${isZIndexReduced ? "z-0" : "z-10"}`}>
      <h2 className="text-xl font-bold mb-4">Manage Team</h2>
      <form
        onSubmit={handleSubmit}
        className={`space-y-4 ${isZIndexReduced ? "z-0" : "z-10"}`}
      >
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          required
          className={`${isZIndexReduced ? "z-0" : "z-10"} relative`}
        >
          <option value="" className={`${isZIndexReduced ? "z-0" : "z-10"}`}>
            Select a user
          </option>
          {users.map((user) => (
            <option
              key={user.id}
              value={user.id}
              disabled={members.some((m) => m.id === user.id)}
            >
              {user.name}
            </option>
          ))}
        </select>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={`${isZIndexReduced ? "z-0" : "z-10"} relative`}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className={`${isZIndexReduced ? "z-0" : "z-10"} m-4`}
        >
          Add Member
        </button>
      </form>
      <h3 className="text-lg font-bold mt-6">Current Team Members</h3>
      <ul className={`relative ${isZIndexReduced ? "z-0" : "z-10"}`}>
        {members.map((member) => (
          <li key={member.id} className="border p-2 rounded">
            {member.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageTeam;
