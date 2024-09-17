import React, { useState } from "react";
import { books } from "../../utils/constants";
import Tabs from "../../components/home/books/Tabs";
import BookCard from "../../components/home/books/BookCard";
import Navbar from "../../components/common/home/Navbar";

const getCategories = (books) => {
  const categories = books.map((book) => book.category.cat_name);
  return [...new Set(categories)]; // Remove duplicates
};

export const Books = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique categories from books
  const categories = getCategories(books).map((cat, index) => ({
    id: index + 1, // Simple ID generation for demo
    name: cat,
  }));

  // Filter books based on selected category and search query
  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory
      ? book.category.cat_name === selectedCategory
      : true;
    const matchesSearch = book.book_title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen gap-10">
        <div className="">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="">
            <Tabs
              categories={categories}
              onCategoryChange={(catName) => setSelectedCategory(catName)}
            />
          </div>
        </div>
        <div className="grid font-poppins grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
