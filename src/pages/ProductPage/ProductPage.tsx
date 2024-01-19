import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getBookById, fetchBooks } from "../../services/BookService";
import { BookData } from "../../services/BookService";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

import sampleImage from "../../assets/sampleBook.jpg";
import styles from "./ProductPage.module.scss";
import { Row, Rate, Col } from "antd";
import Carousel from "../../components/Carousel/Carousel";

interface RouteParams {
  [key: string]: string | undefined;
  bookId: string;
}

const ProductPage: React.FC = () => {
  const { bookId } = useParams<RouteParams>();

  // Use React Query's useQuery hook to fetch and cache the specific product
  const { data: product, isLoading: isProductLoading } = useQuery<BookData>(
    ["book", bookId],
    () => getBookById(bookId || "")
  );

  // Use React Query's useQuery hook to fetch and cache all books
  const { data: allBooks = [], isLoading: isAllBooksLoading } = useQuery<
    BookData[]
  >("books", fetchBooks);

  const relatedBooks = allBooks.filter((book) => book.isbn !== bookId);

  return (
    <>
      <div className={styles["product-page"]}>
        <Breadcrumbs
          items={[{ label: "Home", to: "/" }, { label: "Category" }]}
        />
        <br />
        {isProductLoading || isAllBooksLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Row>
              <Col sm={10} lg={6}>
                <div className={styles["product-image"]}>
                  <img src={sampleImage} alt={`Sample for ${product?.title}`} />
                </div>
              </Col>
              <Col lg={12}>
                <div className={styles["product-details"]}>
                  <Row>
                    <h3>{product?.title}</h3>
                    <p>{product?.description}</p>

                    <Row>
                      <Col span={24}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <button>Favorite</button> &nbsp; &nbsp; &nbsp;
                          <button>Share</button>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <p>Category: #tag, #tag, #tag</p>
                          <p>Year: 1970</p>
                          <p>Number of Pages: {product?.pages}</p>
                          <p>Publisher: {product?.publisher}</p>
                          <p>ISBN-13: {product?.isbn}</p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <button style={{ padding: ".6rem 5rem" }}>BUY</button>
                    </Row>
                  </Row>
                  <br />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>{product?.author}</p>
                <Rate allowHalf defaultValue={2.5} />
              </Col>
            </Row>
          </>
        )}
        <br />
        <Carousel title="Other Books you may like" books={relatedBooks} />
        <br />
      </div>
    </>
  );
};

export default ProductPage;
