import { motion } from "framer-motion";
import {
  Exam,
  PinImg,
  Reporting,
  ResourcesManagement,
  serviceBanner,
  SkillBuilding,
} from "@/assets/images";
import React from "react";
import OurServiceCard from "./OurServiceCard";

const OurServices = () => {
  const OurServiceData = [
    {
      number: "01",
      title: "Advanced Reporting & Analytics",
      image: Reporting,
      description:
        "Gain insights into student performance & resource usage with our comprehensive reporting tools.",
      resources: [
        "Performance Reports",
        "Resource Analytics",
        "Custom Dashboards",
      ],
    },
    {
      number: "02",
      title: "Skill Building Content for Students",
      image: SkillBuilding,
      description:
        "Our platform comes equipped with a vast library of curated content designed to help students upscale their skills.",
      resources: [
        "Interactive Lessons",
        "Skill-Based Learning Paths",
        "Quizzes & Challenges",
      ],
    },
    {
      number: "03",
      title: "Seamless Exam Management",
      image: Exam,
      description:
        "Conducting exams has never been more efficient. We provide a secure way to administer online & offline assessments.",
      resources: [
        "Create Exams",
        "Automated Grading",
        "Student Progress Tracking",
        "Proctored Exams",
      ],
    },
    {
      number: "04",
      title: "Resource Management",
      image: ResourcesManagement,
      description:
        "With our platform, schools can organize & distribute all their teaching materials in a central hub.",
      resources: [
        "Exam Worksheets",
        "Books & E-books",
        "Multimedia Resources",
        "Custom Resources",
      ],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="h-auto lg:h-screen relative">
      <div
        className="bg-black relative bg-cover bg-center h-auto lg:h-screen"
        style={{ backgroundImage: `url('${serviceBanner}')` }}
      >
        {/* Heading Section */}
        <motion.div
          className="flex justify-center items-center flex-col gap-2 pt-20 lg:pt-0 lg:relative lg:-top-[3rem]"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.img
            src={PinImg}
            className="w-[3rem] lg:w-[4rem]"
            variants={itemVariants}
          />
          <motion.h1
            className="text-2xl lg:text-3xl font-bold text-secondary"
            variants={itemVariants}
          >
            Our Services
          </motion.h1>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {OurServiceData.map((data, index) => (
            <motion.div key={index} variants={itemVariants}>
              <OurServiceCard data={data} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default OurServices;
