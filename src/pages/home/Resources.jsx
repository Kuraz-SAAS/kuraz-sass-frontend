import React, { useEffect, useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { AiFillFilePdf } from "react-icons/ai";
import PdfViewer from "../../components/home/resources/PDFViewer";
import Navbar from "../../components/common/home/Navbar";
import Axios from "../../middleware/Axios";

const Resources = () => {
  const [schoolGrades, setSchoolGrades] = useState([]);
  const [openFolders, setOpenFolders] = useState({});
  const [selectedPdf, setSelectedPdf] = useState("");
  const [resourcesBySubject, setResourcesBySubject] = useState({});
  const [loadingResources, setLoadingResources] = useState({});
  const [errorResources, setErrorResources] = useState({});

  useEffect(() => {
    const fetchResourceData = async () => {
      try {
        const res = await Axios.get("/api/schoolGrades");
        setSchoolGrades(res.data.school_grades);
      } catch (error) {
        console.error("Error fetching school grades:", error);
      }
    };

    fetchResourceData();
  }, []);

  const toggleFolder = async (folderType, folderId) => {
    setOpenFolders((prev) => ({
      ...prev,
      [`${folderType}${folderId}`]: !prev[`${folderType}${folderId}`],
    }));

    if (folderType === "subject" && !resourcesBySubject[folderId]) {
      setLoadingResources((prev) => ({
        ...prev,
        [folderId]: true,
      }));
      try {
        const res = await Axios.get(`/api/subject/resource/${folderId}`);
        setResourcesBySubject((prev) => ({
          ...prev,
          [folderId]: res.data.school_resources,
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
    setSelectedPdf(file);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row font-poppins pt-28 px-4 lg:px-9 gap-6">
        {/* Folder list */}
        <div className="lg:w-[300px] w-full bg-[#EEEEEE] min-h-[60vh] max-h-[80vh] overflow-y-auto rounded-lg pr-4 shadow-lg p-4 lg:p-6">
          <ul>
            {schoolGrades?.map((grade) => (
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
                  {grade?.subjects?.map((subject) => (
                    <li key={subject?.subject_id}>
                      <div
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() =>
                          toggleFolder("subject", subject?.subject_id)
                        }
                      >
                        {openFolders[`subject${subject?.subject_id}`] ? (
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
        {/* PDF viewer */}
        <div className="w-full lg:w-2/3 overflow-y-auto">
          {selectedPdf ? (
            <PdfViewer pdfUrl={selectedPdf} path={"resource/pdf"} />
          ) : (
            <div className="text-center border-4 border-gray-500 h-[60vh] lg:h-[80vh] flex justify-center items-center text-gray-500">
              Select a resource to view the PDF
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;
