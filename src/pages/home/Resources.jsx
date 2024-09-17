import React, { useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { AiFillFilePdf } from "react-icons/ai";
// import PdfViewer from "../../components/home/resources/PDFViewer";

const Resources = () => {
  // Mock Data
  const mockData = [
    {
      id: 1,
      name: "Grade 1",
      subjects: [
        {
          id: 101,
          name: "Biology",
          resources: [
            {
              id: 1001,
              name: "Introduction to Biology",
              file: "/files/biology1.pdf",
            },
            { id: 1002, name: "Biology Basics", file: "/files/biology2.pdf" },
          ],
        },
        {
          id: 102,
          name: "Math",
          resources: [{ id: 1003, name: "Math 101", file: "/files/math1.pdf" }],
        },
      ],
    },
    {
      id: 2,
      name: "Grade 2",
      subjects: [
        {
          id: 103,
          name: "Physics",
          resources: [
            {
              id: 1004,
              name: "Introduction to Physics",
              file: "/files/physics1.pdf",
            },
          ],
        },
      ],
    },
  ];

  const [openFolders, setOpenFolders] = useState({});
  const [selectedPdf, setSelectedPdf] = useState(null); // Track the selected PDF

  // Toggle folder visibility
  const toggleFolder = (folderId) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const openPdf = (file) => {
    setSelectedPdf(file); // Set the selected PDF file
  };

  return (
    <div className="w-[400px] bg-white shadow-md rounded-lg p-4">
      <ul>
        {mockData.map((grade) => (
          <li key={grade.id}>
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => toggleFolder(`grade${grade.id}`)}
            >
              {openFolders[`grade${grade.id}`] ? (
                <FaFolderOpen className="text-yellow-500" />
              ) : (
                <FaFolder className="text-yellow-500" />
              )}
              <span className="font-semibold">{grade.name}</span>
            </div>
            <ul
              id={`grade${grade.id}`}
              className={`pl-6 mt-2 space-y-2 ${
                openFolders[`grade${grade.id}`] ? "" : "hidden"
              }`}
            >
              {grade.subjects.map((subject) => (
                <li key={subject.id}>
                  <div
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => toggleFolder(`subject${subject.id}`)}
                  >
                    {openFolders[`subject${subject.id}`] ? (
                      <FaFolderOpen className="text-yellow-500" />
                    ) : (
                      <FaFolder className="text-yellow-500" />
                    )}
                    <span className="font-semibold">{subject.name}</span>
                  </div>
                  <ul
                    id={`subject${subject.id}`}
                    className={`pl-6 mt-2 space-y-2 ${
                      openFolders[`subject${subject.id}`] ? "" : "hidden"
                    }`}
                  >
                    {subject.resources.map((resource) => (
                      <li key={resource.id}>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <AiFillFilePdf className="text-red-600" />
                          <button
                            onClick={() => openPdf(resource.file)}
                            className="font-semibold"
                          >
                            {resource.name}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* Render PDF Viewer if a file is selected */}
      {selectedPdf && (
        <div className="mt-4">
          <h2 className="font-semibold text-lg mb-2">Viewing PDF</h2>
          {/* <PdfViewer pdfUrl={selectedPdf} /> */}
        </div>
      )}
    </div>
  );
};

export default Resources;
