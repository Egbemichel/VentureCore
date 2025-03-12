"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import Heading from "@/components/Heading";
import ProjectCard from "@/components/ProjectCard";
import Navbar from "@/components/Navbar";
import "../../styles/globals.css";
import "../../styles/styles.css";

export default function MemberDashboard() {
  const [projects, setProjects] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [storedSession, setStoredSession] = useState(null);
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const [isZIndexReduced, setIsZIndexReduced] = useState(false);

  // Handle Dragging for Scrollable Project Cards
  const handleMouseDown = () => (isDragging.current = true);
  const handleMouseUp = () => (isDragging.current = false);
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    scrollRef.current.scrollLeft -= e.movementX * 1.5;
  };

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

    if (user) {
      setProjects([
        {
          name: "Project A",
          currentTask: "Design UI",
          progress: 70,
          deadline: "March 15, 2025",
          teamLeader: "Alice Johnson",
          teamLeaderImage: "/assets/images/Alice1.jpeg",
        },
        {
          name: "Project B",
          currentTask: "Develop API",
          progress: 45,
          deadline: "April 10, 2025",
          teamLeader: "Bob Smith",
          teamLeaderImage: "/assets/images/Bob1.jpeg",
        },
        {
          name: "Project C",
          currentTask: "Test Application",
          progress: 90,
          deadline: "May 5, 2025",
          teamLeader: "Charlie Brown",
          teamLeaderImage: "/assets/images/Charlie1.jpeg",
        },
        {
          name: "Project D",
          currentTask: "Deploy App",
          progress: 25,
          deadline: "June 20, 2025",
          teamLeader: "David Lee",
          teamLeaderImage: "/assets/images/David1.jpeg",
        },
      ]);
    }
  }, [user, status, router]);

  if (status === "loading" && !user) return <p>Loading...</p>;
  if (!user) return <p>Unauthorized. Please log in.</p>;

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto">
      {/* Navbar */}
      <Navbar
        isZIndexReduced={isZIndexReduced}
        setIsZIndexReduced={setIsZIndexReduced}
      />

      {/* Project Overview */}
      <Heading text="Project Overview" color="gray" fontSize="16px" />

      {/* Project Cards with Smooth Scrolling */}
      <div
        ref={scrollRef}
        className={`flex space-x-4 overflow-x-scroll p-4 m-4 snap-x snap-mandatory ${
          isZIndexReduced ? "z-0" : "z-10"
        }`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <div key={index} className="snap-start shrink-0 cards-wrapper">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <Heading text="Quick Actions" color="gray" fontSize="16px" />
    </div>
  );
}
