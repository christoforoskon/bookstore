import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BookData } from "../../services/BookService";
import { Link } from "react-router-dom";

interface SimpleSliderProps {
  title?: string;
  books: BookData[];
}

const SimpleSlider: React.FC<SimpleSliderProps> = ({ title, books }) => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 9999,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  const generateSlides = (books: BookData[]) => {
    return books.map((book, index) => (
      <div key={index}>
        <Link to={`/product/${book.isbn}`}>
          <img src={`https://placehold.jp/250x250.png`} alt={book.title} />
          <h5>{book.title}</h5>
        </Link>
      </div>
    ));
  };

  return (
    <>
      <h3>{title}</h3>
      <Slider {...settings}>{generateSlides(books)}</Slider>
    </>
  );
};

export default SimpleSlider;
