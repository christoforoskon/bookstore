import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
// import Book from "./components/Book/Book";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductCreationPage from "./pages/ProductCreationPage/ProductCreationPage";
import ProductSearchPage from "./pages/ProductSearchPage/ProductSearchPage";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-product" element={<ProductCreationPage />} />
        <Route path="/product/:bookId" element={<ProductPage />} />
        <Route path="/search" element={<ProductSearchPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
