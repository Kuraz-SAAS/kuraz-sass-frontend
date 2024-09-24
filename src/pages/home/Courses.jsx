import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
  Input,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Checkbox,
} from "@material-tailwind/react";
import Navbar from "../../components/common/home/Navbar";
import CourseCard from "../../components/home/Courses/CourseCard";
import { useSiteStore } from "../../context/siteStore";

// Icon Component for Accordion
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="#9E9E9E"
      className={`${
        id === open ? "rotate-180" : ""
      } h-4 w-4 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

// List Component for Filters
function List({ options, color, check, onChange }) {
  return (
    <div className="flex justify-between items-center">
      <Checkbox
        className="hover:before:opacity-0"
        ripple={false}
        checked={check}
        onChange={onChange}
        label={
          <Typography
            variant="small"
            color={color}
            className="font-medium font-poppins"
          >
            {options[0]}
          </Typography>
        }
        containerProps={{
          className: "-ml-3 py-2",
        }}
      />
      <Typography variant="small" color={color} className="font-medium">
        {options[1]}
      </Typography>
    </div>
  );
}

// Main Component
const CoursesPage = () => {
  // State Variables
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(true); // Open by default
  const [open, setOpen] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // New State for Selected Categories
  const [selectedCategories, setSelectedCategories] = useState([]);

  const user = useSiteStore((store) => store.user);
  const courses = useSiteStore((store) => store.courses);
  const courseCategory = useSiteStore((store) => store.courseCategory);
  const getCourses = useSiteStore((store) => store.getCourses);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCourses();
      } catch (err) {
        setError("Failed to fetch courses. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getCourses]);

  // Handler Functions
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleOpen = (value) => {
    setOpen(open === value ? null : value);
  };

  // New Handler for Category Selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category.category_name)) {
        return prevSelected.filter((c) => c !== category.category_name);
      } else {
        return [...prevSelected, category.category_name];
      }
    });
  };

  // Filtering Courses Based on Search and Selected Categories
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course?.course_title
      ?.toLowerCase()
      .includes(searchKeyword?.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(course?.category?.category_name);
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Navbar />

      <div className="flex flex-col lg:flex-row items-start px-20 pt-32 font-poppins gap-10">
        <div className="w-full lg:w-[400px] sticky top-[100px]">
          <div className="mb-4">
            <Input
              label="Search courses..."
              icon={<i className="fa fa-search text-gray-400" />}
              value={searchKeyword}
              onChange={handleSearchChange}
              className="bg-gray-100 p-2 rounded-md w-full"
            />
          </div>

          <Menu open={true} handler={setIsMenuOpen} placement="bottom-start">
            <MenuHandler>
              <Button className="font-poppins" fullWidth>
                Filter by Category
              </Button>
            </MenuHandler>
            <MenuList className="!w-96">
              {/* Categories Filter */}
              <MenuItem className="!cursor-auto font-poppins">
                {/* Disable default cursor behavior */}
                <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                  <AccordionHeader
                    onClick={() => handleOpen(1)}
                    className="py-0 !border-0"
                  >
                    <Typography
                      variant="small"
                      className="font-medium font-poppins text-gray-600"
                    >
                      Categories
                    </Typography>
                  </AccordionHeader>
                  <AccordionBody className="!py-1 px-0.5">
                    {courseCategory.map((category, index) => (
                      <List
                        key={index}
                        options={[category.category_name, category.count]}
                        color="blue-gray"
                        check={selectedCategories.includes(
                          category.category_name
                        )}
                        onChange={() => handleCategoryChange(category)}
                      />
                    ))}
                  </AccordionBody>
                </Accordion>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>

        <div className="basis-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {isLoading ? (
            <div className="container text-center">
              <p>Loading courses...</p>
            </div>
          ) : error ? (
            <div className="container text-center text-red-500">{error}</div>
          ) : filteredCourses.length === 0 ? (
            <div className="container text-center">
              <img
                src="/path/to/notfound.png"
                alt="No Courses Found"
                className="mx-auto"
                style={{ width: "500px" }}
                loading="lazy"
              />
              <h4 className="mt-4 text-xl text-gray-700">No Course Found</h4>
            </div>
          ) : (
            filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                user={user ? { favorites: user.favorites } : { favorites: [] }}
                // onFavoriteToggle={() => handleFavoriteToggle(course.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
