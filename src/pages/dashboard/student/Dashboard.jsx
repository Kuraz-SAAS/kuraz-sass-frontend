import React from 'react';
import Slider from '../../../components/common/dashboard/Slider'; // Adjust the path if needed
import { AiOutlineFileText } from 'react-icons/ai'; // Replace with your desired icons

const Dashboard = () => {
  return (
    <section className="w-full">
      <div className="px-20 py-10 font-poppins">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {/* Total Course Card */}
          <div className="bg-green-500 text-white rounded-lg shadow p-8">
            <div className="text-4xl font-bold">0</div>
            <div className="mt-2 flex items-center">
              <span>Total Course</span>
              <AiOutlineFileText className="ml-2 w-5 h-5" />
            </div>
          </div>

          {/* OnGoing Course Card */}
          <div className="bg-green-500 text-white rounded-lg shadow p-8">
            <div className="text-4xl font-bold">0</div>
            <div className="mt-2 flex items-center">
              <span>OnGoing Course</span>
              <AiOutlineFileText className="ml-2 w-5 h-5" />
            </div>
          </div>

          {/* Completed Course Card */}
          <div className="bg-green-500 text-white rounded-lg shadow p-8">
            <div className="text-4xl font-bold">0</div>
            <div className="mt-2 flex items-center">
              <span>Completed Course</span>
              <AiOutlineFileText className="ml-2 w-5 h-5" />
            </div>
          </div>

          {/* Saved Courses Card */}
          <div className="bg-green-500 text-white rounded-lg shadow p-8">
            <div className="text-4xl font-bold">0</div>
            <div className="mt-2 flex items-center">
              <span>Saved Courses</span>
              <AiOutlineFileText className="ml-2 w-5 h-5" />
            </div>
          </div>

          {/* Books Card */}
          <div className="bg-green-500 text-white rounded-lg shadow p-8">
            <div className="text-4xl font-bold">0</div>
            <div className="mt-2 flex items-center">
              <span>Books</span>
              <AiOutlineFileText className="ml-2 w-5 h-5" />
            </div>
          </div>

          {/* School's Resources Card */}
          <div className="bg-green-500 text-white rounded-lg shadow p-8">
            <div className="text-4xl font-bold">0</div>
            <div className="mt-2 flex items-center">
              <span>School's Resources</span>
              <AiOutlineFileText className="ml-2 w-5 h-5" />
            </div>
          </div>

          {/* Custom Slider Component */}
          <div className="col-span-2">
            <Slider />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 p-4">
          {/* Recent Activities Section */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow p-4">
            <h2 className="text-green-700 font-semibold mb-2">RECENT ACTIVITIES</h2>
            <div className="border-t pt-2 text-gray-600">
              No Activity Recorded Yet
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
