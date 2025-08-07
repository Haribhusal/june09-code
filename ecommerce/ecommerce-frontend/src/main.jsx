import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import RootLayout from './layouts/RootLayout.jsx';
import HomePage from './pages/HomePage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
        path: "/product/:id",
        element: <ProductDetailPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      }
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
