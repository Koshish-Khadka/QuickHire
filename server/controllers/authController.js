import { prisma } from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Fields missing" });
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // check role
    if (role !== user.role) {
      return res.status(400).json({ message: "Role donot match" });
    }
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
    };
    // generate token later on
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "11h",
    });
    const { password: _, ...userWithoutPassword } = user;
    res
      .status(200)
      .json({ message: "login successful", data: userWithoutPassword, token });
  } catch (error) {
    console.error("Failed to login", error);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const signUp = async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      bio,
      role,
      location,
    } = req.body;

    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !location ||
      !role
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const checkUser = await prisma.user.findUnique({
      where: { email },
    });

    if (checkUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //  Transaction
    const result = await prisma.$transaction(async (tx) => {
      //  Create user
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          phoneNumber,
          bio,
          role,
          location,
        },
      });

      //  If WORKER create profile
      if (role === "WORKER") {
        await tx.workerProfile.create({
          data: {
            userId: user.id,
            skills: "",
            hourlyRate: 0,
            availability: "FULL_TIME",
          },
        });
      }

      return user;
    });

    res.status(201).json({
      message: "User registered successfully",
      user: result,
    });
  } catch (error) {
    console.error("Failed to signup", error);
    res.status(500).json({ message: "Failed to signup user" });
  }
};

export const session = async (req, res) => {
  const session = req.session;
  res.status(200).json({ message: "Auth route works" });
  // res.status(200).json({ user: session });
};
