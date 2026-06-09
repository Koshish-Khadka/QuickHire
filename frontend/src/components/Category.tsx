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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

  // const containerVariants = {
  //   hidden: {},
  //   visible: {
  //     transition: {
  //       staggerChildren: 0.15,
  //     },
  //   },
  // };

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
      <div className="pb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-center pt-8 font-bold text-slate-800 leading-tight">
          <span className="block">Get help from local</span>

          <span className="block mt-2 text-[#1B7B6F]">professionals</span>
        </h2>
        <h3 className="text-3xl font-bold border-b-2 border-b-[#1B7B6F] w-fit mt-8">
          Services
        </h3>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {jobList.map((_, index) => (
            <CarouselItem key={index} className="basis-1/3 lg:basis-1/5">
              <div className="p-1">
                <Link to={`/tasks?category=${_.name}`}>
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex flex-col items-center p-4 transform transition-transform duration-300 hover:scale-105 cursor-pointer hover:bg-green-100 rounded-lg"
                  >
                    <div className="text-4xl mb-4 bg-green-50 p-4 rounded-full">
                      {_.icon}
                    </div>

                    <h3 className="text-sm font-medium text-gray-500">
                      {_.name}
                    </h3>
                  </motion.div>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Category;
