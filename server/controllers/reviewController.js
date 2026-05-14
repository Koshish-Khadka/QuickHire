import { prisma } from "../config/prisma.js";

export const createReview = async (req, res) => {
  try {
    const { jobId, reviewerId, revieweeId, rating, comment } = req.body;
    if (!jobId || !revieweeId || !reviewerId || !rating || !comment)
      return res.status(404).json({ message: "All Fields are required" });
    const review = await prisma.reviews.create({
      data: {
        jobId,
        reviewerId,
        revieweeId,
        rating,
        comment,
      },
    });
    res
      .status(201)
      .json({ message: "Review created successfuly", data: review });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).json({ message: "Failed" });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(404).json({ message: "userId missing" });
    const review = await prisma.reviews.findUnique({
      where: {
        reviewerId: userId,
      },
    });
    res.status(200).json({ data: review });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).json({ message: "Failed" });
  }
};

export const getJobReviews = async (req, res) => {
  try {
    const { jobId } = req.params;
    if (!jobId) return res.status(404).json({ message: "jobId missing" });

    const jobReview = await prisma.reviews.findMany({ where: { jobId } });

    res.status(200).json({ data: jobReview });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).json({ message: "Failed" });
  }
};

export const updateReview = async (req, res) => {
  try {
  } catch (error) {
    console.error("Failed", error);
    res.status(500).json({ message: "Failed" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    if (!reviewId) return res.status(404).json({ message: "reviewId missing" });
    const deleteReview = await prisma.reviews.delete({
      where: {
        id: reviewId,
      },
    });
    res.status(200).json({ message: "Review deleted successfuly" });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).json({ message: "Failed" });
  }
};
