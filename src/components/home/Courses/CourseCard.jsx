import React from "react";
import { FaHeart } from "react-icons/fa";
import { courseImg } from "../../../assets/test_img";

const CourseCard = ({ course, user, onFavoriteToggle }) => {
  const handleFavoriteToggle = () => {
    onFavoriteToggle(course.id);
  };

  const isFavorite = user && user.favorites.includes(course.id);

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg relative course-card hover:shadow-2xl group">
      <a href={`/course/${course.slug}`}>
        <div className="course-card-header relative">
          <div className="w-full absolute bottom-0 left-0 p-1 bg-gradient-to-r from-white to-transparent">
            <img
              src="/path/to/placeholder-image.png" // Replace with actual image path
              alt="logo"
              className="h-8"
            />
          </div>
          <img
            className="w-full rounded-lg"
            src={courseImg}
            alt={course.title}
          />
        </div>
        <div className="font-poppins">
          <h4 className="text-lg font-bold">{course.title}</h4>
          {user && (
            <button
              onClick={handleFavoriteToggle}
              className="flex items-center"
            >
              <FaHeart color={isFavorite ? "red" : "gray"} />
            </button>
          )}
          <div className="course-instructor-container">
            <div className="course-instructor-image rounded-full">
              <img
                src={
                  course.instructor.image || "/path/to/default-instructor.png"
                }
                // alt={course.instructor.name}
              />
            </div>
            <h5 className="text-md font-normal">{course.instructor.name}</h5>
          </div>
          <div className="font-semibold text-sm underline">
            <span>in</span>
            <a href={`/courses?category=${course.category}`}>
              {course.category}
            </a>
          </div>
          <hr />
        </div>
        <div className="flex justify-end font-poppins">
          <div>
            {course.price ? (
              <p className="current-price">
                {course.currency} {course.discount || course.price}
              </p>
            ) : (
              <p className="current-price">Free</p>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};

export default CourseCard;
