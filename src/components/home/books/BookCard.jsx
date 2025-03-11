import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Axios from "../../../middleware/Axios";
import { cacheData, getCachedData } from "@/lib/utils";  // Assuming these functions are in your utils file
import { VideoImage, placeHolder } from "../../../assets/images";  // Add a placeholder image if not already present

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../../ui/card";
import { Button } from "../../ui/button";

const BookCard = ({ book }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // Intersection observer for lazy loading the image
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  // Fetch and cache image once the card is visible
  useEffect(() => {
    if (!isVisible || imageUrl) return;

    const fetchImage = async () => {
      const cachedImage = await getCachedData(book.book_title, "thumbnails");
      if (cachedImage) {
        setImageUrl(URL.createObjectURL(cachedImage));
        return;
      }

      try {
        const response = await Axios.get(`/api/book/getThumbnail/${book.id}`, {
          responseType: "blob",
        });
        const imageUrl = URL.createObjectURL(response.data);
        setImageUrl(imageUrl);
        await cacheData(book.book_title, response.data, "thumbnails");
      } catch (error) {
        console.error("Error fetching book thumbnail:", error);
        setImageUrl(placeHolder);  // Use a fallback placeholder if fetch fails
      }
    };

    fetchImage();
  }, [isVisible, imageUrl, book]);

  return (
    <Card className="max-w-[15rem] w-full" ref={cardRef}>
      <Link to={`/books/${book.id}`} className="block relative">
        <img
          className="rounded-t-lg h-auto object-cover"
          loading="lazy"
          src={imageUrl || placeHolder}  // Use the fetched image URL or a placeholder
          alt={book?.book_title}
        />
      </Link>
      <CardHeader>
        <CardTitle className="text-md text-gray-800 truncate">
          {book.book_title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 mt-1">
          {book?.book_author?.name}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center mt-4">
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
        <Button asChild variant="outline">
          <Link
            to={`/books/single/${book?.id}`}
            state={{ book: book }}
            className="text-sm font-light"
          >
            Read
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
