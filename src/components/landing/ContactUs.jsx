import React from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { MdOutlineArrowRightAlt, MdOutlineLocalPhone } from "react-icons/md";
import Lottie from "react-lottie-player";
import { heroAnimation } from "@/assets/lottie";
import { motion } from "framer-motion";

const ContactUs = ({ toggleShowSignIn }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      message: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data); // Handle form submission
  };

  const handleGetInContact = () => {
    window.location.href = `tel:${+251995454546}`;
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 20, filter: "blur(5px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  };

  return (
    <div className="lg:shadow-xl flex flex-col lg:flex-row justify-between items-center px-4 sm:px-10 lg:px-20 rounded-xl shadow-black p-5 gap-8 lg:gap-0">
      {/* Left Section */}
      <div className="flex flex-col gap-5 w-full lg:w-auto text-center lg:text-left">
        <p className="text-sm sm:text-base">
          Contact us to know more on how we can help your students.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
          <Button onClick={toggleShowSignIn} variant="outline" className="p-5 w-full sm:w-auto">
            Get Started
            <MdOutlineArrowRightAlt className="ml-2" />
          </Button>

          <Button onClick={handleGetInContact} variant="secondary" className="p-5 w-full sm:w-auto">
            <MdOutlineLocalPhone className="mr-2" /> Talk to Sales
          </Button>
        </div>
      </div>

      <motion.div
        className="flex max-w-[250px] justify-center mt-10 lg:mt-0"
        variants={itemVariants}
      >
        <Lottie
          loop
          animationData={heroAnimation}
          play
          className="w-30 hidden md:block md:w-full"
        />
      </motion.div>
      {/* Right Section - Form */}
      {/* <div className="w-full lg:w-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-md mx-auto lg:mx-0"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block font-medium text-gray-700">
                Name
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="name"
                    variant="outline"
                    placeholder="Enter your name"
                  />
                )}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-medium text-gray-700"
              >
                Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                )}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block font-medium text-gray-700"
            >
              Message
            </label>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="message"
                  placeholder="Enter your message"
                />
              )}
            />
          </div>

          <div className="grid">
            <Button variant="outline" type="submit" className="w-full">
              Send Message
            </Button>
          </div>
        </form>
      </div> */}
    </div>
  );
};

export default ContactUs;
