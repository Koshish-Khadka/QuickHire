export const createProfile = async (req, res) => {
  try {
    const { skills, hourlyRate, availability } = req.body;
    if (!skills || !hourlyRate || !availability) {
      return res.status(400).json({ message: "All fields are required" });
    }
  } catch (error) {
    console.error("Failed to craete profile", error);
    res.status(500).json({ message: "Failed to create profile" });
  }
};
