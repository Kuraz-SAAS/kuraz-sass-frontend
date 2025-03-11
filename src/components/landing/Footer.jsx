import { WhiteLogo } from "@/assets/images";
import { BsInstagram, BsLinkedin, BsTwitterX, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black text-white py-8 px-4 sm:px-8 lg:px-20">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
        {/* Logo Section */}
        <div className="flex justify-center lg:justify-start">
          <img
            src={WhiteLogo}
            alt="Kuraztech Logo"
            className="w-32 sm:w-40 lg:w-48"
          />
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col items-center lg:items-start gap-4">
          <p className="text-lg sm:text-xl">@Kuraztech</p>
          <ul>
            <li className="flex gap-4">
              <a href="#" aria-label="LinkedIn">
                <FaFacebook
                  size={24}
                  className="hover:text-gray-400 transition-colors"
                />
              </a>
              <a href="#" aria-label="LinkedIn">
                <BsLinkedin
                  size={24}
                  className="hover:text-gray-400 transition-colors"
                />
              </a>
              <a href="#" aria-label="Instagram">
                <BsInstagram
                  size={24}
                  className="hover:text-gray-400 transition-colors"
                />
              </a>
              <a href="#" aria-label="YouTube">
                <BsYoutube
                  size={24}
                  className="hover:text-gray-400 transition-colors"
                />
              </a>
              <a href="#" aria-label="Twitter">
                <BsTwitterX
                  size={24}
                  className="hover:text-gray-400 transition-colors"
                />
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div className="text-center lg:text-right">
          <p className="text-base sm:text-lg">info@kuraztech.com</p>
          <p className="text-base sm:text-lg">+251 995 45 45 46</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
