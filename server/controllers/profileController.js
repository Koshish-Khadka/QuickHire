import { prisma } from "../config/prisma";

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(404).json({ message: "userId missing" });
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
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
    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).json({ message: "Failed" });
  }
};
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.session.id;
    const { firstName, lastName, bio, location, phoneNumber } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return res.status(400).json({ message: "User not found" });

    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName,
        lastName,
        phoneNumber,
        bio,
        location,
      },
    });
    res
      .status(200)
      .json({ message: "User updated successfuly", data: updateUser });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).json({ message: "Failed" });
  }
};
export const updatePassword = async (req, res) => {
  try {
    const userId = req.session.id;

    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
      return res.status(404).json({ message: "All Fields are required" });
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "User not found" });
    // verify/ check password
    const verify = await bcrypt.compare(currentPassword, user.password);
    if (!verify) {
      return res.status(400).json({ message: "Password do not match" });
    }

    const newhashedPassword = await bcrypt.hash(newPassword, 10);
    const changePassword = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newhashedPassword,
      },
    });
    res.status(200).json({ message: "Password Update successful" });
  } catch (error) {
    console.error("Failed", error);
    res.status(500).json({ message: "Failed" });
  }
};


export const deleteAccount = async (req, res) => {};
