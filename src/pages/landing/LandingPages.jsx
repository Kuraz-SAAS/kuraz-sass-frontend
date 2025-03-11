import { heroBanner } from "@/assets/images";
import ContactUs from "@/components/landing/ContactUs";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import OurServices from "@/components/landing/OurServices";
import { useState } from "react";
import SignIn from "./SignIn";


const LandingPages = () => {

  const [showSignIn, setShowSignIn] = useState(false)

  const toggleShowSignIn = () => {
    setShowSignIn(!showSignIn);
  };

  return (
    <div className="font-poppins ">
      <div
        className="relative bg-cover md:px-10 bg-center h-[90vh] flex flex-col"
        style={{ backgroundImage: `url('${heroBanner}')` }}
      >
        {/* Overlay */}
        <Navbar toggleShowSignIn={toggleShowSignIn}/>
        <Hero toggleShowSignIn={toggleShowSignIn} />
        {showSignIn && (
          <div className="w-full h-screen fixed z-50 rerlative flex justify-center items-center ">
            <div
              onClick={toggleShowSignIn}
              className="fixed bg-opacity-95 z-50 w-full h-screen top-0 left-0 bg-white"
            ></div>
            <div className="relative top- z-50">
              <SignIn className="z-50" />
            </div>
          </div>
        )}
      </div>
      <div id="service" className="">
        <OurServices />
      </div>

      <div className="lg:mt-[30rem] pb-16  lg:px-36">
        <ContactUs toggleShowSignIn={toggleShowSignIn}/>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPages;
