import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router'
import PublicLayout from './layouts/public-layout.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import CartPage from './pages/CartPage.jsx'
import HomePage from './pages/HomePage.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import RegisterPage from './pages/auth/RegisterPage.jsx'
import LoginPage from './pages/auth/LoginPage.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import DashboardPage from './pages/dashboard/DashboardPage.jsx'
import AddProductPage from './pages/dashboard/AddProductPage.jsx'
import AllProductsPage from './pages/dashboard/AllProductsPage.jsx'
import EditProductPage from './pages/dashboard/EditProductPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import OrdersPage from './pages/dashboard/OrdersPage.jsx';
import MyOrdersPage from './pages/dashboard/MyOrdersPage.jsx'

const ourRoutes = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/products',
        element: <ProductsPage />
      },
      {
        path: '/product-details/:id',
        element: <ProductDetailPage />
      },
      {
        path: '/cart',
        element: <CartPage />
      },
      {
        path: "/checkout",
        element: <CheckoutPage />
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <RegisterPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },

    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'add-product',
        element: <AddProductPage />
      },
      {
        path: 'all-products',
        element: <AllProductsPage />
      },
      {
        path: 'edit-product/:id',
        element: <EditProductPage />
      },
      {
        path: "orders",
        element: <OrdersPage />
      },
      {
        path: "my-orders",
        element: <MyOrdersPage />
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={ourRoutes}>
  </RouterProvider>
)
