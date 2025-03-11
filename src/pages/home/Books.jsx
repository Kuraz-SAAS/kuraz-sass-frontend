import React, { useEffect, useState } from "react";
import Axios from "../../middleware/Axios";
import Navbar from "../../components/common/home/Navbar";
import BookCard from "../../components/home/books/BookCard";
import {
  Input,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
  Checkbox,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { ImSpinner10 } from "react-icons/im"; // Importing the spinner icon
import { FaBook, FaGraduationCap } from "react-icons/fa";
import { useSiteStore } from "../../context/siteStore";
import { cacheData, getCachedData } from "@/lib/utils";

const getCategories = (books) => {
  const categories = books.map((book) => book.category.cat_name);
  return [...new Set(categories)];
};

export const Books = () => {
  const booksData = useSiteStore((store) => store.books);
  const categories = useSiteStore((store) => store.bookCategory);
  const [selectedCategories, setSelectedCategories] = useState([]); // Changed to array for multi-select
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(null);
  const getBooks = useSiteStore((store) => store.getBooks);
  const setBooks = useSiteStore((store) => store.setBooks);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Filter books based on selected categories and search query
  const filteredBooks = booksData.filter((book) => {
    const matchesCategory = selectedCategories.length > 0
      ? selectedCategories.includes(book.book_category?.category_name)
      : true;
    const matchesSearch = book.book_title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (catName) => {
    setSelectedCategories((prev) =>
      prev.includes(catName)
        ? prev.filter((cat) => cat !== catName) // Remove category if already selected
        : [...prev, catName] // Add category if not selected
    );
  };

  const handleOpen = (value) => {
    setOpen(open === value ? null : value);
  };

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      const cachedBooks = await getCachedData("allBooks", "books");
      if (cachedBooks) {
        setBooks(cachedBooks);
        setIsLoading(false);
      }

      const freshBooks = await getBooks();
      if (freshBooks) {
        setBooks(freshBooks);
        await cacheData("allBooks", freshBooks, "books");
        setIsLoading(false);
      } else {
        console.error("Failed to fetch fresh books.");
      }
    };

    loadCourses();
  }, [getBooks, setBooks]); // Added dependencies to re-run effect if necessary

  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row items-start px-5 lg:px-20 pt-24 lg:pt-32 font-poppins gap-10">
        {/* Sidebar: Search and Filters */}
        <div className="w-full lg:w-[300px] lg:sticky top-[100px] mb-8 lg:mb-0">
          {/* Search Bar */}
          <div className="mb-4">
            <Input
              label="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-100 p-2 rounded-md w-full"
            />
          </div>

          {/* Filter Section */}
          <Menu open={true} handler={() => { }} placement="bottom-start">
            <MenuHandler>
              <Button className="font-poppins w-full font-light">Filter by Category</Button>
            </MenuHandler>
            <MenuList className="w-[300px]">
              <MenuItem className="!cursor-auto font-poppins">
                <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                  <AccordionHeader onClick={() => handleOpen(1)} className="py-0 !border-0">
                    <Typography variant="small" className="font-medium font-poppins font-light text-gray-600">
                      Categories
                    </Typography>
                  </AccordionHeader>
                  <AccordionBody className="!py-1 px-0.5">
                    {categories?.map((category, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <Checkbox
                          checked={selectedCategories.includes(category.category_name)}
                          onChange={() =>
                            handleCategoryChange(category.category_name)
                          }
                          label={
                            <Typography variant="small" className="font-medium">
                              {category.category_name}
                            </Typography>
                          }
                          containerProps={{ className: "-ml-3 py-2" }}
                        />
                      </div>
                    ))}
                  </AccordionBody>
                </Accordion>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-screen w-full">
            <ImSpinner10 className="animate-spin text-primary" size={80} />
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="container text-center w-full">
            <FaGraduationCap className="mx-auto" style={{ width: "100px", height: "100px", color: "#4A90E2" }} />
            <h4 className="mt-4 text-xl text-gray-700">No Books Found</h4>
          </div>
        ) : (
          <div className="basis-2/3 flex flex-wrap gap-10 w-full">
            {filteredBooks?.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;

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