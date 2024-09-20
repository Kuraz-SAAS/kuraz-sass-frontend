import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaPlayCircle } from "react-icons/fa";

const CourseContent = () => {
  const [isOpen, setIsOpen] = useState([true, false, false]);

  const toggleSection = (index) => {
    const newOpen = [...isOpen];
    newOpen[index] = !newOpen[index];
    setIsOpen(newOpen);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Content</h2>

      <section>
        <div
          className="flex justify-between items-center bg-green-200 p-2 rounded"
          onClick={() => toggleSection(0)}
        >
          <h3>Introduction To Laravel</h3>
          {isOpen[0] ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {isOpen[0] && (
          <ul className="ml-4 mt-2 space-y-2">
            <li className="flex items-center space-x-2">
              <FaPlayCircle /> <span>Lecture 1</span>
            </li>
            {/* Add more lectures as needed */}
          </ul>
        )}
      </section>

      <section>
        <div
          className="flex justify-between items-center bg-green-200 p-2 rounded"
          onClick={() => toggleSection(1)}
        >
          <h3>Basics Of Laravel CRUD</h3>
          {isOpen[1] ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {isOpen[1] && (
          <ul className="ml-4 mt-2 space-y-2">
            <li className="flex items-center space-x-2">
              <FaPlayCircle /> <span>Lecture 1</span>
            </li>
            {/* Add more lectures as needed */}
          </ul>
        )}
      </section>

      <section>
        <div
          className="flex justify-between items-center bg-green-200 p-2 rounded"
          onClick={() => toggleSection(2)}
        >
          <h3>Template Customization & DB Design</h3>
          {isOpen[2] ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {isOpen[2] && (
          <ul className="ml-4 mt-2 space-y-2">
            <li className="flex items-center space-x-2">
              <FaPlayCircle /> <span>Lecture 1</span>
            </li>
            {/* Add more lectures as needed */}
          </ul>
        )}
      </section>
    </div>
  );
};

export default CourseContent;
