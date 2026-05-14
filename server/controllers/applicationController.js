import { prisma } from "../config/prisma.js";

export const applyToJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { userId } = req.session; //worker id
        if (!jobId || userId) {
            return res.status(404).json({ message: "Id missing" })
        }
        const { coverLetter, proposedPrice } = req.body

        // verify job
        const job = await prisma.job.findUnique({
            where: {
                id: jobId
            }
        })
        if (!job) return res.status(404).json({ message: "Job not found" })

        // verify if job is not applied by any other 

        if (job.status !== "OPEN" || job.selectedWorkerId !== null) {
            return res.status(400).json({ message: "This Job has already been assigned" })
        }


        const application = await prisma.application.create({
            data: {
                jobId,
                workerId: userId,
                coverLetter,
                proposedPrice,
                status: "PENDING"
            }
        })
        res.status(201).json({ message: "Application successfuly applied", data: application })
    } catch (error) {
        console.log("failed at job apply", error)
        res.status(500).json({ message: "Server error" })
    }
};

export const getJobApplications = async (req, res) => {
    try {
        const { jobId } = req.params;
        const applications = await prisma.application.findUnique({
            where: {
                jobId: jobId
            },
            include: {
                applicant
            }
        })
        if (!applications) {
            res.status(404).json({ message: "No application found " })
        }
        res.status(200).json({ data: applications })
    } catch (error) {
        console.log("failed to get job application", error)
        res.status(500).json({ message: "Server error" })
    }
};

export const getWorkerApplications = async (req, res) => {
    try {

        const applications = await prisma.application.findMany({})
        res.status(200).json({ data: applications })

    } catch (error) {
        console.log("failed to get worker applications", error)
        res.status(500).json({ message: "Server error" })
    }
};

export const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params
        if (!applicationId) return res.status(404).json({ message: "ids missing" })

        // find that application exists
        const application = await prisma.application.findUnique({ where: { id: applicationId } })
        if (!application) return res.status(404).json({ message: "application not found" })

        const updateApplication = await prisma.application.update({
            where: {
                id: applicationId
            }, data: {
                status: "APPROVED"
            }
        })
        res.status(200).json({ data: updateApplication })

    } catch (error) {
        console.log("failed to update application status", error)
        res.status(500).json({ message: "Server error" })
    }
};

export const getApplicationDetail = async (req, res) => {
    try {
        const { applicationId } = req.params
        if (!applicationId) return res.status(404).json({ message: "ids missing" })

        // find that application exists
        const application = await prisma.application.findUnique({ where: { id: applicationId } })
        if (!application) return res.status(404).json({ message: "application not found" })

        res.status(200).json({ data: application })

    } catch (error) {
        console.log("failed to get application detail", error)
        res.status(500).json({ message: "Server error" })
    }
};


