import { prisma } from "../config/prisma.js";

export const updateWorkerProfile = async (req, res) => {
  try {

    const { skills, hourlyRate, availability, certifications } = req.body;
    const userId = req.session.userId;
    if (!userId) return res.status(404).json({ message: "userid missing" })
    // const userId = "3e28dc8e-f40a-4ac8-8b21-3f3861d36499";

    if (!skills || !hourlyRate || !availability) {
      return res.status(400).json({ message: "Missing Fields" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) return res.status(400).json({ message: "User not found" });
    const updateProfile = await prisma.workerProfile.update({
      where: {
        userId,
      },
      data: {
        skills,
        hourlyRate,
        availability,
        certifications,
      },
    });
    res.status(200).json({ message: "Profile updated", data: updateProfile });
  } catch (error) {
    console.log("Failed to update profile", error);
    res.status(500).json({ message: "Operation Failed" });
  }
};

export const getWorkerProfile = async (req, res) => {


  try {
    const { workerId } = req.params;
    if (!workerId) return res.status(400).json({ message: "ID missing" });
    // check worker in db
    const worker = await prisma.workerProfile.findUnique({
      where: {
        id: workerId,
      },

      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            bio: true,
            location: true,
          },
        },
      },
    });

    if (!worker) return res.status(400).json({ message: "Worker not found" });
    res.status(200).json({ message: "Worker Profile", data: worker });
  } catch (error) {
    console.log("Failed", error);
    res.status(500).json({ message: "Operation Failed" });
  }
};

export const allWorkers = async (req, res) => {

  try {
    const workers = await prisma.workerProfile.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            bio: true,
            location: true,
          },
        },
      },
    });
    res.status(200).json({ data: workers });
  } catch (error) {
    console.log("Failed", error);
    res.status(500).json({ message: "Operation Failed" });
  }
};
