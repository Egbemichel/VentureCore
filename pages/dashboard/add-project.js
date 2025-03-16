"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useZIndex } from "@/context/ZIndexContext";

export default function AddProject() {
  const { data: session } = useSession();
  const router = useRouter();
  const { isZIndexReduced } = useZIndex(); // add context for z-index management

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.name || !formData.description || !formData.deadline) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/createproject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          deadline: new Date(formData.deadline).toISOString(),
          teamLeaderId: session?.user?.id, // Send only the ID, not the whole user object
        }),
      });
      if (!res.ok) throw new Error("Failed to create project.");

      router.push("/dashboard/member"); // Redirect to dashboard
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-md mt-10 ">
      <h1 className="text-[25px] text-[#6c63ff] font-bold mb-4">
        Create a New Project
      </h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="space-y-4 flex flex-col">
          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={formData.name}
            onChange={handleChange}
            className={`border p-2 rounded ${
              isZIndexReduced ? "z-0" : "z-10"
            } w-full`}
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            className={`border p-2 rounded ${
              isZIndexReduced ? "z-0" : "z-10"
            } w-full`}
          />
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className={`border p-2 rounded ${
              isZIndexReduced ? "z-0" : "z-10"
            } w-full`}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`bg-[#6c63ff] text-white p-2 rounded bottom-0 add-button2 ${
            isZIndexReduced ? "z-0" : "z-10"
          } w-[93%] hover:bg-blue-700 transition`}
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}
