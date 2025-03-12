import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    const {
      name,
      description,
      leaderId,
      teamMembers,
      tasks,
      budgets,
      announcements,
      events,
    } = req.body;

    if (!name || !description || !leaderId) {
      return res.status(400).json({
        message: "Project name, description, and leader are required",
      });
    }

    const project = await prisma.project.create({
      data: {
        name,
        description,
        leaderId,
      },
    });

    if (teamMembers?.length > 0) {
      await prisma.teamMember.createMany({
        data: teamMembers.map((userId) => ({
          projectId: project.id,
          userId,
          role: "member",
        })),
      });
    }

    if (tasks?.length > 0) {
      await prisma.task.createMany({
        data: tasks.map((task) => ({
          name: task.name,
          description: task.description,
          projectId: project.id,
          assignedToId: task.assignedToId,
          progress: task.progress || 0,
          deadline: new Date(task.deadline),
          cost: task.cost || 0,
        })),
      });
    }

    if (budgets?.length > 0) {
      await prisma.budget.createMany({
        data: budgets.map((budget) => ({
          projectId: project.id,
          userId: budget.userId,
          name: budget.name,
          type: budget.type,
          amount: budget.amount,
        })),
      });
    }

    if (announcements?.length > 0) {
      await prisma.announcement.createMany({
        data: announcements.map((announcement) => ({
          projectId: project.id,
          message: announcement.message,
        })),
      });
    }

    if (events?.length > 0) {
      await prisma.calendarEvent.createMany({
        data: events.map((event) => ({
          projectId: project.id,
          title: event.title,
          date: new Date(event.date),
        })),
      });
    }

    return res
      .status(201)
      .json({ message: "Project created Successfully", project });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
