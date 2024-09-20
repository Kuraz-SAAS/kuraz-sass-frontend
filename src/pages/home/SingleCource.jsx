import React, { useState } from "react";
import Navbar from "../../components/common/home/Navbar";
import { CourseBannner } from "../../assets/images";
import { courseImg } from "../../assets/test_img";

const SingleCource = () => {
  const [activeTab, setActiveTab] = useState("information");

  return (
    <div>
      <Navbar />
      <div>
        <div
          className="relative bg-cover bg-center text-white font-poppins h-[400px] flex justify-center  items-end gap-56"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(1, 1, 1, 0.5)), url('${CourseBannner}')`,
          }}
        >
          <div className="grid gap-6  p-20">
            <h1 className="text-3xl font-bold ">Introduction To Node.js</h1>
            <div className="grid gap-5">
              <p className="font-light">
                in{" "}
                <span className="underline underline-offset-2">
                  Software Development
                </span>
              </p>
              <p>
                Created By{" "}
                <span className="underline underline-offset-2">
                  Tito Frezer
                </span>
              </p>
              <p>Last Updated: Mar 21, 2023</p>
            </div>
          </div>
          <div>
            <img src={courseImg} alt="" className="w-[400px] rounded-t-lg" />
          </div>
        </div>
        <div className="flex gap-[45px] pb-5 justify-center">
          <div className="w-[700px] font-poppins relative -top-10">
            {/* Tab Navigation */}
            <div className="flex justify-between p-3 rounded-md border-b bg-black text-white border-gray-300">
              <button
                className={`px-4 py-2 font-semibold ${
                  activeTab === "information"
                    ? "text-yellow-500 border-b-2 border-yellow-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("information")}
              >
                Information
              </button>
              <button
                className={`px-4 py-2 font-semibold ${
                  activeTab === "content"
                    ? "text-yellow-500 border-b-2 border-yellow-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("content")}
              >
                Content (5)
              </button>
              <button
                className={`px-4 py-2 font-semibold ${
                  activeTab === "review"
                    ? "text-yellow-500 border-b-2 border-yellow-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("review")}
              >
                Review (3)
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-4">
              {activeTab === "information" && (
                <div>
                  <h2 className="text-lg font-bold">Information</h2>
                  <p>This is the Information section content.</p>
                </div>
              )}
              {activeTab === "content" && (
                <div>
                  <h2 className="text-lg font-bold">Content</h2>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center bg-white shadow-lg p-4 rounded-md">
                      <div>Introduction To Node.js</div>
                      <div>2 Parts</div>
                    </li>
                    <li className="flex justify-between items-center bg-white shadow-lg p-4 rounded-md">
                      <div>Node.js Basics</div>
                      <div>1 Part</div>
                    </li>
                    <li className="flex justify-between items-center bg-white shadow-lg p-4 rounded-md">
                      <div>Using Express.js</div>
                      <div>4 Parts</div>
                    </li>
                    <li className="flex justify-between items-center bg-white shadow-lg p-4 rounded-md">
                      <div>Node.js Auth with MongoDB</div>
                      <div>13 Parts</div>
                    </li>
                  </ul>
                </div>
              )}
              {activeTab === "review" && (
                <div>
                  <h2 className="text-lg font-bold">Review</h2>
                  <p>This is the Review section content.</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white w-[400px] shadow-lg  gap-5 rounded-lg p-6 font-poppins text-center grid">
            {/* Price */}
            <h2 className="text-3xl font-bold text-green-500 ">Birr 179</h2>

            {/* Add to Cart Button */}
            <button className="bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 ">
              Add to Cart
            </button>

            {/* Course Includes */}
            <div className="text-left">
              <h3 className="font-bold text-blue-900 mb-2">Course Includes</h3>
              <ul className="space-y-2 text-gray-600">
                <li>More than 3 hours of on-demand video</li>
                <li>Prior JavaScript knowledge</li>
                <li>Full lifetime access</li>
                <li>Downloadable resources</li>
                <li>Certificate of completion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCource;
