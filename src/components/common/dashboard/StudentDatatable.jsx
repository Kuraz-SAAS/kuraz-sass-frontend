import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import Axios from "../../../middleware/Axios";
import CustomPagination from "../CustomPagination";
import { MdAdd } from "react-icons/md";
import ReactDataTable from "./Datatable";
import { useSiteStore } from "@/context/siteStore";

const StudentDatatable = ({ datas, headers, actions }) => {
  const [dataList, setDataList] = useState([...datas]);
  const [rowsLimit] = useState(8);
  const [rowsToShow, setRowsToShow] = useState(dataList?.slice(0, rowsLimit));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
    grade: "",
    section: ""
  });
  const [grade, setGrade] = useState("");
  const grades = useSiteStore((store) => store.schoolGrades);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null)
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [excelFile, setExcelFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const setSchoolStudents = useSiteStore((store) => store.setSchoolStudents);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingChunks, setProcessingChunks] = useState([]);
  const [completedChunks, setCompletedChunks] = useState([]);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const CHUNK_SIZE = 50;

  useEffect(() => {
    const formattedData = datas.map(student => ({
      ...student,
      grade: student.sectionUser?.grade?.name || "N/A",
      section: student.sectionUser?.name || "N/A"
  }));
    setDataList([...formattedData]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send a POST request to the server
      const formedNewStudent = {
        first_name: newStudent.first_name,
        last_name: newStudent.last_name,
        section_id: selected
      }
      const response = await Axios.post("/api/student/register", formedNewStudent);

      if (response.data) {
        // Add the new student to the local data
        setDataList([...dataList, response.data.user]);
        setRowsToShow([...rowsToShow, response.data.user].slice(0, rowsLimit));

        // Show success message
        toast.success("Student added successfully!");

        // Close modal and reset form
        setSchoolStudents()
        setIsModalOpen(false);
        setNewStudent({ first_name: "", last_name: "", grade: "" ,section: ""});
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
              section_id: selectedSection
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
        setIsExcelModalOpen(false)
        toast.success("File import completed successfully!");
      };

      reader.readAsBinaryString(excelFile);
    } catch (error) {
      console.error("Error reading file:", error);
      toast.error("Failed to read file");
      setIsProcessing(false);
    }
  };

  const handleExportToExcel = () => {
    // Filter out unwanted fields (userid, tenant, usertype)
    const filteredData = dataList.map(({ user_id, tenant, user_type, ...rest }) => rest);
  
    // Create a new workbook
    const wb = XLSX.utils.book_new();
  
    // Convert the filtered data to a worksheet
    const ws = XLSX.utils.json_to_sheet(filteredData);
  
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Students");
  
    // Generate a binary string from the workbook
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  
    // Convert the binary string to a Blob
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
  
    // Create a link element and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'students.xlsx';
    link.click();
  };
  
  // Utility function to convert string to ArrayBuffer
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
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
    <div className="min-h-screen  flex justify-center py-10">
      <div className="w-full max-w-7xl px-4">
        <div className="shadow-lg rounded-lg overflow-hidden">
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
              <button
                onClick={handleExportToExcel}
                className="bg-primary font-light text-sm flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
              >
                Export to Excel
              </button>
            </div>
          </div>
          <ReactDataTable
            datas={dataList}
            headers={headers}
            actions={actions}
          />
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
                      <div className="space-y-2">
                      <select
                        value={grade}
                        onChange={(e) => {
                          const selectedGrade = Number(e.target.value);
                          setGrade(selectedGrade);
                          const tempGrade = grades.find(value => value.grade_id === selectedGrade);
                          setSections(tempGrade?.section || []);
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      >
                        <option value="">Select Grade</option>
                        {grades.map((grade) => (
                          <option key={grade.grade_id} value={grade.grade_id}>
                            {grade.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <select
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      >
                        <option value="">Select Section</option>
                        {sections?.map((section) => (
                          <option key={section.id} value={section.id}>
                            {section.name}
                          </option>
                        ))}
                      </select>
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
                <div className="flex min-h-screen z-30 gap-5 relative items-center justify-center p-4">
                  <motion.div
                    className="bg-white p-8 rounded-lg w-[600px] grid gap-5 shadow-xl"
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

                    <div className="space-y-2">
                      <select
                        value={grade}
                        onChange={(e) => {
                          const selectedGrade = Number(e.target.value);
                          setGrade(selectedGrade);
                          const tempGrade = grades.find(value => value.grade_id === selectedGrade);
                          setSections(tempGrade?.section || []);
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      >
                        <option value="">Select Grade</option>
                        {grades.map((grade) => (
                          <option key={grade.grade_id} value={grade.grade_id}>
                            {grade.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <select
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      >
                        <option value="">Select Section</option>
                        {sections?.map((section) => (
                          <option key={section.id} value={section.id}>
                            {section.name}
                          </option>
                        ))}
                      </select>
                    </div>
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
                          disabled={!excelFile || isProcessing || !selectedSection}
                          className={`px-4 py-2 rounded flex items-center gap-2 ${excelFile && !isProcessing && selectedSection
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
