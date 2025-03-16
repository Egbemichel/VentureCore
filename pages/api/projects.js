import { getSession } from "next-auth/react";
import { prisma } from "../../lib/prisma"; // Ensure Prisma is set up correctly

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const userId = session.user.id;

    // Fetch projects where the user is either a leader or a team member
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { teamLeaderId: userId }, // Projects where the user is a team leader
          { members: { some: { userId } } }, // Projects where the user is a member
        ],
      },
      include: {
        teamLeader: { select: { name: true, image: true } },
      },
    });

    res.status(200).json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
