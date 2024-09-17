import React, { useState, useEffect } from "react";
import { courses as allCourses } from "../../utils/constants"; // Assuming courses are imported here
import CourseCard from "../../components/home/Courses/CourseCard";
import Navbar from "../../components/common/home/Navbar";

const Courses = () => {
  const [courses, setCourses] = useState(allCourses); // Original course list
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [courseLevels, setCourseLevels] = useState([]);

  useEffect(() => {
    // This function should be called whenever the filters or search term changes
    const applyFilters = () => {
      let results = courses;

      // Apply search keyword filter
      if (searchKeyword) {
        results = results.filter((course) =>
          course.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      // Apply category filter
      if (selectedCategories.length > 0) {
        results = results.filter((course) =>
          selectedCategories.includes(course.categoryId)
        );
      }

      // Apply price range filter
      if (priceRange.length > 0) {
        results = results.filter((course) => {
          const price = parseFloat(course.price);
          return priceRange.some((range) => {
            const [min, max] = range.split("-").map(Number);
            return price >= min && (!max || price <= max);
          });
        });
      }

      // Apply course level filter
      if (courseLevels.length > 0) {
        results = results.filter((course) =>
          courseLevels.includes(course.levelId)
        );
      }

      setFilteredCourses(results);
    };

    applyFilters();
  }, [searchKeyword, selectedCategories, priceRange, courseLevels, courses]);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value);
    setSelectedCategories((prev) =>
      e.target.checked
        ? [...prev, categoryId]
        : prev.filter((id) => id !== categoryId)
    );
  };

  const handlePriceChange = (e) => {
    const priceValue = e.target.value;
    setPriceRange((prev) =>
      e.target.checked
        ? [...prev, priceValue]
        : prev.filter((val) => val !== priceValue)
    );
  };

  const handleLevelChange = (e) => {
    const levelId = parseInt(e.target.value);
    setCourseLevels((prev) =>
      e.target.checked
        ? [...prev, levelId]
        : prev.filter((id) => id !== levelId)
    );
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center h-screen px-10 font-poppins gap-10">
        <div className="grid gap-4 w-[400px]">
          {/* Search Bar */}
          <div className="">
            <input
              type="text"
              value={searchKeyword}
              onChange={handleSearchChange}
              className="bg-gray-100 p-2 rounded-md w-full"
              placeholder="Search courses..."
            />
          </div>

          {/* Filter Section */}
          <div className="">
            {/* Categories Filter */}
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Categories</h3>
              <div>
                {/* Example categories, adjust based on your actual categories data */}
                {["Category 1", "Category 2"].map((category, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      value={index + 1}
                      onChange={handleCategoryChange}
                      className="mr-2"
                    />
                    <label>{category}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Price Range</h3>
              <div>
                {["0-100", "100-200", "200-300"].map((range, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      value={range}
                      onChange={handlePriceChange}
                      className="mr-2"
                    />
                    <label>{range}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Levels Filter */}
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Course Levels</h3>
              <div>
                {["Beginner", "Intermediate", "Advanced"].map(
                  (level, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        value={index + 1}
                        onChange={handleLevelChange}
                        className="mr-2"
                      />
                      <label>{level}</label>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Courses List */}
        <div className="basis-2/3 grid  md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.length === 0 ? (
            <div className="container text-center">
              <img
                src="/path/to/notfound.png"
                alt="No Courses Found"
                className="img-fluid"
                style={{ width: "500px" }}
              />
              <h4>No Course Found</h4>
            </div>
          ) : (
            filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                user={{ favorites: [1] }} // Replace with actual user data
                onFavoriteToggle={() => handleFavoriteToggle(course.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
