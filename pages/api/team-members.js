import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { projectId } = req.query;
    if (!projectId)
      return res.status(400).json({ error: "Project ID is required" });

    try {
      const members = await prisma.teamMember.findMany({
        where: { projectId },
        include: { user: true },
      });

      const formattedMembers = members.map((member) => ({
        id: member.user.id,
        name: member.user.name,
        role: member.role,
      }));

      return res.status(200).json(formattedMembers);
    } catch (error) {
      console.error("Error fetching members:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "POST") {
    const { projectId, userId, role } = req.body;
    if (!projectId || !userId || !role)
      return res.status(400).json({ error: "Missing required fields" });

    try {
      const existingMember = await prisma.teamMember.findFirst({
        where: { projectId, userId },
      });

      if (existingMember)
        return res
          .status(400)
          .json({ error: "User is already in the project" });

      const newMember = await prisma.teamMember.create({
        data: { projectId, userId, role },
      });

      return res.status(201).json(newMember);
    } catch (error) {
      console.error("Error adding member:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
