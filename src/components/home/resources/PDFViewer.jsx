import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css"; // Include default layout styles

const PdfViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // Initialize the default layout plugin
  const defaultLayout = defaultLayoutPlugin();

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };
  console.log(pdfUrl);

  return (
    <div className="pdf-container h-[80vh]">
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
      >
        <Viewer
          fileUrl={`http://localhost:8000/SchoolResourceFiles/cxampptmpphp7691tmp-2024-09-18-66ea8cd886348.pdf`} // Use pdfUrl prop passed into the component
          plugins={[defaultLayout]} // Add the default layout plugin here
        />
      </Worker>
    </div>
  );
};

export default PdfViewer;
