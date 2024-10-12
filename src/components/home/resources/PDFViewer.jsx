import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import axios from "axios";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css"; // Include default layout styles
import Axios from "../../../middleware/Axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
        <div className="flex flex-col gap-2 h-full justify-center items-center">
          <AiOutlineLoading3Quarters
            className="animate-spin text-gray-500"
            style={{ width: "50px", height: "50px" }}
          />
          <p className="ml-3 text-gray-500">Loading PDF...</p>
          <p className="text-gray-500">
            It only take longer on the first time please wait
          </p>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
