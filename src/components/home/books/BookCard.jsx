import React from "react";
import { Link } from "react-router-dom";
import { bookImg } from "../../../assets/test_img";

// React functional component for a single book card
const BookCard = ({ book }) => {
  return (
    <div className="">
      <div className="h-full bg-white p-3 rounded-lg flex flex-col shadow-lg hover:shadow-md transition-all justify-between">
        <div className="flex gap-2">
          <Link
            to={`/books/${book.book_slug}`}
            className="w-3/4 rounded-md relative"
          >
            <img
              className="w-[60px] rounded-md"
              loading="lazy"
              src={bookImg}
              alt="Book Cover"
            />
          </Link>
          <div className="w-full flex flex-col">
            <div className="flex w-full mt-2 justify-between">
              <h5 className="font-bold text-base">
                {book.book_title.slice(0, 25)}
              </h5>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">{book.author.name}</p>
            </div>
            <div className="flex items-center text-xs my-4">
              <span>in &nbsp;</span>
              <p className="text-xs">{book.category.cat_name}</p>
            </div>
          </div>
        </div>
        <hr className="w-full" />
        <div className="flex justify-between pt-2 items-center">
          <div>
            {book.price ? (
              <p className="text-lg font-bold text-end">
                {book.currency === "ETB"
                  ? `ETB ${book.price}`
                  : `USD ${book.price}`}
              </p>
            ) : (
              <p className="text-lg font-bold text-end">Free</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
