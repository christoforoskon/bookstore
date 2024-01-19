import React, { useEffect, useState } from "react";
import { Rate, Input, Select } from "antd";
import { useQuery } from "react-query";
import { fetchBooks, BookData } from "../../services/BookService";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const { Option } = Select;
const ProductSearchPage: React.FC = () => {
  const { data: books = [], isLoading } = useQuery<BookData[]>(
    "books",
    fetchBooks
  );

  const [filteredBooks, setFilteredBooks] = useState<BookData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    year: "",
    publisher: "",
    popularity: "",
  });

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  const applyFilters = () => {
    const filteredResults = books.filter((book) => {
      return (
        (filters.publisher === "" ||
          book.publisher.toLowerCase() === filters.publisher.toLowerCase()) &&
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredBooks(filteredResults);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, searchTerm]);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Book" },
          { label: "Add" },
        ]}
      />
      <h2>Search to find your new book</h2>
      <p style={{ textAlign: "center" }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <div style={{ maxWidth: "50%", margin: "0 auto" }}>
        <Input
          placeholder="Search . . ."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <p>Filters: </p>
        <Select
          style={{ width: 120 }}
          value={filters.publisher}
          onChange={(value) =>
            setFilters({ ...filters, publisher: value as string })
          }
        >
          <Option value="">All Publishers</Option>
          <Option value="O'Reilly Media">O'Reilly Media</Option>
          <Option value="No Starch Press">No Starch Press</Option>
        </Select>
      </div>
      <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          filteredBooks.map((book, index) => (
            <div
              key={index}
              style={{
                flex: "1 0 20%",
                padding: "10px",
              }}
            >
              <img
                src="https://placehold.jp/250x250.png"
                alt={book.title}
                style={{ width: "auto", height: "auto" }}
              />
              <h4>{book.title}</h4>
              <Rate allowHalf defaultValue={2.5} />
            </div>
          ))
        )}
      </div>
      <br />
    </div>
  );
};

export default ProductSearchPage;
