import * as React from "react";
import { motion } from "framer-motion";
import "../../styles/styles.css";
import HomeIcon from "@/components/HomeIcon";
import CourseIcon from "@/components/CourseIcon";
import NotiIcon from "@/components/NotiIcon";
import WikiIcon from "@/components/WikiIcon";
import MAdminIcon from "@/components/MessageAdminIcon";
import LogoutIcon from "@/components/LogoutIcon";
import { signOut } from "next-auth/react";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import Link from "next/link";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { y: { stiffness: 1000, velocity: -100 } },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: { y: { stiffness: 1000 } },
  },
};
export const MenuItem = ({ i, isOpen }) => {
  const router = useRouter();
  const currentPath = router.pathname; // Get the current route

  const links = [
    { path: "/dashboard/member", icon: HomeIcon, label: "Home" },
    { path: "/dashboard/admin", icon: CourseIcon, label: "Courses" },
    {
      path: "/dashboard/notifications",
      icon: NotiIcon,
      label: "Notifications",
    },
    { path: "/wiki", icon: WikiIcon, label: "Wiki" },
    { path: "/message-admin", icon: MAdminIcon, label: "Message Admin" },
  ];

  const handleLogout = () => {
    destroyCookie(null, "nextauth-token");
    signOut({ callbackUrl: "/login" });
  };

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`${isOpen ? "pointer-events-auto" : "pointer-events-none"} `}
    >
      {i < links.length ? (
        <Link
          href={links[i].path}
          className="flex items-center space-x-2 nav-li"
        >
          <div className="icon-placeholder">
            {/* Change icon color if active */}
            {React.createElement(links[i].icon, {
              color: currentPath === links[i].path ? "black" : "white",
            })}
          </div>
          <div
            className={`text-2xl ${
              currentPath === links[i].path ? "text-black" : "text-white"
            }`}
          >
            {links[i].label}
          </div>
        </Link>
      ) : (
        <div
          className="flex items-center space-x-2 cursor-pointer nav-li"
          onClick={handleLogout}
        >
          <div className="icon-placeholder">
            <LogoutIcon stroke={"#ef4444"} />
          </div>
          <div className="text-red-500 text-xl">Log Out</div>
        </div>
      )}
    </motion.li>
  );
};
