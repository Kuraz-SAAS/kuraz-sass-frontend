import React from "react";
import { Link } from "react-router-dom";
import { bookImg } from "../../../assets/test_img";
import { BookImage, VideoImage } from "../../../assets/images";

const BookCard = ({ book }) => {
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow ">
      <Link to={`/books/${book.id}`} className="block relative">
        <img
          className="rounded-t-lg object-cover"
          loading="lazy"
          src={VideoImage}
          alt={book?.book_cover}
        />
      </Link>
      <div className="p-4 flex flex-col">
        <h5 className="font-light text-md text-gray-800 truncate">
          {book.book_title}
        </h5>
        <p className="text-sm font-light text-gray-600 mt-1">
          {book?.book_author && book?.book_author.name}
        </p>
        <div className="flex items-center text-xs text-gray-500 mt-2">
          <span className="font-light">Category: </span>
          <p className="ml-1">{book?.book_category_id}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            {book?.price ? (
              <p className="text-lg font-bold text-blue-600">
                {book?.currency === "ETB"
                  ? `ETB ${book?.price}`
                  : `USD ${book?.price}`}
              </p>
            ) : (
              <p className="text-sm text-green-600 font-light">Free</p>
            )}
          </div>
          <Link
            to={"single/" + book?.id}
            state={{ book: book }}
            className="px-3 py-1 text-sm font-light text-white bg-primary rounded-md hover:bg-blue-600 transition"
          >
            Read
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
