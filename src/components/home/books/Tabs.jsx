import React, { useState } from "react";

const Tabs = ({ categories, onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="mb-8 border-b font-poppins border-gray-300">
      <ul className="grid space-x-2 md:space-x-4">
        {categories.map((category) => (
          <li key={category.id} className="flex-1">
            <button
              onClick={() => handleCategoryChange(category.name)}
              className={`w-full p-2 text-xs md:text-base border-b-2 transition-all duration-300 ease-in-out rounded-t-lg ${
                selectedCategory === category.name
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-300"
              }`}
              role="tab"
              aria-controls={category.name}
              aria-selected={selectedCategory === category.name}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
