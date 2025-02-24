import { motion } from "framer-motion";
import ".././styles/globals.css";

// Project Card Component
const ProjectCard = ({ project }) => {
  return (
    <motion.div className="bg-[#6c63ff] p-4 rounded-lg shadow-md min-w-[250px] card">
      <h3 className="font-semibold text-lg">{project.name}</h3>
      <p className="text-sm text-white">Current Task: {project.currentTask}</p>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className="bg-[#0DE84B] h-2 rounded-full"
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>
      <p className="text-sm mt-2">Deadline: {project.deadline}</p>
      <div className="flex items-center mt-2">
        <img
          src={project.teamLeaderImage}
          alt="Leader"
          className="w-8 h-8 rounded-full mr-2"
        />
        <p className="text-sm font-semibold">{project.teamLeader}</p>
      </div>
    </motion.div>
  );
};
export default ProjectCard;
