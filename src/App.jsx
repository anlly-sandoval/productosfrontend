import React from "react"
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductsFormPage from "./pages/ProductsFormPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";
import { ProductsProvider } from "./context/ProductContext";
import NotFound from "./pages/NotFound";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllProductsPage from "./pages/AllProductsPage";
import Cart from "./components/Cart";
import SalesPage from "./pages/SalesPage";
import { OrdersProvider } from "./context/OrderContext";
import OrdersPage from "./pages/OrdersPage";
import IdValidator from "./context/idValidator";

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <OrdersProvider>
       <BrowserRouter>
       <main className="container mx-auto px-10">
       <Navbar/>
       <ToastContainer
          position="top-right"
          autoClose={3000}
          limit={3}
          hideProgressBar={false}
          theme="light"/>
        <Routes>
          {/*Rutas publicas*/}
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />

          {/*Rutas privadas*/}
          <Route element={<ProtectedRoute/>}>
            <Route path='/profile' element={<ProfilePage/>} />
            <Route path='/products' element={<ProductsPage/>} />
            <Route path='/add-product' element={<ProductsFormPage/>} />
            {/**Ruta con validacion de Id */}
            <Route path="/products/:id" element={
              <IdValidator>
                <ProductsFormPage/>
              </IdValidator>
            } />
            <Route path="/getallproducts" element={<AllProductsPage/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/sale" element={<SalesPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Route>
          {/*Ruta 404 para rutas no existentes */}
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        </main>
       </BrowserRouter>
       </OrdersProvider>
      </ProductsProvider>
    </AuthProvider>
  )
}

export default App;
