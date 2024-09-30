import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css"; // Include default layout styles
import PdfViewer from "../../components/home/resources/PDFViewer";
import { Link, useLocation } from "react-router-dom";
import { BsBack } from "react-icons/bs";

const SingleBook = () => {
  const { state } = useLocation();
  const book = state?.book;

  return (
    <div className="px-20 py-10 font-poppins">
      <div className="flex justify-between items-center p-5">
        <p className="text-lg font-bold">Title</p>
        <div className="flex  items-center gap-2 ">
          <BsBack size={24} />
          <Link to={"/books"} className="underline underline-offset-4">
            Back to Books
          </Link>
        </div>
      </div>
      <PdfViewer pdfUrl={book?.book_source} path={"readBook"} />
    </div>
  );
};

export default SingleBook;
