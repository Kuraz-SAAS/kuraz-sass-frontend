import React, { useState, useEffect } from "react";
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
import { debounce } from "lodash"; // Ensure lodash is installed

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

// Sample Data for Filters
const DATA = {
  categories: [
    { name: "Category 1", count: "23", checked: false },
    { name: "Category 2", count: "15", checked: false },
  ],
  priceRanges: [
    { range: "0-100", count: "12", checked: false },
    { range: "100-200", count: "8", checked: false },
    { range: "200-300", count: "5", checked: false },
  ],
  courseLevels: [
    { level: "Beginner", count: "10", checked: false },
    { level: "Intermediate", count: "7", checked: false },
    { level: "Advanced", count: "3", checked: false },
  ],
};

// Main Component
const CoursesPage = () => {
  // State Variables
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(true); // Open by default
  const [open, setOpen] = useState(null);
  const [categories, setCategories] = useState(DATA.categories);
  const [priceRanges, setPriceRanges] = useState(DATA.priceRanges);
  const [courseLevels, setCourseLevels] = useState(DATA.courseLevels);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSiteStore((store) => store.user);
  const courses = useSiteStore((store) => store.courses);
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
    // Search logic is handled in useEffect
  };

  const handleOpen = (value) => {
    setOpen(open === value ? null : value);
  };

  // Generic handler for checkbox changes
  const handleCheckboxChange = (filterType, index) => (e) => {
    e.stopPropagation(); // Prevent Menu from closing
    const updatedFilter = [...filterType];
    updatedFilter[index].checked = e.target.checked;
    // Update the appropriate state
    if (filterType === categories) {
      setCategories(updatedFilter);
    } else if (filterType === priceRanges) {
      setPriceRanges(updatedFilter);
    } else if (filterType === courseLevels) {
      setCourseLevels(updatedFilter);
    }
  };

  // Debounced filtering function
  useEffect(() => {
    const debouncedFilter = debounce(() => {
      // Start with all courses
      let updatedCourses = [...courses];

      // // Filter by search keyword
      // if (searchKeyword.trim() !== "") {
      //   updatedCourses = updatedCourses.filter((course) =>
      //     course.title.toLowerCase().includes(searchKeyword.toLowerCase())
      //   );
      // }

      // Filter by categories
      const selectedCategories = categories
        .filter((category) => category.checked)
        .map((category) => category.name);
      if (selectedCategories.length > 0) {
        updatedCourses = updatedCourses.filter((course) =>
          selectedCategories.includes(course.category)
        );
      }

      // // Filter by price ranges
      // const selectedPriceRanges = priceRanges
      //   .filter((range) => range.checked)
      //   .map((range) => range.range.split("-").map(Number));
      // if (selectedPriceRanges.length > 0) {
      //   updatedCourses = updatedCourses.filter((course) => {
      //     return selectedPriceRanges.some(
      //       ([min, max]) => course.price >= min && course.price <= max
      //     );
      //   });
      // }

      // // Filter by course levels
      // const selectedLevels = courseLevels
      //   .filter((level) => level.checked)
      //   .map((level) => level.level);
      // if (selectedLevels.length > 0) {
      //   updatedCourses = updatedCourses.filter((course) =>
      //     selectedLevels.includes(course.level)
      //   );
      // }

      setFilteredCourses(updatedCourses);
    }, 300); // 300ms debounce

    debouncedFilter();

    return () => {
      debouncedFilter.cancel();
    };
  }, [searchKeyword, categories, priceRanges, courseLevels, courses]);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-start px-20 pt-32 font-poppins gap-10">
        {/* Sidebar: Search and Filters */}
        <div className="w-full lg:w-[400px] sticky top-[100px]">
          {/* Search Bar */}
          <div className="mb-4">
            <Input
              label="Search courses..."
              icon={<i className="fa fa-search text-gray-400" />}
              value={searchKeyword}
              onChange={handleSearchChange}
              className="bg-gray-100 p-2 rounded-md w-full"
            />
          </div>

          {/* Filter Section */}
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
                    {categories.map((category, index) => (
                      <List
                        key={index}
                        options={[category.name, category.count]}
                        color="blue-gray"
                        check={category.checked}
                        onChange={handleCheckboxChange(categories, index)}
                      />
                    ))}
                  </AccordionBody>
                </Accordion>
              </MenuItem>

              {/* Price Range Filter */}
              <MenuItem className="!cursor-auto">
                {/* Disable default cursor behavior */}
                <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                  <AccordionHeader
                    onClick={() => handleOpen(2)}
                    className="py-0 !border-0"
                  >
                    <Typography
                      variant="small"
                      className="font-medium font-poppins text-gray-600"
                    >
                      Price Range
                    </Typography>
                  </AccordionHeader>
                  <AccordionBody>
                    {priceRanges.map((range, index) => (
                      <List
                        key={index}
                        options={[`$${range.range}`, range.count]}
                        color="blue-gray"
                        check={range.checked}
                        onChange={handleCheckboxChange(priceRanges, index)}
                      />
                    ))}
                  </AccordionBody>
                </Accordion>
              </MenuItem>

              {/* Course Levels Filter */}
              <MenuItem className="!cursor-auto">
                {/* Disable default cursor behavior */}
                <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                  <AccordionHeader
                    onClick={() => handleOpen(3)}
                    className="py-0 !border-0"
                  >
                    <Typography
                      variant="small"
                      className="font-medium font-poppins text-gray-600"
                    >
                      Course Levels
                    </Typography>
                  </AccordionHeader>
                  <AccordionBody>
                    {courseLevels.map((level, index) => (
                      <List
                        key={index}
                        options={[level.level, level.count]}
                        color="blue-gray"
                        check={level.checked}
                        onChange={handleCheckboxChange(courseLevels, index)}
                      />
                    ))}
                  </AccordionBody>
                </Accordion>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>

        {/* Courses List */}
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
                user={{ favorites: [1] }} // Replace with actual user data
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
