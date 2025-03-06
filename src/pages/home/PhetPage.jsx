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
import { useSiteStore } from "../../context/siteStore";
import { ImSpinner10 } from "react-icons/im";
import { FaGraduationCap } from "react-icons/fa";
import { phetCategory, phetData } from "../../utils/constants";
import PhetCard from "../../components/home/Courses/PhetCard";

// Icon Component for Accordion
function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="#9E9E9E"
            className={`${id === open ? "rotate-180" : ""
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
                        className="font-light font-poppins"
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
const PhetPage = () => {
    // State Variables
    const [searchKeyword, setSearchKeyword] = useState("");
    const [open, setOpen] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const user = useSiteStore((store) => store.user);

    // Handler Functions
    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleOpen = (value) => {
        setOpen(open === value ? null : value);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(category.name)) {
                return prevSelected.filter((c) => c !== category.name);
            } else {
                return [...prevSelected, category.category_name];
            }
        });
    };

    // Filtering Courses Based on Search and Selected Categories
    const filteredCourses = phetData.filter((course) => {
        const matchesSearch = course?.Title
            ?.toLowerCase()
            .includes(searchKeyword?.toLowerCase());
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.includes(course?.category?.Title);
        return matchesSearch && matchesCategory;
    });

    return (
        <div>
            <Navbar />

            <div className="flex flex-col lg:flex-row items-start px-4 lg:px-20 pt-10 lg:pt-32 gap-6 lg:gap-10 font-poppins">
                <div className="w-full lg:w-[300px] mb-4 lg:mb-0 lg:sticky lg:top-[100px]">
                    <div className="mb-4">
                        <Input
                            label="Search courses..."
                            icon={<i className="fa fa-search text-gray-400" />}
                            value={searchKeyword}
                            onChange={handleSearchChange}
                            className="bg-gray-100 p-2 rounded-md w-full"
                        />
                    </div>

                    <Menu open={true} handler={() => { }} placement="bottom-start">
                        <MenuHandler>
                            <Button className="font-poppins w-full font-light ">
                                Filter by Category
                            </Button>
                        </MenuHandler>
                        <MenuList className="w-[300px] ">
                            <MenuItem className="!cursor-auto font-poppins">
                                <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                                    <AccordionHeader
                                        onClick={() => handleOpen(1)}
                                        className="py-0 !border-0"
                                    >
                                        <Typography
                                            variant="small"
                                            className="font-medium font-poppins font-light text-gray-600"
                                        >
                                            Categories
                                        </Typography>
                                    </AccordionHeader>
                                    <AccordionBody className="!py-1 px-0.5">
                                        {phetCategory.map((category, index) => (
                                            <List
                                                key={index}
                                                options={[category.name, category.count]}
                                                color="blue-gray font-light"
                                                check={selectedCategories.includes(
                                                    category.name
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
                {/* {isLoading ? (
          <div className="flex items-center justify-center h-screen w-full">
            <ImSpinner10 className="animate-spin text-primary" size={80} />
          </div>
        ) : */}

                {error ? (
                    <div className="container text-center text-red-500">{error}</div>
                ) : filteredCourses.length === 0 ? (
                    <div className="container text-center w-full">
                        <FaGraduationCap
                            className="mx-auto"
                            style={{ width: "100px", height: "100px", color: "#4A90E2" }}
                        />
                        <h4 className="mt-4 text-xl text-gray-700">No Courses Found</h4>
                    </div>
                ) : (
                    <div className="basis-2/3 grid grid-cols-1 pt-10 lg:pt-0 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 w-full">
                        {filteredCourses.map((course) => (
                            <PhetCard
                                key={course.id}
                                course={course}
                                user={user ? { favorites: user.favorites } : { favorites: [] }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhetPage;
