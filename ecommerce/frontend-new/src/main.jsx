import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router'
import PublicLayout from './layouts/public-layout.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import CartPage from './pages/CartPage.jsx'
import HomePage from './pages/HomePage.jsx'

const ourRoutes = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
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
        path: '/product-details/:slug',
        element: <ProductDetailPage />
      },
      {
        path: '/cart',
        element: <CartPage />
      }
    ]
  },
  {
    path: "/faq",
    element: <h1>This is FAQ page</h1>
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={ourRoutes}>
  </RouterProvider>
)
