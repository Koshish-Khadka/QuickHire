import { Search, Users, CheckCircle, PartyPopper } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    icon: Search,
    title: "Tell us what you need",
    desc: "Describe your task or browse categories",
  },
  {
    icon: Users,
    title: "Get matched with professionals",
    desc: "Receive quotes from qualified service providers",
  },
  {
    icon: CheckCircle,
    title: "Get things done",
    desc: "Hire the right person for the job",
  },
  {
    icon: PartyPopper,
    title: "Relax and enjoy",
    desc: "Your task is done within hours",
  },
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
    y: -60,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};
const Workflow = () => {
  return (
    <div className="py-22 max-w-6xl mx-auto px-4">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="text-4xl font-bold text-[#1B7B6F] text-center"
      >
        How it Works
      </motion.h2>

      <motion.p
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="text-center text-gray-500 mt-3 max-w-xl mx-auto"
      >
        A simple 4-step process to get your tasks done quickly and efficiently.
      </motion.p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14"
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 text-center hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-[#1B7B6F]/10 text-[#1B7B6F]">
                <Icon size={26} />
              </div>

              <div className="mt-4 text-xs font-semibold text-gray-400">
                STEP {index + 1}
              </div>

              <h3 className="mt-2 text-lg font-semibold text-gray-800">
                {step.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Workflow;
