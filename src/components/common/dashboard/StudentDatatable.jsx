import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import Axios from "../../../middleware/Axios";
import { MdAdd, MdFilterList, MdClear, MdSearch } from "react-icons/md";
import ReactDataTable from "./Datatable";
import { useSiteStore } from "@/context/siteStore";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const StudentDatatable = ({ datas, headers, actions }) => {
  // State for data and pagination
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State for new student form
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
    grade: "",
    section: ""
  });

  // State for filters
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    grades: [],
    sections: [],
    searchQuery: ""
  });

  // Grade and section related state
  const [grade, setGrade] = useState("");
  const grades = useSiteStore((store) => store.schoolGrades);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  
  // Excel import/export state
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [excelFile, setExcelFile] = useState(null);
  const [fileName, setFileName] = useState("");
  
  // Processing states
  const setSchoolStudents = useSiteStore((store) => store.setSchoolStudents);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processingChunks, setProcessingChunks] = useState([]);
  const [completedChunks, setCompletedChunks] = useState([]);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const [isRefreshingData, setIsRefreshingData] = useState(false);
  
  const CHUNK_SIZE = 50;

  // Prepare grade options for multi-select
  const gradeOptions = useMemo(() => 
    grades.map(grade => ({
      value: grade.grade_id,
      label: grade.name
    })), 
    [grades]
  );

  // Prepare section options for multi-select
  const sectionOptions = useMemo(() => 
    sections.map(section => ({
      value: section.id,
      label: section.name
    })), 
    [sections]
  );

  // Format initial data
  useEffect(() => {
    const formattedData = datas.map(student => ({
      ...student,
      grade: student.section?.grade?.name || "N/A",
      section: student.section?.name || "N/A",
      gradeId: student.section?.grade?.grade_id || null,
      sectionId: student.section?.id || null,
      fullName: `${student.first_name} ${student.last_name}`.toLowerCase()
    }));
    setDataList(formattedData);
    setFilteredData(formattedData);
  }, [datas]);

  // Apply filters whenever data or filters change
  useEffect(() => {
    const filtered = dataList.filter(student => {
      // Filter by selected grades
      if (filters.grades.length > 0 && !filters.grades.some(g => g.value === student.gradeId)) {
        return false;
      }
      
      // Filter by selected sections
      if (filters.sections.length > 0 && !filters.sections.some(s => s.value === student.sectionId)) {
        return false;
      }
      
      // Filter by search query (name or email)
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          student.fullName.includes(query) ||
          (student.email && student.email.toLowerCase().includes(query))
        );
      }
      
      return true;
    });
    
    setFilteredData(filtered);
  }, [dataList, filters]);

  const refreshStudentData = async () => {
    setIsRefreshingData(true);
    try {
      await setSchoolStudents();
      toast.success("Student data refreshed successfully");
    } catch (error) {
      console.error("Error refreshing student data:", error);
      toast.error("Failed to refresh student data");
    } finally {
      setIsRefreshingData(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formedNewStudent = {
        first_name: newStudent.first_name,
        last_name: newStudent.last_name,
        section_id: selectedSection
      };
      
      const response = await Axios.post("/api/student/register", formedNewStudent);

      if (response.data) {
        toast.success("Student added successfully!");
        await refreshStudentData();
        setIsModalOpen(false);
        setNewStudent({ first_name: "", last_name: "", grade: "", section: "" });
        setSelectedSection(null);
        setGrade("");
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
    if (!excelFile || !selectedSection) return;

    setIsProcessing(true);

    try {
      const reader = new FileReader();

      reader.onload = async (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        const chunks = [];
        for (let i = 0; i < data.length; i += CHUNK_SIZE) {
          chunks.push(data.slice(i, i + CHUNK_SIZE));
        }

        setTotalChunks(chunks.length);
        setProcessingChunks(chunks.map((_, index) => index));
        setCompletedChunks([]);

        for (let i = 0; i < chunks.length; i++) {
          setCurrentChunk(i);
          try {
            await Axios.post("/api/students/import", {
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

        await refreshStudentData();
        setIsExcelModalOpen(false);
        setExcelFile(null);
        setFileName("");
        setTotalChunks(0);
        setProcessingChunks([]);
        setCompletedChunks([]);
      };

      reader.onerror = () => {
        toast.error("Error reading file");
        setIsProcessing(false);
      };

      reader.readAsBinaryString(excelFile);
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error("Failed to process file");
      setIsProcessing(false);
    }
  };

  const handleExportToExcel = () => {
    const filteredDataToExport = filteredData.map(({ user_id, tenant, user_type, ...rest }) => rest);
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredDataToExport);
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'students.xlsx';
    link.click();
  };

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  const handleGradeChange = (selectedOptions) => {
    setFilters(prev => ({
      ...prev,
      grades: selectedOptions || []
    }));
    
    // Update available sections based on selected grades
    if (selectedOptions && selectedOptions.length > 0) {
      const gradeIds = selectedOptions.map(opt => opt.value);
      const availableSections = grades
        .filter(grade => gradeIds.includes(grade.grade_id))
        .flatMap(grade => grade.section);
      
      setSections(availableSections);
      
      // Remove any section filters that are no longer valid
      if (filters.sections.length > 0) {
        const validSectionIds = availableSections.map(s => s.id);
        setFilters(prev => ({
          ...prev,
          sections: prev.sections.filter(s => validSectionIds.includes(s.value))
        }));
      }
    } else {
      setSections([]);
      setFilters(prev => ({ ...prev, sections: [] }));
    }
  };

  const handleSectionChange = (selectedOptions) => {
    setFilters(prev => ({
      ...prev,
      sections: selectedOptions || []
    }));
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: e.target.value
    }));
  };

  const clearFilters = () => {
    setFilters({
      grades: [],
      sections: [],
      searchQuery: ""
    });
    setSections([]);
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
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : processingChunks.includes(index) ? (
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-yellow-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              ) : (
                <div className="bg-gray-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
        <div className="mt-4 bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(completedChunks.length / totalChunks) * 100}%` }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          {isProcessing ? (
            <span>Processing chunk {currentChunk + 1} of {totalChunks}...</span>
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
    <div className="min-h-screen flex justify-center py-10">
      <div className="w-full max-w-7xl px-4">
        <div className="shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gray-200 flex justify-between items-center p-4 border-b border-gray-300">
            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-sm flex items-center gap-2 font-light text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                disabled={isRefreshingData}
              >
                <MdAdd />
                Add Student
              </button>
              <button
                onClick={() => setIsExcelModalOpen(true)}
                className="bg-primary font-light text-sm flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
                disabled={isRefreshingData}
              >
                <MdAdd />
                Import Excel
              </button>
              <button
                onClick={handleExportToExcel}
                className="bg-primary font-light text-sm flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-purple-600 disabled:opacity-50"
                disabled={isRefreshingData}
              >
                Export to Excel
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg ${showFilters ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-primary text-white hover:bg-blue-600'} disabled:opacity-50`}
                disabled={isRefreshingData}
              >
                <MdFilterList />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              {isRefreshingData && (
                <div className="flex items-center ml-2 text-gray-600">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
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
                  Refreshing data...
                </div>
              )}
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white p-4 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search Students</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MdSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      className="pl-10 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={filters.searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Grade</label>
                  <Select
                    isMulti
                    options={gradeOptions}
                    components={animatedComponents}
                    value={filters.grades}
                    onChange={handleGradeChange}
                    placeholder="Select grades..."
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Section</label>
                  <Select
                    isMulti
                    options={sectionOptions}
                    components={animatedComponents}
                    value={filters.sections}
                    onChange={handleSectionChange}
                    placeholder={filters.grades.length === 0 ? "Select grades first" : "Select sections..."}
                    isDisabled={filters.grades.length === 0}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <div className="text-sm text-gray-500">
                  Showing {filteredData.length} of {dataList.length} students
                </div>
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  <MdClear size={18} />
                  Clear All Filters
                </button>
              </div>
            </div>
          )}

          {isRefreshingData ? (
            <div className="flex justify-center items-center p-10">
              <svg
                className="animate-spin h-8 w-8 text-blue-500"
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
            </div>
          ) : (
            <ReactDataTable
              datas={filteredData}
              headers={headers}
              actions={actions}
            />
          )}

          {/* Add Student Modal */}
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                className="fixed inset-0 z-50 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsModalOpen(false)}
                />

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
                      Add New Student
                    </motion.h2>
                    <motion.form
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
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
                          disabled={!newStudent.first_name || !newStudent.last_name || !selectedSection}
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
          </AnimatePresence>

          {/* Import Excel Modal */}
          <AnimatePresence>
            {isExcelModalOpen && (
              <motion.div
                className="fixed inset-0 z-50 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsExcelModalOpen(false)}
                />
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