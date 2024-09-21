import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaEye,
  FaPlayCircle,
} from "react-icons/fa";

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

      {/* Introduction to Laravel */}
      <section>
        <div
          className="flex justify-between items-center bg-gray-200 p-3 rounded cursor-pointer"
          onClick={() => toggleSection(0)}
        >
          <div className="flex items-center space-x-2">
            <FaPlayCircle size={20} />
            <h3 className="font-semibold">Introduction To Laravel</h3>
            <span className="text-sm text-gray-600">(5 Lectures)</span>
          </div>
          {isOpen[0] ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {isOpen[0] && (
          <ul className="ml-6 mt-2 space-y-2">
            <li className="flex justify-between items-center space-x-2">
              <div className="flex items-center space-x-2">
                <FaEye size={18} />
                <span>Welcome To Laravel Course</span>
              </div>
              <span className="text-gray-500">10min</span>
            </li>
            <li className="flex justify-between items-center space-x-2">
              <div className="flex items-center space-x-2">
                <FaEye size={18} />
                <span>Introduction to Laravel</span>
              </div>
              <span className="text-gray-500">10min</span>
            </li>
            <li className="flex justify-between items-center space-x-2">
              <div className="flex items-center space-x-2">
                <FaEye size={18} />
                <span>Why Laravel</span>
              </div>
              <span className="text-gray-500">11min</span>
            </li>
            <li className="flex justify-between items-center space-x-2">
              <div className="flex items-center space-x-2">
                <FaEye size={18} />
                <span>Laravel Setup and Installation</span>
              </div>
              <span className="text-gray-500">25min</span>
            </li>
            <li className="flex justify-between items-center space-x-2">
              <div className="flex items-center space-x-2">
                <FaEye size={18} />
                <span>Laravel Structure</span>
              </div>
              <span className="text-gray-500">16min</span>
            </li>
          </ul>
        )}
      </section>

      {/* Basics of Laravel CRUD */}
      <section>
        <div
          className="flex justify-between items-center bg-gray-200 p-3 rounded cursor-pointer"
          onClick={() => toggleSection(1)}
        >
          <div className="flex items-center space-x-2">
            <FaPlayCircle size={20} />
            <h3 className="font-semibold">Basics Of Laravel CRUD</h3>
            <span className="text-sm text-gray-600">(5 Lectures)</span>
          </div>
          {isOpen[1] ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {isOpen[1] && (
          <ul className="ml-6 mt-2 space-y-2">
            <li className="flex justify-between items-center space-x-2">
              <div className="flex items-center space-x-2">
                <FaEye size={18} />
                <span>Lecture 1</span>
              </div>
              <span className="text-gray-500">Time</span>
            </li>
            {/* Add more lectures as needed */}
          </ul>
        )}
      </section>

      {/* Template Customization & DB Design */}
      <section>
        <div
          className="flex justify-between items-center bg-gray-200 p-3 rounded cursor-pointer"
          onClick={() => toggleSection(2)}
        >
          <div className="flex items-center space-x-2">
            <FaPlayCircle size={20} />
            <h3 className="font-semibold">
              Template Customization & DB Design
            </h3>
            <span className="text-sm text-gray-600">(6 Lectures)</span>
          </div>
          {isOpen[2] ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {isOpen[2] && (
          <ul className="ml-6 mt-2 space-y-2">
            <li className="flex justify-between items-center space-x-2">
              <div className="flex items-center space-x-2">
                <FaEye size={18} />
                <span>Lecture 1</span>
              </div>
              <span className="text-gray-500">Time</span>
            </li>
            {/* Add more lectures as needed */}
          </ul>
        )}
      </section>
    </div>
  );
};

export default CourseContent;
