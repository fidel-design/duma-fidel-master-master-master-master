
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproduct from './components/Addproduct';
import Makepayment from './components/Makepayment';
import Getproduct from './components/Getproduct';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import Navbar from './components/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Carousel from './components/Carousel';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './components/Home';
import Chatbot from "./components/Chatbot";




function App() {
  
  return (
    <CartProvider>
      <BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} />
        <div className="App">

         <Navbar />
         

          <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/signup' element={<Signup />} />
  <Route path='/signin' element={<Signin />} />
  <Route path='/addproduct' element={<Addproduct />} />
  <Route path='/makepayment' element={<Makepayment />} />
  <Route path='/cart' element={<Cart />} />
</Routes>

      <a
  href="https://wa.me/254799961188"
  target="_blank"
  rel="noopener noreferrer"
  className="whatsapp-float"
  title="Chat with us on WhatsApp"
>
  <i className="bi bi-whatsapp"></i>
</a>



          <Footer />
          <Chatbot />
        </div>
      </BrowserRouter>
      
    </CartProvider>
    
  );
}

export default App;
