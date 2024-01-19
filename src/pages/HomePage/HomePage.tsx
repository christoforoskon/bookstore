import React from "react";
import { Link } from "react-router-dom";
import Carousel from "../../components/Carousel/Carousel";
import { useQuery } from "react-query";
import { fetchBooks, BookData } from "../../services/BookService";
import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  // Using Tanstack Query's useQuery hook to fetch and cache the books
  const { data: books = [], isLoading } = useQuery<BookData[]>(
    "books",
    fetchBooks
  );

  return (
    <div className={styles["home-page"]}>
      <div className={styles["quick-links"]}>
        {/* Link to the product creation page */}
        <Link to="/create-product">Create a book</Link>
        {/* Link to the search page */}
        <Link to="/search">Search for books</Link>
      </div>
      <div className={styles["featured-books"]}>
        {/* Use React Query's isLoading to show a loading message */}
        {isLoading ? <p>Loading...</p> : <Carousel books={books} />}
      </div>
      <br />
    </div>
  );
};

export default HomePage;
