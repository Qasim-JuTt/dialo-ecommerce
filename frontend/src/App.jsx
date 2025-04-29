import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import ProductDetail from './pages/home/ProductDetail'
import SignUp from './pages/auth/SignUp'
import AdminLogin from './pages/admin/auth/Login'
import SideBar from './components/admin/SideBar'
import Dashboard from './pages/admin/pages/Dashboard'
import Orders from './pages/admin/pages/Order'
import Product from './pages/admin/pages/Product'
import Customer from './pages/admin/pages/Customer'
import Inventory from './pages/admin/pages/Inventory'
import Sale from './pages/admin/pages/Sale'
import Report from './pages/admin/pages/Report'
import AdminProductDetail from './pages/admin/pages/SingleProductDetail'
import InventoryDetail from './pages/admin/pages/InventoryDetail'
import CreateProduct from './pages/admin/pages/CreateProduct'
import UpdateProduct from './pages/admin/pages/UpdateProduct'
import CreateInventory from './pages/admin/pages/CreateInventory'
import UpdateInventoryDetail from './pages/admin/pages/UpdateInventoryDetail'
import Login from './pages/auth/Login'
import AuthSuccess from './pages/auth/AuthSuccess'
import Sidebar from './components/Sidebar'
import CheckOut from './pages/purchase/CheckOut'
import Order from './pages/purchase/Order'
import CartPage from './pages/purchase/Cart'
import { CartProvider } from './context/CartContext'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <CartProvider>
      <Router>
      <Routes>

        {/* Frontend User Routes Url */}

        {/* Authentication route page */}
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login-page" element={<Login />} />
        <Route path="/auth-success" element={<AuthSuccess />} />




        {/* Home page routes */}
        <Route path="/" element={<Home />} />
        <Route path="/product-detail/:id?" element={<ProductDetail />} />


        {/* Backend Admin Route Url */}

        {/* Auth Route  Url */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-sidebar-page" element={<SideBar />} />
        <Route path="/admin-dashboard-page" element={<Dashboard />} />
        <Route path="/admin-order-page" element={<Orders />} />
        <Route path="/admin-product-page" element={<Product />} />
        <Route path="/admin-customer-page" element={<Customer />} />
        <Route path="/admin-sale-page" element={<Sale />} />
        <Route path="/admin-report-page" element={<Report />} />

        {/* Invenory Route  Url */}
        <Route path="/admin-inventory-page" element={<Inventory />} />
        <Route path="/admin-createInventory-page" element={<CreateInventory />} />


        {/* Product  Route  Url */}
        <Route path="/admin/product-detail/:id" element={<AdminProductDetail />} />
        <Route path="/admin-createProduct-page" element={<CreateProduct />} />
        <Route path="/admin-updateProduct-page/:id" element={<UpdateProduct />} />
        <Route path="/admin-inventoryDetail-page/:mainCategory?/:category?" element={<InventoryDetail />} />
        <Route path="/admin-updateInventory-page/:id?" element={<UpdateInventoryDetail />} />

        {/* User CheckOut  Route  Url */}
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/order" element={<Order />} />
        <Route path="/cart" element={<CartPage />} />




      </Routes>
    </Router>
    </CartProvider>
  )
}

export default App
