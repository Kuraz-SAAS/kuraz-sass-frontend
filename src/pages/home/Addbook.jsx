import React, { useState } from "react";
import Axios from "../../middleware/Axios";

const Addbook = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to hold the title and file
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      // Make the POST request to your backend
      const response = await Axios.post("/api/addBook", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Book added successfully:", response.data);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Add a New Book
        </h2>

        {/* Title Input */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Book Title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter book title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* File Input */}
        <div className="mb-6">
          <label
            htmlFor="file"
            className="block text-gray-700 font-medium mb-2"
          >
            Upload Book File
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default Addbook;
