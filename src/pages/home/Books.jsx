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
} from "@material-tailwind/react";
import { ImSpinner10 } from "react-icons/im"; // Importing the spinner icon

const getCategories = (books) => {
  const categories = books.map((book) => book.category.cat_name);
  return [...new Set(categories)]; // Remove duplicates
};

export const Books = () => {
  const [booksData, setBooksData] = useState([]);
  const [categories, setBooksCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchBookData = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const res = await Axios.get("/api/books");
        setBooksData(res.data.Books);
        setBooksCategoryData(res.data.Book_category);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchBookData();
  }, []);

  // Filter books based on selected category and search query
  const filteredBooks = booksData.filter((book) => {
    const matchesCategory = selectedCategory
      ? book.category.cat_name === selectedCategory
      : true;
    const matchesSearch = book.book_title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (catName) => {
    setSelectedCategory(catName);
  };

  const handleOpen = (value) => {
    setOpen(open === value ? null : value);
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-start px-20 pt-32 font-poppins gap-10">
        {/* Sidebar: Search and Filters */}
        <div className="w-[300px] sticky top-[100px]">
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
          <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="py-0 !border-0"
            >
              <Typography variant="small" className="font-medium text-gray-600">
                Categories
              </Typography>
            </AccordionHeader>
            <AccordionBody className="!py-1 px-0.5">
              {categories?.map((category, index) => (
                <div key={index} className="flex justify-between items-center">
                  <Checkbox
                    checked={selectedCategory === category}
                    onChange={() => handleCategoryChange(category)}
                    label={
                      <Typography variant="small" className="font-medium">
                        {category}
                      </Typography>
                    }
                    containerProps={{ className: "-ml-3 py-2" }}
                  />
                </div>
              ))}
            </AccordionBody>
          </Accordion>
        </div>

        {/* Books List */}
        <div className="basis-2/3 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            <div className="flex items-center justify-center w-full h-screen">
              <ImSpinner10 className="animate-spin" size={80} />
            </div>
          ) : filteredBooks?.length === 0 ? (
            <div className="container text-center">
              <img
                src="/path/to/notfound.png"
                alt="No Books Found"
                className="mx-auto"
                style={{ width: "500px" }}
              />
              <h4 className="mt-4 text-xl text-gray-700">No Books Found</h4>
            </div>
          ) : (
            filteredBooks?.map((book) => <BookCard key={book.id} book={book} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;

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
