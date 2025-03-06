import { useNavigate } from "react-router-dom";
import Axios from "../../../middleware/Axios";
import { avatar, VideoImage } from "../../../assets/images";
import { FaHeart, FaPersonBooth } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { useSiteStore } from "../../../context/siteStore";
import { IoIosArrowRoundForward } from "react-icons/io";

const HtmlRenderer = ({ htmlString }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

const PhetCard = ({ course, user, onFavoriteToggle }) => {
  const navigate = useNavigate();
  const toggleFavorite = useSiteStore((store) => store.toggleFavorite);

  return (
    <div className="w-full max-w-[26rem] bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform">
      <div className="relative">
        <img
          src={VideoImage}
          alt={course?.Title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 h-full w-full" />
      </div>
      <div className="p-4">
        <h5 className="text-md text-blue-gray-800">{course?.Title}</h5>
      </div>
      <div className="p-4 border-t border-gray-200 flex gap-2">
        <button
          onClick={() => {
            Axios.post("/api/enroll/course/" + course?.Title);
            navigate(`/phet/${course?.Title}`, { state: { course } });
          }}
          className="font-poppins font-light text-sm bg-black gap-5 items-center flex justify-center text-white w-full py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Start
          <IoIosArrowRoundForward size={24} />
        </button>
      </div>
    </div>
  );
};

export default PhetCard;
