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

const CourseCard = ({ course, user, onFavoriteToggle }) => {
  const navigate = useNavigate();
  return (
    <Card className="w-full grid gap-5 font-poppins max-w-[26rem] shadow-lg">
      <CardHeader floated={false} color="blue-gray">
        <img src={course?.course_cover} alt="ui/ux review check" />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <IconButton
          size="sm"
          color="red"
          variant="text"
          className="!absolute top-4 right-4 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
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
                <img
                  src={
                    course?.instructor?.instructor_image ||
                    "/path/to/default-instructor.png"
                  }
                  // alt={course.instructor.name}
                  className="w-[50px] h-[50px] rounded-full"
                />
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
