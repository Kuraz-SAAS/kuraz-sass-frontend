import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { BsBack, BsBackspaceReverseFill } from "react-icons/bs";
import PdfViewer from "../../components/home/resources/PDFViewer";
import ChatComponent from "../../components/common/home/ChatComponent";
import { AiFillApi } from "react-icons/ai";
import { AI } from "../../assets/images";

const SingleBook = () => {
  const { state } = useLocation();
  const book = state?.book;

  // State to manage chat visibility
  const [isChatVisible, setIsChatVisible] = useState(false);

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
      <div className="flex gap-4  min-h-[70vh]">
        <PdfViewer
          pdfUrl={book?.book_source}
          className="w-full transition-all duration-300 ease-in-out"
          path={"readBook"}
        />

        {/* Button to toggle chat visibility */}
        <div className="flex flex-col">
          <button className="">
            {isChatVisible ? (
              <div className="flex justify-between border-gray-300 border shadow-md shadow-[#F3D598] rounded-t-lg items-center p-2 bg-gray-200">
                <p className="font-light">Chat with the book</p>
                <BsBackspaceReverseFill
                  size={16}
                  onClick={() => setIsChatVisible(!isChatVisible)}
                />
              </div>
            ) : (
              <div
                className=""
                onClick={() => setIsChatVisible(!isChatVisible)}
              >
                <img src={AI} alt="" className="w-[60px] animate-bounce" />
                <p className="font-light text-[12px]">Chat</p>
              </div>
            )}
          </button>

          {/* Conditionally render the ChatComponent */}
          {isChatVisible && (
            <ChatComponent
              bookId={book?.id}
              pdfName={book?.book_source}
              className="transition-all duration-300 ease-in-out"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
