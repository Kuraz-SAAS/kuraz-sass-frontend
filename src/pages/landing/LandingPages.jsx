import { heroBanner } from "@/assets/images";
import ContactUs from "@/components/landing/ContactUs";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";
import OurServices from "@/components/landing/OurServices";


const LandingPages = () => {
  return (
    <div className="font-poppins ">
      <div
        className="relative bg-cover md:px-10 bg-center h-[90vh] flex flex-col"
        style={{ backgroundImage: `url('${heroBanner}')` }} 
      >
        {/* Overlay */}
        <Navbar />
        <Hero />
      </div>
      <div id="service" className="">
      <OurServices />
      </div>

      <div className="lg:mt-[30rem] pb-16  lg:px-36">
        <ContactUs/>
      </div>

      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default LandingPages;
