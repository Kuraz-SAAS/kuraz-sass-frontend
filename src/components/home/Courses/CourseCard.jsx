import { useNavigate } from "react-router-dom";
import Axios from "../../../middleware/Axios";
import { useEffect, useState, useRef } from "react";
import { FaHeart } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useSiteStore } from "../../../context/siteStore";
import { placeHolder } from "@/assets/images";
import { cacheData, getCachedData } from "@/lib/utils";

const HtmlRenderer = ({ htmlString }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

const CourseCard = ({ course, user }) => {
  const navigate = useNavigate();
  const toggleFavorite = useSiteStore((store) => store.toggleFavorite);

  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!course) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  useEffect(() => {
    if (isVisible && !thumbnailUrl) {
      const fetchThumbnail = async () => {
        const cachedImage = await getCachedData(course.id, "thumbnails");
        if (cachedImage) {
          setThumbnailUrl(URL.createObjectURL(cachedImage));
          return;
        }

        try {
          const response = await Axios.get(`/api/getThumbnail/${course.id}`, {
            responseType: "blob",
          });
          const imageUrl = URL.createObjectURL(response.data);
          setThumbnailUrl(imageUrl);
          await cacheData(course.id, response.data, "thumbnails");
        } catch (error) {
          console.error("Error fetching course thumbnail:", error);
        }
      };

      fetchThumbnail();
    }
  }, [isVisible, course, thumbnailUrl]);

  return (
    <div
      ref={cardRef}
      className="w-full max-w-[26rem] bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform"
    >
      <div className="relative">
        <img
          src={thumbnailUrl || placeHolder}
          alt={course?.course_title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h5 className="text-md text-blue-gray-800">{course?.course_title}</h5>
        <p className="text-gray-600 mt-1 text-xs font-light">
          <HtmlRenderer htmlString={course?.course_description?.slice(0, 40)} />
        </p>
        <div className="flex items-center mt-3">
          <div className="course-instructor-image rounded-full overflow-hidden">
            <GoPerson size={24} />
          </div>
          <div className="ml-3">
            <h5 className="text-xs font-light">{course?.instructor?.user?.name}</h5>
            <div className="font-light text-xs text-gray-500">
              <span>in </span>
              <a className="text-blue-600 text-xs hover:underline">
                {course?.category?.category_name}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200 flex gap-2">
        {course?.isEnrolled === 1 ? (
          <button
            onClick={() => navigate(`/course/${course?.id}`)}
            className="font-poppins font-light text-sm bg-blue-600 gap-5 flex items-center justify-center text-white w-full py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue <IoIosArrowRoundForward size={24} />
          </button>
        ) : (
          <button
            onClick={async () => {
              await Axios.post(`/api/enroll/course/${course?.id}`);
              navigate(`/course/${course?.id}`);
            }}
            className="font-poppins font-light text-sm bg-black gap-5 items-center flex justify-center text-white w-full py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Enroll <IoIosArrowRoundForward size={24} />
          </button>
        )}
        <button className="bg-black p-2 rounded-lg">
          {course?.isFavorite ? (
            <FaHeart
              size={20}
              className="text-white"
              onClick={async () => {
                toggleFavorite(course?.id);
                await Axios.post(`/api/course/set-favorite-status/${course.id}`, {
                  course_id: course.id,
                  status: 0,
                });
              }}
            />
          ) : (
            <FaHeart
              size={20}
              className="text-red-500"
              onClick={async () => {
                toggleFavorite(course?.id);
                await Axios.post(`/api/course/set-favorite-status/${course.id}`, {
                  course_id: course.id,
                  status: 1,
                });
              }}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
