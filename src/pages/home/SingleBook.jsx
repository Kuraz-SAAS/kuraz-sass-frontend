import React, { useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { BsBack, BsBackspaceReverseFill } from "react-icons/bs";
import PdfViewer from "../../components/home/resources/PDFViewer";
import ChatComponent from "../../components/common/home/ChatComponent";
import { AiFillApi } from "react-icons/ai";
import { AI } from "../../assets/images";

const SingleBook = () => {
  const { state } = useLocation();
  const book = state?.book;
  const [pdfWidth, setPdfWidth] = useState(70);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const isResizing = useRef(false);

  const handleMouseDown = (e) => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.style.userSelect = "none"; // Prevent text selection
  };

  const handleMouseMove = (e) => {
    if (isResizing.current) {
      const newWidth = (e.clientX / window.innerWidth) * 100;
      if (newWidth > 30 && newWidth < 80) {
        setPdfWidth(newWidth);
      }
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.body.style.userSelect = "auto"; // Restore text selection
  };

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

      <div className="flex gap-4 min-h-[70vh]">
        {/* PDF Viewer */}
        <PdfViewer
          pdfUrl={book?.book_source}
          className="transition-all duration-300 ease-in-out"
          path={"readBook"}
          style={{ width: `${pdfWidth}%` }}
        />

        {/* Resizable Divider */}
        {isChatVisible && (
          <div
            className="w-[5px] bg-gray-400 cursor-col-resize hover:bg-gray-500"
            onMouseDown={handleMouseDown}
          />
        )}

        {/* Chat Section */}
        <div className="flex flex-col">
          <button className="" onClick={() => setIsChatVisible(!isChatVisible)}>
            {isChatVisible ? (
              <div className="flex justify-between border-gray-300 border shadow-md shadow-[#F3D598] rounded-t-lg items-center p-2 bg-gray-200">
                <p className="font-light">Chat with the book</p>
                <BsBackspaceReverseFill size={16} />
              </div>
            ) : (
              <div className="">
                <img src={AI} alt="" className="w-[60px] animate-bounce" />
                <p className="font-light text-[12px]">Chat</p>
              </div>
            )}
          </button>

          {/* Chat Component */}
          {isChatVisible && (
            <ChatComponent
              bookId={book?.id}
              pdfName={book?.book_source}
              className="transition-all duration-300 ease-in-out w-[500px]"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
