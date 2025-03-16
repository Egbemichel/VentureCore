import { motion } from "framer-motion";
import ".././styles/globals.css";
import { format } from "date-fns";

// Project Card Component
const ProjectCard = ({ project, onSelect }) => {
  const formattedDeadline = format(new Date(project.deadline), "do MMMM yyyy");
  return (
    <motion.div
      className="bg-[#6c63ff] p-4 rounded-lg shadow-md min-w-[250px] card cursor-pointer"
      onClick={() => onSelect(project)} // Trigger selection
    >
      <h3 className="font-semibold text-lg">Project Name: {project.name}</h3>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className="bg-[#0DE84B] h-2 rounded-full"
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>
      <p className="text-sm mt-2">Deadline: {formattedDeadline}</p>
      <div className="flex items-center mt-2">
        {/**<img
          src={project?.teamLeaderImage.img}
          alt="Leader"
          className="w-8 h-8 rounded-full mr-2"
        />**/}
        <p className="text-sm font-semibold">
          Team Lead: {project.teamLeader?.name}
        </p>
      </div>
    </motion.div>
  );
};
export default ProjectCard;
