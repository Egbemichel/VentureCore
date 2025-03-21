import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import "../../styles/styles.css";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = ({ isOpen }) => (
  <motion.ul variants={variants} className="nav-ul top-[100px]">
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <MenuItem i={i} key={i} isOpen={isOpen} />
    ))}
  </motion.ul>
);
