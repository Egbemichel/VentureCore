import { useZIndex } from "@/context/ZIndexContext";
import PlusIcon from "./PlusIcon";
import ManageIcon from "./ManageIcon";
import PostIcon from "./PostIcon";
import FileIcon from "./FileIcon";
import UpdateIcon from "./UpdateIcon";
import TaskIcon from "./TaskIcon";
import ModifyIcon from "./ModifyIcon";
import { useRouter } from "next/router";

const QuickActions = ({ selectedProject, userId }) => {
  const { isZIndexReduced } = useZIndex();
  const router = useRouter();
  const actions = [
    {
      label: "Projects",
      route: "/dashboard/add-project",
      color: "bg-[#6c63ff]",
      icon: <PlusIcon />,
      mt: "mt-0",
    },
  ];

  if (selectedProject) {
    const isTeamLeader = selectedProject.teamLeaderId === userId;
    actions.push(
      ...(isTeamLeader
        ? [
            {
              label: "Tasks",
              route: `/dashboard/add-task?projectId=${selectedProject.id}`,
              color: "bg-blue-500",
              icon: <PlusIcon />,
              mt: "mt-[70px]",
            },
            {
              label: "Modify",
              route: "/dashboard/modify-project",
              color: "bg-green-500",
              icon: <ModifyIcon />,
              mt: "mt-[140px]",
            },
            {
              label: "Manage",
              route: `/dashboard/manage-team?projectId=${selectedProject.id}`,
              color: "bg-yellow-500",
              icon: <ManageIcon />,
              mt: "mt-[210px]",
            },
            {
              label: "Post",
              route: "/dashboard/post",
              color: "bg-purple-500",
              icon: <PostIcon />,
              mt: "mt-[280px]",
            },
            {
              label: "Files",
              route: "/dashboard/upload-file-leader",
              color: "bg-red-500",
              icon: <FileIcon />,
              mt: "mt-[350px]",
            },
          ]
        : [
            //suppose to be an eye but is not, fix later
            {
              label: "Tasks",
              route: "/dashboard/view-tasks",
              color: "bg-gray-500",
              icon: <TaskIcon />,
              mt: "mt-[70px]",
            },
            //This update route is useful but not here, probably use it as a button in view-tasks
            {
              label: "Update",
              route: "/dashboard/update-task",
              color: "bg-orange-500",
              icon: <UpdateIcon />,
              mt: "mt-[140px]",
            },
            {
              label: "Files",
              route: "/dashboard/upload-file-member",
              color: "bg-red-700",
              icon: <FileIcon />,
              mt: "mt-[210px]",
            },
          ])
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 p-4 gap-4 sm:grid-cols-3 sm:gap-2 min-h-[100px]">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => router.push(action.route)}
            className={`flex flex-col items-center justify-center w-[360px] h-12 sm:20 sm:h-20 shadow-md transition rounded-lg ${
              action.color
            } ${isZIndexReduced ? "z-0" : "z-10"}`}
          >
            {action.icon}
            <span className="text-xs mt-1">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
