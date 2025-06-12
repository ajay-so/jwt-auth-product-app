import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import DetailProduct from './components/DetailProduct';
import UpdateProduct from './components/UpdateProduct';
import FeaturedProducts from './components/FeaturedProducts';
import NotFound from './components/Notfound';
import ProductsPriceLess from './components/ProductsPriceLess';
import ProductsPriceMore from './components/ProductsPriceMore';

// Rendering the app
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Routes>
        
          <Route path="/" element={<Navigate to="/products" />} />
          
          <Route path="/products" element={<HomePage />} />
          <Route path="/products/:id" element={<DetailProduct />} />
          <Route path="/products/featured" element={<FeaturedProducts />} />
          <Route path="/products/update/:id" element={<UpdateProduct />} />
          <Route path="/products/newProduct" element={<AddProduct />} />
          <Route path="/products/price/less/:value" element={<ProductsPriceLess />} />
          <Route path="/products/price/more/:value" element={<ProductsPriceMore />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/login" element={<Login />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </BrowserRouter>
);
