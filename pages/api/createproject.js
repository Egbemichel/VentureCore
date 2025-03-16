import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, description, deadline, teamLeaderId } = req.body;

      console.log("Received data:", {
        name,
        description,
        deadline,
        teamLeaderId,
      });

      const newProject = await prisma.project.create({
        data: {
          name,
          description,
          deadline: new Date(deadline),
          teamLeader: { connect: { id: teamLeaderId } },
        },
      });

      console.log("Project created:", newProject);
      return res.status(201).json(newProject);
    } catch (error) {
      console.error("Error creating project:", error); // Log the full error
      return res
        .status(500)
        .json({ error: error.message || "Something went wrong" });
    } finally {
      await prisma.$disconnect();
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
