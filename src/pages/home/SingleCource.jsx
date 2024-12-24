import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/home/Navbar";
import { CourseBannner } from "../../assets/images";
import { courseImg } from "../../assets/test_img";
import { Link, useParams } from "react-router-dom";
import { useSiteStore } from "../../context/siteStore";

const HtmlRenderer = ({ htmlString }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

const SingleCource = () => {
  const [activeTab, setActiveTab] = useState("information");
  const params = useParams();
  const courses = useSiteStore((store) => store.courses);
  const getCourses = useSiteStore((store) => store.getCourses);

  useEffect(() => {
    getCourses();
  }, []);

  const course = courses.find((c) => c.id === parseInt(params.id));

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Format the date
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  console.log(course);
  return (
    <div>
      <Navbar />
      <div>
        <div
          className="relative bg-cover bg-center text-white font-poppins h-[400px] flex justify-center  items-end gap-[330px]"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(1, 1, 1, 0.5)), url('${CourseBannner}')`,
          }}
        >
          <div className="grid gap-6  p-20">
            <h1 className="text-3xl font-bold ">{course?.course_title}</h1>
            <div className="grid gap-5">
              <p className="font-light">
                in{" "}
                <span className="underline underline-offset-2">
                  {course?.category?.category_name}
                </span>
              </p>
              <p>
                Created By{" "}
                <span className="underline underline-offset-2">
                  {course?.instructor?.user?.name}
                </span>
              </p>
              <p>
                Last Updated: {formatDate(course?.instructor?.user?.updated_at)}
              </p>
            </div>
          </div>
          <div>
            <img
              src={course?.course_cover}
              alt=""
              className="w-[400px] rounded-t-lg"
            />
          </div>
        </div>
        <div className="flex gap-[45px] items-start pb-5 justify-center">
          <div className="w-[700px] font-poppins relative -top-10">
            {/* Tab Navigation */}
            <div className="flex justify-between p-3 rounded-md border-b bg-black text-white border-gray-300">
              <button
                className={`px-4 py-2 font-semibold ${
                  activeTab === "information"
                    ? "text-yellow-500 border-b-2 border-yellow-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("information")}
              >
                Information
              </button>
              <button
                className={`px-4 py-2 font-semibold ${
                  activeTab === "content"
                    ? "text-yellow-500 border-b-2 border-yellow-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("content")}
              >
                Content ({course?.course_section?.length})
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-4">
              {activeTab === "information" && (
                <div>
                  <h2 className="text-lg font-bold">Information</h2>
                  <p>
                    <HtmlRenderer htmlString={course?.course_description} />
                  </p>
                </div>
              )}
              {activeTab === "content" && (
                <div>
                  <h2 className="text-lg font-bold">Content</h2>
                  <ul className="space-y-4">
                    {course?.course_section?.map((section, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center bg-white shadow-lg p-4 rounded-md"
                      >
                        <div>{section?.section_title}</div>
                        <div>{section?.videos?.length} Parts</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white w-[400px] shadow-lg  gap-5 rounded-lg p-6 font-poppins text-center grid">
            {/* Price */}
            <h2 className="text-3xl font-bold text-green-500 ">Free</h2>

            {/* Add to Cart Button */}
            <Link
              to={"/course/play/" + course.id}
              className="bg-green-500 text-white rounded-md p-2 font-semibold hover:bg-green-600 "
            >
              Start the Course
            </Link>

            {/* Course Includes */}
            <div className="text-left">
              <h3 className="font-bold text-blue-900 mb-2">Course Includes</h3>
              <ul className="space-y-2 text-gray-600">{course?.overview}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCource;
