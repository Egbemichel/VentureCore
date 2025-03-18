"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import Heading from "@/components/Heading";
import ProjectCard from "@/components/ProjectCard";
import { useZIndex } from "@/context/ZIndexContext";
import QuickActions from "@/components/QuickActions"; // Import plus icon
import Tasks from "@/components/Tasks";

export default function MemberDashboard() {
  const [projects, setProjects] = useState([]);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [storedSession, setStoredSession] = useState(null);
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const { isZIndexReduced } = useZIndex();
  const [selectedProject, setSelectedProject] = useState(null);

  // ✅ Restore session from cookie if lost
  useEffect(() => {
    if (!session) {
      const cookies = parseCookies();
      if (cookies["nextauth-token"]) {
        setStoredSession(JSON.parse(cookies["nextauth-token"]));
      }
    }
  }, [session]);

  const user = session?.user || storedSession;

  useEffect(() => {
    if (status === "authenticated" && user?.role !== "member") {
      router.push("/dashboard/non-member");
    }
  }, [user, status, router]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();

        if (response.ok) {
          setProjects(data.projects);
        } else {
          console.error("Error fetching projects:", data.error);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchProjects();
    }
  }, [session]);

  if (status === "loading" && !user) return <p>Loading...</p>;
  if (!user) return <p>Unauthorized. Please log in.</p>;

  return (
    <div className="flex flex-col">
      {/* Project Overview */}
      <Heading text="Project Overview" color="gray" fontSize="16px" />

      {/* Project Cards with Smooth Scrolling */}
      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6">
          <p className="text-lg font-semibold">
            You are a part of no projects.
          </p>
          <p className="text-gray-600">Next Move?</p>
          <div className="mt-4 flex space-x-4">
            <a href="/projects/open" className="text-blue-500 hover:underline">
              Browse all open projects
            </a>
            <a href="/courses" className="text-blue-500 hover:underline">
              Take a course
            </a>
          </div>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className={`flex space-x-4 overflow-x-scroll p-4 m-4 snap-x snap-mandatory ${
            isZIndexReduced ? "z-0" : "z-10"
          }`}
          onMouseDown={() => (isDragging.current = true)}
          onMouseUp={() => (isDragging.current = false)}
          onMouseMove={(e) => {
            if (!isDragging.current) return;
            scrollRef.current.scrollLeft -= e.movementX * 1.5;
          }}
        >
          {projects.map((project) => (
            <div key={project.id} className="snap-start shrink-0 cards-wrapper">
              <ProjectCard project={project} onSelect={setSelectedProject} />
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <Heading text="Quick Actions" color="gray" fontSize="16px" />

      {/* Add Project Button */}

      <QuickActions
        selectedProject={selectedProject}
        userId={session?.user?.id}
      />
      <Heading text="Project Stats" color="gray" fontSize="16px" />
      <p className="font-bold pl-6 text-gray-500">Tasks</p>
      <Tasks projectId={selectedProject?.id} />
    </div>
  );
}
