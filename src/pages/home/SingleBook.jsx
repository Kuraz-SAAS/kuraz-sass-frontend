import React from "react";
import { useLocation, Link } from "react-router-dom";
import { BsBack } from "react-icons/bs";
import PdfViewer from "../../components/home/resources/PDFViewer";
import ChatComponent from "../../components/common/home/ChatComponent";

const SingleBook = () => {
  const { state } = useLocation();
  const book = state?.book;

  return (
    <div className="px-20 py-10 font-poppins">
      <div className="flex justify-between items-center p-5">
        <p className="text-lg font-bold">{book?.title}</p>
        <div className="flex items-center gap-2">
          <BsBack size={24} />
          <Link to={"/books"} className="underline underline-offset-4">
            Back to Books
          </Link>
        </div>
      </div>
      <div className="flex gap-4 h-full">
        <PdfViewer pdfUrl={book?.book_source} path={"readBook"} />
        <ChatComponent />
      </div>
    </div>
  );
};

export default SingleBook;
