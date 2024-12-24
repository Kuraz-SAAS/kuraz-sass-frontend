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

const CourseCard = ({ course, user, onFavoriteToggle }) => {
  const navigate = useNavigate();
  const toggleFavorite = useSiteStore((store) => store.toggleFavorite);

  return (
    <div className="w-full max-w-[26rem] bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform">
      <div className="relative">
        <img
          src={VideoImage}
          alt={course?.course_title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 h-full w-full" />
      </div>
      <div className="p-4">
        <h5 className="font-semibold text-md text-blue-gray-800">
          {course?.course_title}
        </h5>
        <p className="text-gray-600 mt-1 text-sm">
          <HtmlRenderer htmlString={course?.course_description?.slice(0, 50)} />
          {/* {course?.course_description?.slice(0, 50)}... */}
        </p>
        <div className="flex items-center mt-3">
          <div className="course-instructor-image rounded-full overflow-hidden">
            <GoPerson size={24} />
          </div>
          <div className="ml-3">
            <h5 className="text-xs font-medium ">
              {course?.instructor?.user?.name}
            </h5>
            <div className="font-semibold text-xs text-gray-500">
              <span>in </span>
              <a className="text-blue-600 text-xs hover:underline">
                {course.category?.category_name}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200 flex gap-2">
        {course?.isEnrolled === 1 ? (
          <button
            onClick={() => {
              navigate(`/course/${course?.id}`);
            }}
            className="font-poppins bg-blue-600 gap-5 flex items-center justify-center text-white w-full py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue
            <IoIosArrowRoundForward size={24} />
          </button>
        ) : (
          <button
            onClick={() => {
              Axios.post("/api/enroll/course/" + course?.id);
              navigate(`/course/${course?.id}`);
            }}
            className="font-poppins bg-black gap-5 items-center flex justify-center text-white w-full py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Enroll
            <IoIosArrowRoundForward size={24} />
          </button>
        )}
        <button className="bg-black p-2 rounded-lg">
          {course?.isFavorite ? (
            <FaHeart
              size={20}
              className="text-white"
              onClick={async () => {
                toggleFavorite(course?.id);
                await Axios.post(
                  "/api/course/set-favorite-status/" + course.id,
                  {
                    course_id: course.id,
                    status: 0,
                  }
                );
              }}
            />
          ) : (
            <FaHeart
              size={20}
              className="text-red-500"
              onClick={async () => {
                toggleFavorite(course?.id);
                await Axios.post(
                  "/api/course/set-favorite-status/" + course.id,
                  {
                    course_id: course.id,
                    status: 1,
                  }
                );
              }}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
