import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import Axios from "../../../middleware/Axios";
import CustomPagination from "../CustomPagination";
import { MdAdd } from "react-icons/md";

const StudentDatatable = ({ datas, headers, actions }) => {
  const [searchValue, setSearchValue] = useState();
  const [dataList, setDataList] = useState([...datas]);
  const [rowsLimit] = useState(8);
  const [rowsToShow, setRowsToShow] = useState(dataList?.slice(0, rowsLimit));
  const [customPagination, setCustomPagination] = useState([]);
  const [activeColumn, setActiveColumn] = useState(["Price"]);
  const [sortingColumn, setSortingColumn] = useState(["Price"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
  });
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [excelFile, setExcelFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [csvData, setCsvData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingChunks, setProcessingChunks] = useState([]);
  const [completedChunks, setCompletedChunks] = useState([]);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const CHUNK_SIZE = 50;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // or whatever number you want

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = pageNumber * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setRowsToShow(dataList.slice(startIndex, endIndex));
  };

  function searchProducts(keyword) {
    keyword = keyword.toLowerCase();
    setSearchValue(keyword);
    if (!keyword == "") {
      const results = dataList.filter((student) => {
        return (
          student.name.toLowerCase().includes(keyword) ||
          student.email.toLowerCase().includes(keyword) ||
          student.user_type.toLowerCase().includes(keyword) ||
          student?.tenant?.domain_name.toLowerCase().includes(keyword)
        );
      });
      setDataList(results);
      setRowsToShow(results?.slice(0, rowsLimit));
      setCurrentPage(0);
      // setTotalPage(Math.ceil(results?.length / rowsLimit));
      // setCustomPagination(
      //   Array(Math.ceil(results?.length / rowsLimit)).fill(null)
      // );
    } else {
      clearData();
    }
  }
  const clearData = () => {
    setSearchValue("");
    const sortedProducts = datas?.slice().sort((a, b) => a.Price - b.Price);
    setDataList(sortedProducts);
    setRowsToShow(sortedProducts?.slice(0, rowsLimit));
    setCustomPagination(Array(Math.ceil(datas?.length / rowsLimit)).fill(null));
    // setTotalPage(Math.ceil(datas?.length / rowsLimit));
  };
  // const sortByColumn = (column, changeSortingColumn = true) => {
  //   if (column != "Price") {
  //     if (sortingColumn?.includes(column) && changeSortingColumn) {
  //       const sortData = dataList
  //         ?.slice()
  //         .sort((a, b) =>
  //           b[column].toString().localeCompare(a[column].toString())
  //         );
  //       setRowsToShow(
  //         sortData?.slice(
  //           currentPage * rowsLimit,
  //           (currentPage + 1) * rowsLimit
  //         )
  //       );
  //       if (changeSortingColumn) {
  //         setSortingColumn([]);
  //         setDataList(sortData);
  //       }
  //     } else {
  //       const sortData = dataList
  //         ?.slice()
  //         .sort((a, b) =>
  //           a[column].toString().localeCompare(b[column].toString())
  //         );
  //       setRowsToShow(
  //         sortData?.slice(
  //           currentPage * rowsLimit,
  //           (currentPage + 1) * rowsLimit
  //         )
  //       );
  //       if (changeSortingColumn) {
  //         setDataList(sortData);
  //         setSortingColumn([`${column}`]);
  //       }
  //     }
  //   } else {
  //     if (sortingColumn?.includes(column)) {
  //       const sortedProducts = dataList
  //         ?.slice()
  //         .sort((a, b) => b.Price - a.Price);
  //       setRowsToShow(
  //         sortedProducts?.slice(
  //           currentPage * rowsLimit,
  //           (currentPage + 1) * rowsLimit
  //         )
  //       );
  //       if (changeSortingColumn) {
  //         setSortingColumn([]);
  //         setDataList(sortedProducts);
  //       }
  //     } else {
  //       const sortedProducts = dataList
  //         ?.slice()
  //         .sort((a, b) => a.Price - b.Price);
  //       setRowsToShow(
  //         sortedProducts?.slice(
  //           currentPage * rowsLimit,
  //           (currentPage + 1) * rowsLimit
  //         )
  //       );
  //       if (changeSortingColumn) {
  //         setSortingColumn([`${column}`]);
  //         setDataList(sortedProducts);
  //       }
  //     }
  //   }
  //   setActiveColumn([`${column}`]);
  //   // setCurrentPage(0);
  // };
  // const nextPage = () => {
  //   const startIndex = rowsLimit * (currentPage + 1);
  //   const endIndex = startIndex + rowsLimit;
  //   const newArray = datas?.slice(startIndex, endIndex);
  //   setRowsToShow(newArray);
  //   setCurrentPage(currentPage + 1);
  // };
  // const changePage = (value) => {
  //   const startIndex = value * rowsLimit;
  //   const endIndex = startIndex + rowsLimit;
  //   const newArray = datas?.slice(startIndex, endIndex);
  //   setRowsToShow(newArray);
  //   setCurrentPage(value);
  // };
  // const previousPage = () => {
  //   const startIndex = (currentPage - 1) * rowsLimit;
  //   const endIndex = startIndex + rowsLimit;
  //   const newArray = datas?.slice(startIndex, endIndex);
  //   setRowsToShow(newArray);
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   } else {
  //     setCurrentPage(0);
  //   }
  // };
  useMemo(() => {
    setCustomPagination(
      Array(Math.ceil(dataList?.length / rowsLimit)).fill(null)
    );
  }, []);

  useEffect(() => {
    const sortedProducts = datas?.slice().sort((a, b) => a.Price - b.Price);
    setDataList(sortedProducts);
    setRowsToShow(sortedProducts?.slice(0, rowsLimit));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await Axios.post("/api/student/register", newStudent);

      if (response.data) {
        // Add the new student to the local data
        setDataList([...dataList, response.data.user]);
        setRowsToShow([...rowsToShow, response.data.user].slice(0, rowsLimit));

        // Show success message
        toast.success("Student added successfully!");

        // Close modal and reset form
        setIsModalOpen(false);
        setNewStudent({ first_name: "", last_name: "" });
      }
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error(error.response?.data?.message || "Failed to add student");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExcelUpload = async (e) => {
    e.preventDefault();
    if (!excelFile) return;

    setIsProcessing(true);

    try {
      const reader = new FileReader();

      reader.onload = async (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        // Split data into chunks
        const chunks = [];
        for (let i = 0; i < data.length; i += CHUNK_SIZE) {
          chunks.push(data.slice(i, i + CHUNK_SIZE));
        }

        setTotalChunks(chunks.length);
        setProcessingChunks(chunks.map((_, index) => index));
        setCompletedChunks([]);

        // Process chunks sequentially
        for (let i = 0; i < chunks.length; i++) {
          setCurrentChunk(i);
          try {
            const response = await Axios.post("/api/students/import", {
              students: chunks[i],
            });

            setCompletedChunks((prev) => [...prev, i]);
            setProcessingChunks((prev) => prev.filter((chunk) => chunk !== i));
          } catch (error) {
            console.error(`Error processing chunk ${i}:`, error);
            toast.error(`Failed to process chunk ${i + 1}`);
          }
        }

        // Set processing to false when complete
        setIsProcessing(false);
        toast.success("File import completed successfully!");
      };

      reader.readAsBinaryString(excelFile);
    } catch (error) {
      console.error("Error reading file:", error);
      toast.error("Failed to read file");
      setIsProcessing(false);
    }
  };

  const ChunkProgress = () => {
    return (
      <div className="mt-4">
        <div className="text-sm font-medium text-gray-700 mb-2">
          Processing Progress: {completedChunks.length} / {totalChunks} chunks
        </div>
        <div className="grid grid-cols-10 gap-2">
          {Array.from({ length: totalChunks }).map((_, index) => (
            <div key={index} className="relative group">
              {completedChunks.includes(index) ? (
                <div className="bg-green-100 p-2 rounded-lg">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              ) : processingChunks.includes(index) ? (
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <svg
                    className="w-5 h-5 text-yellow-500 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
              ) : (
                <div className="bg-gray-100 p-2 rounded-lg">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              )}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  Chunk {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-4 bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{
              width: `${(completedChunks.length / totalChunks) * 100}%`,
            }}
          ></div>
        </div>

        {/* Progress details */}
        <div className="mt-2 text-sm text-gray-600">
          {isProcessing ? (
            <span>
              Processing chunk {currentChunk + 1} of {totalChunks}...
            </span>
          ) : completedChunks.length === totalChunks ? (
            <span className="text-green-600">Processing complete!</span>
          ) : (
            <span>Ready to process</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-7xl px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gray-200 flex justify-between items-center p-4 border-b border-gray-300">
            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-sm flex items-center gap-2 font-light text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <MdAdd />
                Add Student
              </button>
              <button
                onClick={() => setIsExcelModalOpen(true)}
                className="bg-primary font-light text-sm flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                <MdAdd />
                Import Excel
              </button>
            </div>
            <div className="flex items-center bg-white border rounded-full shadow-sm">
              <input
                type="text"
                className="py-2 px-4 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
                onChange={(e) => searchProducts(e.target.value)}
                value={searchValue}
              />
              <button
                className={`p-2 rounded-full ${
                  searchValue
                    ? "text-gray-500 hover:text-gray-700"
                    : "text-transparent"
                }`}
                onClick={clearData}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 110 16A8 8 0 0112 4zm4.7 10.3l-1.4 1.4L12 13.4l-3.3 3.3-1.4-1.4L10.6 12 7.3 8.7l1.4-1.4L12 10.6l3.3-3.3 1.4 1.4L13.4 12l3.3 3.3z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort(header)}
                    >
                      <div className="flex items-center gap-2">
                        {header}
                        {/* Add sort indicators here if needed */}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rowsToShow?.map((student, index) => (
                  <tr
                    key={student.user_id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.user_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {student.user_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student?.tenant?.domain_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            <div className="flex items-center">
              <span className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {currentPage * rowsLimit + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min((currentPage + 1) * rowsLimit, dataList?.length)}
                </span>{" "}
                of <span className="font-medium">{dataList?.length}</span>{" "}
                results
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md 
                  ${
                    currentPage === 0
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Previous
              </button>

              {Array.from({
                length: Math.min(5, Math.ceil(dataList?.length / itemsPerPage)),
              }).map((_, idx) => {
                const pageNumber = currentPage - 2 + idx;
                if (
                  pageNumber < 0 ||
                  pageNumber >= Math.ceil(dataList?.length / itemsPerPage)
                )
                  return null;

                return (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                      ${
                        currentPage === pageNumber
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {pageNumber + 1}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage >= Math.ceil(dataList?.length / itemsPerPage) - 1
                }
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                  ${
                    currentPage >=
                    Math.ceil(dataList?.length / itemsPerPage) - 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Next
              </button>
            </div>
          </div>
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                className="fixed inset-0 z-50 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Overlay */}
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsModalOpen(false)}
                />

                {/* Modal content */}
                <div className="flex min-h-screen z-30 relative items-center justify-center p-4">
                  <motion.div
                    className="bg-white p-8 rounded-lg w-96 shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{
                      type: "spring",
                      duration: 0.3,
                      delay: 0.15, // Delay the modal content animation
                      bounce: 0.25, // Reduce the bounce effect slightly
                    }}
                  >
                    <motion.h2
                      className="text-xl font-bold mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }} // Further delay the title
                    >
                      Add New Student
                    </motion.h2>
                    <motion.form
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }} // Delay the form content even more
                      className="space-y-4"
                    >
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={newStudent.first_name}
                          onChange={(e) =>
                            setNewStudent({
                              ...newStudent,
                              first_name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={newStudent.last_name}
                          onChange={(e) =>
                            setNewStudent({
                              ...newStudent,
                              last_name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                          disabled={
                            !newStudent.first_name || !newStudent.last_name
                          }
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Saving...
                            </>
                          ) : (
                            "Save"
                          )}
                        </button>
                      </div>
                    </motion.form>
                  </motion.div>
                </div>
              </motion.div>
            )}
            {isExcelModalOpen && (
              <motion.div
                className="fixed inset-0 z-50 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Overlay */}
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsExcelModalOpen(false)}
                />

                {/* Modal content */}
                <div className="flex min-h-screen z-30 relative items-center justify-center p-4">
                  <motion.div
                    className="bg-white p-8 rounded-lg w-[600px] shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{
                      type: "spring",
                      duration: 0.3,
                      delay: 0.15,
                      bounce: 0.25,
                    }}
                  >
                    <motion.h2
                      className="text-xl font-bold mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Import Excel File
                    </motion.h2>
                    <motion.form
                      onSubmit={handleExcelUpload}
                      className="space-y-4"
                    >
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <input
                          type="file"
                          accept=".xlsx, .xls"
                          className="hidden"
                          id="excel-upload"
                          onChange={(e) => {
                            setExcelFile(e.target.files[0]);
                            setFileName(e.target.files[0]?.name || "");
                          }}
                        />
                        <label
                          htmlFor="excel-upload"
                          className="flex flex-col items-center justify-center cursor-pointer"
                        >
                          <svg
                            className="w-12 h-12 text-gray-400 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span className="text-gray-600">
                            {fileName || "Click to upload Excel file"}
                          </span>
                          <span className="text-sm text-gray-500 mt-1">
                            Supports .xlsx and .xls
                          </span>
                        </label>
                      </div>
                      {fileName && (
                        <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm text-gray-600 truncate">
                            {fileName}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setExcelFile(null);
                              setFileName("");
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                      {totalChunks > 0 && <ChunkProgress />}
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsExcelModalOpen(false)}
                          disabled={isProcessing}
                          className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100 disabled:opacity-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!excelFile || isProcessing}
                          className={`px-4 py-2 rounded flex items-center gap-2 ${
                            excelFile && !isProcessing
                              ? "bg-green-500 text-white hover:bg-green-600"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          {isProcessing ? (
                            <>
                              <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            "Upload"
                          )}
                        </button>
                      </div>
                    </motion.form>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
export default StudentDatatable;
