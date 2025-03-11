import { Link } from "react-router-dom";
import { kurazLogo } from "../../assets/images";
import { Button } from "../ui/button";
import { FaArrowRightToBracket } from "react-icons/fa6";
import SignIn from "@/pages/landing/SignIn";
import {  useState } from "react";
import SignUp from "@/pages/landing/SignUp";

const Navbar = ({ toggleShowSignIn }) => {
  const [showSignUp, setShowSignUp] = useState(false);

 
  const toggleShowSignUp = ()=>{
    setShowSignUp(!showSignUp);
  }



  const toggleForm = ()=>{
    setShowSignUp(!showSignUp);
  }

  return (
    <div>
      <div className="flex py-8 px-3 gap-10 font-inter justify-between items-center">
        <div>
          <img src={kurazLogo} />
        </div>

        <div className="flex gap-4 items-center">
          <ul className="flex gap-4">
            <Link to={"/"}>Home</Link>
            <a href={"/#service"}>Service</a>
          </ul>
          <Button onClick={toggleShowSignIn} variant="outline">
            <FaArrowRightToBracket />
            <p>Sign In</p>
          </Button>
        </div>
      </div>

      {showSignUp && (
        <div className="w-full fixed z-50 rerlative flex justify-center items-center ">
          <div
            onClick={toggleShowSignUp}
            className="fixed bg-opacity-95 z-50 w-full h-screen top-0 left-0 bg-white"
          ></div>
          <div className="relative top- z-50">
            <SignUp toggleForm={toggleForm} className="z-50" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
