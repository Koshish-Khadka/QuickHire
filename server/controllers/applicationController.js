import { prisma } from "../config/prisma.js";

// function to apply for a task 
// export const applyToJob = async (req, res) => {
//     try {
//         const { jobId } = req.params;
//         const { userId } = req.session; //worker id
//         // console.log("job id", jobId, "user id", userId)
//         if (!jobId || !userId) {
//             return res.status(404).json({ message: "Id missing" })
//         }

//         const { coverLetter, proposedPrice } = req.body
//         // verify job
//         const job = await prisma.job.findUnique({
//             where: {
//                 id: jobId
//             }
//         })
//         if (!job) return res.status(404).json({ message: "Job not found" })

//         // verify if job is not applied by any other 
//         if (job.status !== "OPEN" || job.selectedWorkerId !== null) {
//             return res.status(400).json({ message: "This Job has already been assigned" })
//         }

//         const worker = await prisma.workerProfile.findUnique({
//             where: {
//                 userId: workerId,
//             },
//         });

//         if (!worker.isAvailable) {
//             throw new Error("Worker already assigned to another task");
//         }

//         const application = await prisma.application.create({
//             data: {
//                 jobId,
//                 workerId: userId,
//                 coverLetter: null,
//                 proposedPrice,
//                 status: "PENDING"
//             }
//         })
//         res.status(201).json({ message: "Application successfuly applied", data: application })
//     } catch (error) {
//         console.log("failed at job apply", error)
//         res.status(500).json({ message: "Server error" })
//     }
// };

export const applyToJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { userId } = req.session;

        const { coverLetter, proposedPrice } = req.body
        if (!jobId || !userId) {
            return res.status(404).json({ message: "Ids missing" })
        }

        const userExists = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!userExists) return res.status(400).json({ message: "user doesn't exists" });

        if (userExists.role !== "WORKER") {
            return res.status(401).json({ message: "unauthorized to perform this action" })
        }

        const userProfileExists = await prisma.workerProfile.findUnique({
            where: {
                userId
            }
        })
        if (!userProfileExists) return res.status(400).json({ message: "User Profile not found" });

        const job = await prisma.job.findUnique({
            where: {
                id: jobId
            }
        })
        if (!job) return res.status(404).json({ message: "Job not found" })
        const jobStatus = job.status;
        if (jobStatus !== "OPEN") {
            return res.status(400).json({ message: "Task already closed" })
        }
        // check existing application of the users
        const existingApplication = await prisma.application.findFirst({
            where: {
                jobId,
                workerId: userId
            }
        })
        if (existingApplication) return res.status(400).json({ message: "User already applied to this task" });

        const createApplication = await prisma.application.create({
            data: {
                jobId,
                workerId: userId,
                coverLetter: null,
                proposedPrice,
                status: "PENDING"
            }
        })

        res.status(201).json({ message: "Application created successfully" })
    } catch (error) {
        console.log("Failed to apply to task", error)
    }
}

// function to get the applications applied to the job
export const getJobApplications = async (req, res) => {
    try {
        const { jobId } = req.params;
        console.log("jobId jobApplications", jobId);
        const applications = await prisma.application.findMany({
            where: {
                jobId: jobId
            },
            include: {
                applicant: true,
                job: true,
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


// function that gets all the applications 
export const getAllJobApplications = async (req, res) => {
    try {
        const { userId } = req.session;

        const applications = await prisma.application.findMany({
            where: {
                job: {
                    userId: userId
                }
            },
            include: {
                job: true,
                applicant: true
            }
        })
        res.status(200).json({ data: applications })
    } catch (error) {
        console.log("failed to get all job applications", error)
        res.status(500).json({ message: "Server error" })
    }
};

// function to get applications created by workers
export const getWorkerApplications = async (req, res) => {
    try {
        const { userId } = req.session;
        const applications = await prisma.application.findMany({
            where: {
                workerId: userId
            },
            include: {
                job: true
            }
        })
        res.status(200).json({ data: applications })

    } catch (error) {
        console.log("failed to get worker applications", error)
        res.status(500).json({ message: "Server error" })
    }
};


// function to update the application status 
// export const updateApplicationStatus = async (req, res) => {
//     try {
//         const { id: applicationId, workerId } = req.body

//         if (!applicationId || !workerId) return res.status(404).json({ message: "ids missing" })

//         // find that application exists
//         const application = await prisma.application.findUnique({ where: { id: applicationId } })
//         if (!application) return res.status(404).json({ message: "application not found" })

//         const worker = await prisma.workerProfile.findUnique({
//             where: {
//                 userId: workerId,
//             },
//         });
//         if (!worker) return res.status(404).json({ message: "Worker not found" })


//         if (!worker.isAvailable) {
//             throw new Error("Worker already assigned to another task");
//         }


//         await prisma.$transaction(async (tx) => {

//             await tx.application.update({
//                 where: {
//                     id: applicationId
//                 }, data: {
//                     status: "APPROVED"
//                 }
//             })

//             await tx.workerProfile.update({
//                 where: {
//                     userId: workerId,
//                 },
//                 data: {
//                     isAvailable: false
//                 }
//             })


//         })

//         res.status(200).json({ message: "Status updated successfully" })

//     } catch (error) {
//         console.log("failed to update application status", error)
//         res.status(500).json({ message: "Server error" })
//     }
// };

export const updateApplicationStatus = async (req, res) => {
    try {
        const { id: applicationId } = req.body
        if (!applicationId) {
            return res.status(400).json({
                message: "Application id is required",
            });
        }


        await prisma.$transaction(async (tx) => {
            // Find application
            const application = await tx.application.findUnique({
                where: {
                    id: applicationId,
                },
            });

            if (!application) {
                throw new Error("Application not found");
            }

            if (application.status !== "PENDING") {
                throw new Error("Application already processed");
            }
            // Find job
            const job = await tx.job.findUnique({
                where: {
                    id: application.jobId,
                },
            });
            if (!job) {
                throw new Error("Job not found");
            }

            if (job.status !== "OPEN") {
                throw new Error("Job already assigned");
            }
            // Find worker
            const worker = await tx.workerProfile.findUnique({
                where: {
                    userId: application.workerId,
                },
            });
            if (!worker) {
                throw new Error("Worker not found");
            }
            if (!worker.isAvailable) {
                throw new Error("Worker already assigned");
            }

            // 1. Approve selected application
            await tx.application.update({
                where: {
                    id: applicationId,
                },
                data: {
                    status: "APPROVED",
                },
            });
            // 2. Assign worker to job
            await tx.job.update({
                where: {
                    id: application.jobId,
                },
                data: {
                    // status: "ASSIGNED",
                    selectedWorkerId: application.workerId,
                },
            });

            // 3. Mark worker unavailable
            await tx.workerProfile.update({
                where: {
                    userId: application.workerId,
                },
                data: {
                    isAvailable: false,
                },
            });

            // 4. Reject other applicants for this job
            await tx.application.updateMany({
                where: {
                    jobId: application.jobId,
                    workerId: {
                        not: application.workerId,
                    },
                    status: "PENDING",
                },
                data: {
                    status: "REJECTED",
                },
            });

            // 5. Auto reject worker's other pending applications
            await tx.application.updateMany({
                where: {
                    workerId: application.workerId,
                    status: "PENDING",
                    jobId: {
                        not: application.jobId,
                    },
                },
                data: {
                    // status: "AUTO_REJECTED",
                    status: "REJECTED",

                },
            });
        });
        return res.status(200).json({
            message: "Worker assigned successfully",

        })
    } catch (error) {
        console.log("Failed to update application status")
    }
}


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


