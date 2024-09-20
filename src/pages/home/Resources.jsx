import React, { useEffect, useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { AiFillFilePdf } from "react-icons/ai";
import PdfViewer from "../../components/home/resources/PDFViewer";
import Navbar from "../../components/common/home/Navbar";
import Axios from "../../middleware/Axios";

const Resources = () => {
  // Initialize schoolGrades as an empty array
  const [schoolGrades, setSchoolGrades] = useState([]);

  // State to track open folders
  const [openFolders, setOpenFolders] = useState({});

  // State to track selected PDF
  const [selectedPdf, setSelectedPdf] = useState(
    "http://localhost:5173/downloaded.pdf"
  );

  // State to store resources by subject ID
  const [resourcesBySubject, setResourcesBySubject] = useState({});

  // State to track loading state for resources
  const [loadingResources, setLoadingResources] = useState({});

  // State to track errors while fetching resources
  const [errorResources, setErrorResources] = useState({});

  useEffect(() => {
    const fetchResourceData = async () => {
      try {
        const res = await Axios.get("/api/schoolGrades");
        setSchoolGrades(res.data.school_grades);
      } catch (error) {
        console.error("Error fetching school grades:", error);
        // Handle error appropriately, e.g., set an error state
      }
    };

    fetchResourceData();
  }, []);

  // Toggle folder visibility and fetch resources if necessary
  const toggleFolder = async (folderType, folderId) => {
    setOpenFolders((prev) => ({
      ...prev,
      [`${folderType}${folderId}`]: !prev[`${folderType}${folderId}`],
    }));

    // If toggling a subject and resources are not yet loaded, fetch them
    if (folderType === "subject" && !resourcesBySubject[folderId]) {
      setLoadingResources((prev) => ({
        ...prev,
        [folderId]: true,
      }));
      try {
        const res = await Axios.get(`/api/subject/resource/${folderId}`);
        setResourcesBySubject((prev) => ({
          ...prev,
          [folderId]: res.data.school_resources, // Assuming the response has a 'resources' array
        }));
        setLoadingResources((prev) => ({
          ...prev,
          [folderId]: false,
        }));
      } catch (error) {
        console.error(
          `Error fetching resources for subject ${folderId}:`,
          error
        );
        setErrorResources((prev) => ({
          ...prev,
          [folderId]: "Failed to load resources.",
        }));
        setLoadingResources((prev) => ({
          ...prev,
          [folderId]: false,
        }));
      }
    }
  };

  const openPdf = (file) => {
    setSelectedPdf(file); // Set the selected PDF file
  };

  return (
    <div>
      <Navbar />
      <div className="flex font-poppins rounded-lg pt-28 px-9">
        {/* Folder list */}
        <div className="w-[300px] bg-[#EEEEEE] rounded-s-lg pr-4 shadow-lg p-6 overflow-y-auto">
          <ul>
            {schoolGrades.map((grade) => (
              <li key={grade.grade_id}>
                <div
                  className="flex items-center gap-2 cursor-pointer group"
                  onClick={() => toggleFolder("grade", grade.grade_id)}
                >
                  {openFolders[`grade${grade.grade_id}`] ? (
                    <FaFolderOpen className="text-yellow-500" />
                  ) : (
                    <FaFolder className="text-yellow-500" />
                  )}
                  <span className="font-semibold">{grade.name}</span>
                </div>
                <ul
                  id={`grade${grade.grade_id}`}
                  className={`pl-6 mt-2 space-y-2 ${
                    openFolders[`grade${grade.grade_id}`] ? "" : "hidden"
                  }`}
                >
                  {grade.subjects.map((subject) => (
                    <li key={subject.subject_id}>
                      <div
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() =>
                          toggleFolder("subject", subject.subject_id)
                        }
                      >
                        {openFolders[`subject${subject.subject_id}`] ? (
                          <FaFolderOpen className="text-yellow-500" />
                        ) : (
                          <FaFolder className="text-yellow-500" />
                        )}
                        <span className="font-semibold">{subject.name}</span>
                      </div>
                      <ul
                        id={`subject${subject.subject_id}`}
                        className={`pl-6 mt-2 space-y-2 ${
                          openFolders[`subject${subject.subject_id}`]
                            ? ""
                            : "hidden"
                        }`}
                      >
                        {loadingResources[subject.subject_id] ? (
                          <li className="text-gray-500">Loading...</li>
                        ) : errorResources[subject.subject_id] ? (
                          <li className="text-red-500">
                            {errorResources[subject.subject_id]}
                          </li>
                        ) : resourcesBySubject[subject.subject_id] &&
                          resourcesBySubject[subject.subject_id].length > 0 ? (
                          resourcesBySubject[subject.subject_id].map(
                            (resource) => (
                              <li key={resource.id}>
                                <div className="flex items-center gap-2 cursor-pointer">
                                  <AiFillFilePdf className="text-red-600" />
                                  <button
                                    onClick={() => openPdf(resource.file)}
                                    className="font-semibold text-left w-full"
                                  >
                                    {resource.name}
                                  </button>
                                </div>
                              </li>
                            )
                          )
                        ) : (
                          <li className="text-gray-500">
                            No resources available.
                          </li>
                        )}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <img src="http://127.0.0.1:8000/public/hero-img.png" alt="" />
        </div>
        {/* PDF viewer */}
        <div className="w-full h-screen overflow-y-auto">
          {selectedPdf ? (
            <PdfViewer pdfUrl={selectedPdf} />
          ) : (
            <div className="text-center text-gray-500">
              Select a resource to view the PDF
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;
