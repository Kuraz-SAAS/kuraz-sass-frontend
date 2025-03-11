import { motion } from "framer-motion";
import { heroAnimation } from "@/assets/lottie";
import Lottie from "react-lottie-player";
import { Button } from "../ui/button";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";

const Hero = ({ toggleShowSignIn }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20, filter: "blur(5px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  };

  const handleGetInContact = ()=>{
    window.location.href = `tel:${+251995454546}`;
  }

  return (
    <motion.div
      className="flex flex-col lg:flex-row justify-center items-center px-4 sm:px-10 lg:px-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-3xl flex flex-col gap-6 sm:gap-10 text-center lg:text-left">
        <motion.div variants={itemVariants}>
          <p className="text-4xl sm:text-5xl lg:text-6xl leading-tight font-bold">
            Enabling the future <span className="text-primary">GENERATION</span>
            .
          </p>
          <p className="mt-4 text-sm sm:text-base">
            Dynamic and inclusive platform nurturing the minds of tomorrow.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          variants={itemVariants}
        >
          <Button onClick={toggleShowSignIn} variant="outline" className="p-5 w-full sm:w-auto">
            Get Started
            <MdOutlineArrowRightAlt className="ml-2" />
          </Button>

          <Button onClick={handleGetInContact} variant="secondary" className="p-5 w-full sm:w-auto">
            <MdOutlineLocalPhone className="mr-2" /> Get in Contact
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="flex max-w-[600px] justify-center mt-10 lg:mt-0"
        variants={itemVariants}
      >
        <Lottie
          loop
          animationData={heroAnimation}
          play
          className="w-60 sm:w-80 md:w-full"
        />
      </motion.div>
    </motion.div>
  );
};

export default Hero;
