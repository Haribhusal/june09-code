import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
// Layout Import
import RootLayout from './layouts/RootLayout.jsx';

// Page Imports
import AboutPage from './pages/AboutPage.jsx';
import AllNewsPage from './pages/AllNewsPage.jsx'
import NewsDetailsPage from './pages/NewsDetailsPage.jsx';
import HomePage from './pages/HomePage.jsx'

const ourRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />

      },
      {
        path: '/about',
        element: <AboutPage />
      },
      {
        path: '/all-news',
        element: <AllNewsPage />
      },
      {
        path: '/news-details/:id',
        element: <NewsDetailsPage />
      }

    ]
  },

]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={ourRoutes} />,
)
