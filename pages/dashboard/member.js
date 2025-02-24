"use client"; // Important for client-side context providers

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SearchIcon from "@/components/searchIcon";
import { motion } from "framer-motion";
import InputField from "@/components/InputField";
import NameIcon from "@/components/NameIcon";
import { useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions"; // Custom hook to track container size
import MenuToggle from "./MenuToggle"; // Hamburger icon and toggle
import { Navigation } from "./Navigation"; // The sidebar items
import Heading from "@/components/Heading";
import ProjectCard from "@/components/ProjectCard";
import "../../styles/globals.css";
import "../../styles/styles.css";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: { type: "spring", stiffness: 20, restDelta: 2 },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: { delay: 0.5, type: "spring", stiffness: 400, damping: 40 },
  },
};

export default function MemberDashboard() {
  const [isOpen, toggleOpen] = useCycle(false, true); // Toggle state for the sidebar
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef); // Get container size for animation
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const [isZIndexReduced, setIsZIndexReduced] = useState(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };
  const handleMouseUp = () => {
    isDragging.current = false;
  };
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    scrollRef.current.scrollLeft -= e.movementX * 1.5; // Adjust speed
  };

  useEffect(() => {
    if (isOpen) {
      setIsZIndexReduced(true); // Lower z-index immediately when opening
    } else {
      // Delay restoring the z-index when closing
      const timeout = setTimeout(() => {
        setIsZIndexReduced(false);
      }, 700); // Adjust delay time (300ms in this case)

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    if (status === "authenticated" && session.user?.role !== "member") {
      router.push("/dashboard/non-member");
    }

    if (status === "authenticated") {
      setProjects([
        {
          name: "Project A",
          currentTask: "Design UI",
          progress: 70,
          deadline: "March 15, 2025",
          teamLeader: "Alice Johnson",
          teamLeaderImage: "https://via.placeholder.com/40",
        },
        {
          name: "Project B",
          currentTask: "Develop API",
          progress: 45,
          deadline: "April 10, 2025",
          teamLeader: "Bob Smith",
          teamLeaderImage: "https://via.placeholder.com/40",
        },
        {
          name: "Project C",
          currentTask: "Test Application",
          progress: 90,
          deadline: "May 5, 2025",
          teamLeader: "Charlie Brown",
          teamLeaderImage: "https://via.placeholder.com/40",
        },
        {
          name: "Project D",
          currentTask: "Deploy App",
          progress: 25,
          deadline: "June 20, 2025",
          teamLeader: "David Lee",
          teamLeaderImage: "https://via.placeholder.com/40",
        },
      ]);
    }
  }, [session, status, router]);

  if (status === "loading") return <p>Loading...</p>;

  const toggleSearch = () => {
    if (searchOpen && searchQuery.trim() === "") {
      setSearchOpen(false); // Hide input if empty
    } else if (searchOpen && searchQuery.trim() !== "") {
      console.log("Searching for:", searchQuery); // Perform search
      setSearchOpen(false);
    } else {
      setSearchOpen(true); // Open input field
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 overflow-y-auto">
      {/* Sidebar */}
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        className={`sidebar ${isOpen ? "z-30" : "z-10"}`}
      >
        <motion.div className="background" variants={sidebar} />
        <Navigation /> {/* List of menu items */}
        <MenuToggle toggle={() => toggleOpen()} /> {/* Hamburger icon */}
      </motion.nav>
      {/* Top Section */}
      <div className="flex justify-end items-center mb-6">
        {/* Welcome Text */}
        <div>
          {!searchOpen ? (
            <p className="text-sm text-gray-500">
              Welcome Back,<br></br>
              <span className="text-black text-[22px]">
                {session.user?.name}
              </span>
            </p>
          ) : (
            <p></p>
          )}
        </div>
        {/* Icons Section */}
        <div className="flex items-start space-x-5 mt-3">
          {/* Search Icon & Input */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={
              searchOpen ? { width: 160, opacity: 1 } : { width: 0, opacity: 0 }
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden left-[-160px]"
          >
            <InputField
              IconComponent={NameIcon}
              handleChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              type="text"
              name="search"
              width="160px"
            />
          </motion.div>
          <SearchIcon onClick={toggleSearch} />
        </div>
      </div>

      {/* Rest of the Dashboard */}
      {/* Heading */}
      <Heading text="Project Overview" color="gray" fontSize="16px" />

      {/* Project Cards with Smooth Scrolling */}
      <div
        ref={scrollRef}
        className={`flex space-x-4 overflow-x-scroll p-4 snap-x snap-mandatory ${
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
      <Heading text="Quick Actions" color="gray" fontSize="16px" />
    </div>
  );
}
