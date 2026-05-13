import { prisma } from "../config/prisma";

export const createJob = async (req, res) => {
  try {
    const userId = req.session.id;
    const {
      title,
      description,
      category,
      location,
      latitude,
      longitude,
      startDate,
      endDate,
      budget,
      urgency,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !location ||
      latitude == null ||
      longitude == null ||
      !userId
    ) {
      return res.status(404).json({ message: "All fileds are required" });
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        category,
        location,
        latitude,
        longitude,
        startDate,
        endDate,
        budget,
        urgency,
      },
    });
    res.status(201).json({ message: "Job Created Successfuly", data: job });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).json({ message: "Failed" });
  }
};

export const listJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany();
    res.status(200).json({ data: jobs });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).json({ message: "Failed" });
  }
};

export const getJobDetail = async (req, res) => {
  try {
    const { jobId } = req.params;
    if (!id) return res.status(404).json({ message: "Id missing" });

    const jobDetail = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            location: true,
          },
        },
        applications: true,
      },
    });
    if (!jobDetail) return res.status(400).json({ message: "Data not found" });
    res.status(200).json({ data: jobDetail });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).json({ message: "Failed" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const {
      title,
      description,
      category,
      location,
      latitude,
      longitude,
      startDate,
      endDate,
      budget,
      urgency,
    } = req.body;
    if (!id) return res.status(400).json({ message: "Id missing" });
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });
    if (!job) return res.status(400).json({ message: "Job not found" });
    const updatedJob = await prisma.job.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        category,
        location,
        latitude,
        longitude,
        startDate,
        endDate,
        budget,
        urgency,
      },
    });
    res
      .status(200)
      .json({ message: "Job updated Successfuly", data: updatedJob });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).json({ message: "Failed" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    if (!id) return res.status(404).json({ message: "Id missing" });
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });
    if (!job) return res.status(400).json({ message: "Job not found" });
    await prisma.job.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "Job Deleted Successfuly" });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).json({ message: "Failed" });
  }
};

export const completeJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    if (!id) return res.status(404).json({ message: "Id missing" });
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });
    if (!job) return res.status(400).json({ message: "Job not found" });
    const completedJob = await prisma.job.update({
      where: {
        id: jobId,
      },
      data: {
        status: "COMPLETED",
      },
    });
    res.status(200).json({
      message: "Job completed successfully",
      data: completedJob,
    });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).json({ message: "Failed" });
  }
};
