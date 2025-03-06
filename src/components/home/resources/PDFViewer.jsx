import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { gearSpinner } from "@/assets/images";

const PdfViewer = ({ pdfUrl }) => {
  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await fetch(
          "https://api.saas.kuraztech.com/api/proxy-read-ebook?filename=" + pdfUrl,
          { mode: "cors" }
        );
        if (!response.ok) throw new Error("Failed to load PDF");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPDF();
  }, [pdfUrl]);

  return (
    <div className="pdf-container w-full max-h-[80vh]">
      {loading ? (
        <div className="flex flex-col gap-2 h-full justify-center items-center">
          <img src={gearSpinner} className="w-[70px]" alt="Loading spinner" />
          <p className="ml-3 text-gray-500">Loading PDF...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col gap-2 h-full justify-center items-center">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={blobUrl} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      )}
    </div>
  );
};

export default PdfViewer;
