import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Axios from "../../../middleware/Axios";
import { avatar } from "../../../assets/images";
import { FaHeart } from "react-icons/fa";
import { useSiteStore } from "../../../context/siteStore";

const CourseCard = ({ course, user, onFavoriteToggle }) => {
  const navigate = useNavigate();
  const toggleFavorite = useSiteStore((store) => store.toggleFavorite);

  return (
    <Card className="w-full grid gap-5 font-poppins max-w-[26rem] shadow-lg">
      <CardHeader floated={false} color="blue-gray">
        <img
          src={`https://api.saas.kuraztech.com/storage/CourseThumbnail/${course?.course_cover}`}
          alt={course?.course_cover}
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <IconButton
          size="sm"
          color="red"
          variant="text"
          className="!absolute top-4 right-4 rounded-full"
        >
          {course?.isFavorite ? (
            <FaHeart
              size={24}
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
              size={24}
              className="text-white"
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
        </IconButton>
      </CardHeader>
      <CardBody className="py-0 grid gap-2">
        <div className="flex items-center justify-between">
          <Typography
            variant="h5"
            color="blue-gray"
            className="font-medium font-poppins"
          >
            {course?.course_title}
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal font-poppins"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            Free
          </Typography>
        </div>
        <Typography color="gray" className="font-poppins">
          {course?.course_description?.slice(0, 20)}...
        </Typography>
        <div className="group font-poppins  inline-flex flex-wrap items-center gap-3">
          <div className="flex  items-center gap-3">
            <div className="">
              <div className="course-instructor-image rounded-full">
                <img src={avatar} className="w-[50px]" />
              </div>
            </div>
            <div>
              <h5 className="text-md font-poppins font-normal">
                {course?.instructor?.user?.name}
              </h5>
              <div className="font-semibold text-sm ">
                <span>in </span>
                <a>{course.category?.category_name}</a>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        {course?.isEnrolled === 1 ? (
          <Button
            onClick={() => {
              navigate(`/course/${course?.id}`);
            }}
            size="lg"
            className="font-poppins bg-white text-black"
            fullWidth={true}
          >
            Continue
          </Button>
        ) : (
          <Button
            onClick={() => {
              Axios.post("/api/enroll/course/" + course?.id);
              navigate(`/course/${course?.id}`);
            }}
            size="lg"
            className="font-poppins"
            fullWidth={true}
          >
            Enrole
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
