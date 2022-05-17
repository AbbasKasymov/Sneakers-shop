import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminPanel from "./pages/AdminPanel";
import CartPage from "./pages/CartPage";
import CustomersReview from "./pages/CustomersReview";
import EditProductPage from "./pages/EditProductPage";
import FavoritesPages from "./pages/FavoritesPages";
import MainPage from "./pages/MainPage";
import MensSneakers from "./pages/MensSneakers";
import NotFound from "./pages/NotFound";
import WomenSkeakers from "./pages/WomenSkeakers";

const Navigation = ({ toggleTheme }) => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/cart-page" element={<CartPage />} />
        <Route path="/review/:id" element={<CustomersReview />} />
        <Route path="/favorites" element={<FavoritesPages />} />
        <Route path="/" element={<MainPage toggleTheme={toggleTheme} />} />
        <Route path="/mens-sneakers" element={<MensSneakers />} />
        <Route path="/women-sneakers" element={<WomenSkeakers />} />
        <Route path="/admin-panel/edit/:id" element={<EditProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
