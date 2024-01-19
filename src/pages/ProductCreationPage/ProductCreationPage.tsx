import React, { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import styles from "./ProductCreationPage.module.scss";
import { Row, Col, Input, Button, Form, message, Select } from "antd";

interface Book {
  title: string;
  description: string;
  categories: string;
  authorNames: string[];
  publisher: string;
  year: string;
  pageNumbers: number;
  options: string;
  rating: string;
  isbn10: string;
  isbn13: string;
  image?: string;
  id: string;
}

const ProductCreationPage: React.FC = () => {
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  // Adding the new book
  const handleAddBook = () => {
    form
      .validateFields()
      .then((values) => {
        const newBook: Book = { ...values, id: new Date().toISOString() };
        setBooks([...books, newBook]);
        message.success("Book added successfully!");
      })
      .catch(() => {
        message.error("Form validation failed. Please check the fields.");
      });
  };

  // Clearing the form
  const handleAddAnotherBook = () => {
    form.resetFields();
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const validateDescription = (value: string) => {
    if (value && (value.length > 512 || !value[0].match(/[A-Z]/))) {
      return Promise.reject(
        "Description must be max 512 characters and start with an uppercase letter"
      );
    }

    return Promise.resolve();
  };

  const validateCategories = (value: string) => {
    if (value && value.split(",").length > 4) {
      return Promise.reject("Max 4 categories allowed");
    }

    return Promise.resolve();
  };

  const validatePublisher = (value: string) => {
    if (value && (value.length < 5 || value.length > 60)) {
      return Promise.reject("Publisher must be between 5 and 60 characters");
    }

    return Promise.resolve();
  };

  const validateYear = (value: string) => {
    if (value && (value.length !== 4 || isNaN(parseInt(value)))) {
      return Promise.reject("Year must be a 4-digit number");
    }

    return Promise.resolve();
  };

  const validateISBN10 = (value: string) => {
    if (value && (value.length !== 10 || isNaN(parseInt(value)))) {
      return Promise.reject("ISBN-10 must be a 10-digit number");
    }

    return Promise.resolve();
  };

  const validateISBN13 = (value: string) => {
    if (value && (value.length !== 13 || isNaN(parseInt(value)))) {
      return Promise.reject("ISBN-13 must be a 13-digit number");
    }

    return Promise.resolve();
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Book" },
          { label: "Add" },
        ]}
      />
      <h2>Add new Book</h2>
      <Form form={form}>
        <div className={styles["add-section"]}>
          <Row gutter={[16, 16]}>
            <Col lg={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please enter a title",
                  },
                  {
                    min: 10,
                    max: 120,
                    message: "Title must be between 10 and 120 characters",
                  },
                  {
                    // Allow @, ", #, &, *, letters, numbers, and spaces
                    pattern: /^[@#"&*!a-zA-Z0-9\s]+$/,
                    message: "Invalid characters in the title",
                  },
                ]}
              >
                <Input placeholder="Title" />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please enter a description",
                  },
                  {
                    validator: validateDescription,
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Description"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
              <Form.Item
                name="categories"
                label="Categories"
                rules={[
                  {
                    required: true,
                    message: "Please enter categories",
                  },
                  {
                    validator: validateCategories,
                  },
                ]}
              >
                <Input placeholder="Categories" />
              </Form.Item>
              <Form.Item
                name="authorNames"
                label="Author Names"
                rules={[
                  {
                    required: true,
                    message: "Please enter author names",
                  },
                  {
                    type: "array",
                    validator: (_, value) => {
                      if (value.length > 3) {
                        return Promise.reject("Max 3 authors allowed");
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Select mode="tags" placeholder="Author Names" />
              </Form.Item>
              <Form.Item
                name="publisher"
                label="Publisher"
                rules={[
                  {
                    required: true,
                    message: "Please enter a publisher",
                  },
                  {
                    validator: validatePublisher,
                  },
                ]}
              >
                <Input placeholder="Publisher" />
              </Form.Item>
              <Form.Item
                name="year"
                label="Year"
                rules={[
                  {
                    required: true,
                    message: "Please enter a year",
                  },
                  {
                    validator: validateYear,
                  },
                ]}
              >
                <Input placeholder="Year" />
              </Form.Item>
              <Form.Item
                name="pageNumbers"
                label="Page Numbers"
                rules={[
                  {
                    required: true,
                    message: "Please enter the number of pages",
                  },
                  {
                    validator: (_, value) => {
                      const numericValue = parseFloat(value);

                      if (
                        !isNaN(numericValue) &&
                        Number.isInteger(numericValue) &&
                        numericValue >= 1 &&
                        numericValue <= 9999
                      ) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        "Page numbers must be between 1 and 9999"
                      );
                    },
                  },
                ]}
              >
                <Input placeholder="Page Numbers" />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <label
                htmlFor="image-upload"
                className={styles["image-upload-label"]}
              >
                Import image .jpg, .png, .gif
              </label>
              <input
                type="file"
                id="image-upload"
                accept=".jpg, .jpeg, .png, .gif"
                onChange={handleImageChange}
                style={{
                  cursor: "pointer",
                  backgroundColor: "white !important",
                }}
              />

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className={styles["image-preview"]}
                  style={{ width: "100%", height: "auto" }}
                />
              )}
              <br />
              <br />
              <Form.Item
                name="options"
                label="Options"
                rules={[
                  {
                    required: true,
                    message: "Please enter options",
                  },
                ]}
              >
                <Input placeholder="Options" />
              </Form.Item>
              <Form.Item
                name="rating"
                label="Rating"
                rules={[
                  {
                    required: true,
                    message: "Please enter a rating",
                  },
                ]}
              >
                <Input placeholder="Rating" />
              </Form.Item>
              <Form.Item
                name="isbn10"
                label="ISBN-10"
                rules={[
                  {
                    required: true,
                    message: "Please enter ISBN-10",
                  },
                  {
                    validator: validateISBN10,
                  },
                ]}
              >
                <Input placeholder="ISBN-10" />
              </Form.Item>
              <Form.Item
                name="isbn13"
                label="ISBN-13"
                rules={[
                  {
                    required: true,
                    message: "Please enter ISBN-13",
                  },
                  {
                    validator: validateISBN13,
                  },
                ]}
              >
                <Input placeholder="ISBN-13" />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Button onClick={handleAddAnotherBook}>Add another book</Button>
        {/* Display the last added book image and title */}
        {books.length > 0 && (
          <div>
            <p>Last Added Book:</p>
            {books.map((book) => (
              <div key={book.isbn13}>
                {book.title && <p>Title: {book.title}</p>}
                {book.image && (
                  <img
                    src={book.image}
                    className={styles["image-preview"]}
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
        &nbsp;&nbsp;&nbsp;
        <Button onClick={handleAddBook} style={{ padding: "0 5rem" }}>
          SAVE
        </Button>
      </Form>
      <br />
    </>
  );
};

export default ProductCreationPage;
