import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import axios from "axios";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css"; // Include default layout styles
import Axios from "../../../middleware/Axios";

const PdfViewer = ({ pdfUrl, path }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfData, setPdfData] = useState(null);

  // Initialize the default layout plugin
  const defaultLayout = defaultLayoutPlugin();

  useEffect(() => {
    // Fetch the PDF using Axios
    const fetchPdf = async () => {
      try {
        const response = await Axios.get(`/api/${path}/${pdfUrl}`, {
          responseType: "blob", // Important to get the PDF as a blob
        });
        // Create a URL from the blob and set it to state
        const pdfBlob = URL.createObjectURL(response.data);
        setPdfData(pdfBlob);
      } catch (error) {
        console.error("Error fetching the PDF:", error);
      }
    };

    fetchPdf();
  }, [pdfUrl, path]);

  return (
    <div className="pdf-container w-full max-h-[80vh]">
      {pdfData ? (
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
        >
          <Viewer
            fileUrl={pdfData} // Use the object URL here
            plugins={[defaultLayout]}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)} // Capture the number of pages
          />
        </Worker>
      ) : (
        <p>Loading PDF...</p> // A loading message while the PDF is being fetched
      )}
    </div>
  );
};

export default PdfViewer;
