import { prisma } from "../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const session = await getSession({ req });

      if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const currentUserId = session.user.id;

      const users = await prisma.user.findMany({
        where: {
          email: {
            endsWith: "_ecoswate@gmail.com",
          },
          id: {
            not: currentUserId,
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
