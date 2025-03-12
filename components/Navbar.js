"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useCycle } from "framer-motion";
import { useDimensions } from "@/pages/dashboard/use-dimensions";
import MenuToggle from "@/pages/dashboard/MenuToggle";
import { Navigation } from "@/pages/dashboard/Navigation";
import SearchIcon from "@/components/searchIcon";
import InputField from "@/components/InputField";
import NameIcon from "@/components/NameIcon";
import { useZIndex } from "@/context/ZIndexContext";

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

export default function Navbar() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const user = session?.user;
  const { isZIndexReduced, setIsZIndexReduced } = useZIndex();

  useEffect(() => {
    if (isOpen) {
      setIsZIndexReduced(true);
    } else {
      const timeout = setTimeout(() => setIsZIndexReduced(false), 700);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const toggleSearch = () => {
    if (searchOpen && searchQuery.trim() === "") {
      setSearchOpen(false);
    } else if (searchOpen && searchQuery.trim() !== "") {
      console.log("Searching for:", searchQuery);
      setSearchOpen(false);
    } else {
      setSearchOpen(true);
    }
  };

  return (
    <div className="relative">
      {/* Sidebar Menu */}
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        className={`sidebar ${isOpen ? "z-30" : "z-10"}`}
      >
        <motion.div className="background" variants={sidebar} />
        <Navigation />
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>

      {/* Top Navigation Section */}
      <div className="flex justify-end items-center mb-6">
        {/* Welcome Text */}
        <div>
          {!searchOpen ? (
            <p className="text-sm text-gray-500">
              Welcome Back,<br></br>
              <span className="text-black text-[22px]">{user?.name}</span>
            </p>
          ) : (
            <p></p>
          )}
        </div>

        {/* Search Section */}
        <div className="flex items-start space-x-5 mt-3">
          {/* Search Input Field */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={
              searchOpen ? { width: 160, opacity: 1 } : { width: 0, opacity: 0 }
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`overflow-hidden left-[-160px] ${
              isZIndexReduced ? "z-0" : "z-10"
            }`}
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
    </div>
  );
}
