import {
  Box,
  BriefcaseBusiness,
  BrushCleaning,
  HandHelping,
  PaintBucket,
  ToolCase,
  Truck,
} from "lucide-react";

import { motion } from "motion/react";
import { Link } from "react-router-dom";

const Category = () => {
  const jobList = [
    {
      name: "Assembly",
      icon: <Box />,
    },
    {
      name: "Cleaning",
      icon: <BrushCleaning />,
    },
    { name: "Moving", icon: <Truck /> },
    { name: "Home Repair", icon: <ToolCase /> },
    { name: "Outdoor Help", icon: <HandHelping /> },
    { name: "Painting", icon: <PaintBucket /> },
    { name: "Mounting", icon: <BriefcaseBusiness /> },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      x: -60,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="pt-4 max-w-6xl m-auto">
      <motion.div
        className="flex justify-between flex-wrap items-center gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {jobList.map((job, index) => (
          <Link to={'/tasks'}>
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col items-center p-4 transform transition-transform duration-300 hover:scale-105 cursor-pointer hover:bg-green-50 rounded-lg"
            >
            <div className="text-4xl mb-4 bg-green-50 p-4 rounded-full">
              {job.icon}
            </div>

            <h3 className="text-sm font-medium text-gray-500">
              {job.name}
            </h3>
          </motion.div>
            </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default Category;