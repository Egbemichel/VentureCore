import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { projectId } = req.query;

      if (!projectId) {
        return res.status(400).json({ error: "Project ID is required" });
      }

      const tasks = await prisma.task.findMany({
        where: { projectId },
        select: {
          id: true,
          name: true,
          progress: true,
        },
      });

      return res.status(200).json(tasks);
    }

    if (req.method === "POST") {
      const {
        name,
        description,
        assignedToId,
        projectId,
        progress,
        cost,
        deadline,
      } = req.body;

      if (!name || !description || !projectId || !deadline) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Ensure progress and cost are valid numbers
      const parsedProgress = isNaN(parseFloat(progress))
        ? 0.0
        : parseFloat(progress);
      const parsedCost = isNaN(parseFloat(cost)) ? 0.0 : parseFloat(cost);

      const task = await prisma.task.create({
        data: {
          name,
          description,
          assignedToId: assignedToId || null,
          projectId,
          progress: parsedProgress,
          cost: parsedCost,
          deadline: new Date(deadline),
        },
      });

      return res.status(201).json(task);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("Error in API:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
