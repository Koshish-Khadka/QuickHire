import { prisma } from "../../config/prisma.js";

export const listAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        bio: true,
        role: true,
        location: true,
        isVerified: true,
        createdAt: true,
      },
    });
    res.status(200).json({ data: users });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).json({ message: "Failed" });
  }
};
export const listAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany();
    res.status(200).json({ data: jobs });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).json({ message: "Failed" });
  }
};
export const deleteReportedContent = async (req, res) => {
  try {
  } catch (error) {
    console.error("Failed", error);
    res.status(500).json({ message: "Failed" });
  }
};
