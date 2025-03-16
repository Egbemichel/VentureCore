import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { action, name, email, password } = req.body;

    try {
      if (action === "signup") {
        // Validate input data
        if (!name || !email || !password) {
          return res
            .status(400)
            .json({ success: false, message: "All fields are required!" });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
          return res
            .status(400)
            .json({ success: false, message: "Email already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
          data: { name, email, password: hashedPassword },
        });

        let dashboard = "/dashboard/non-member"; // Default non-member dashboard

        if (email.endsWith("_ecoswateadmin@gmail.com")) {
          dashboard = "/dashboard/admin";
        } else if (email.endsWith("_ecoswate@gmail.com")) {
          dashboard = "/dashboard/member";
        }

        return res.status(201).json({
          success: true,
          message: "Account created!",
          redirectTo: "/login",
        });
      }

      if (action === "login") {
        // Validate input data
        if (!email || !password) {
          return res
            .status(400)
            .json({ success: false, message: "All fields are required!" });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res
            .status(401)
            .json({ success: false, message: "Invalid email or password!" });
        }

        // Determine role dynamically based on email structure
        let dashboard = "/dashboard/non-member"; // Default non-member dashboard

        if (email.endsWith("_ecoswateadmin@gmail.com")) {
          dashboard = "/dashboard/admin";
        } else if (email.endsWith("_ecoswate@gmail.com")) {
          dashboard = "/dashboard/member";
        }

        return res.status(200).json({
          success: true,
          message: "Login successful!",
          redirectTo: dashboard, // Send the dashboard URL to the frontend
        });
      }

      return res
        .status(400)
        .json({ success: false, message: "Invalid action!" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  }

  return res
    .status(405)
    .json({ success: false, message: "Method Not Allowed" });
}
// In the code snippet above, we have a single API route that handles both login and signup actions. We first check if the request method is POST and then extract the action, name, email, and password from the request body.
