export interface BookData {
  isbn: string;
  title: string;
  subtitle: string;
  author: string;
  published: string;
  publisher: string;
  pages: number;
  description: string;
  website: string;
}

export const fetchBooks = async (): Promise<BookData[]> => {
  try {
    const response = await fetch(
      "https://gist.githubusercontent.com/nanotaboada/6396437/raw/855dd84436be2c86e192abae2ac605743fc3a127/books.json"
    );
    const data = await response.json();
    return data.books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export const getBookById = async (bookId: string) => {
  try {
    // Fetch all books
    const books = await fetchBooks();

    // Find the product with the specified ID in the fetched books
    const book = books.find((book) => book.isbn === bookId);

    if (!book) {
      throw new Error(`Book with ID ${bookId} not found!`);
    }

    return book;
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    throw error;
  }
};
