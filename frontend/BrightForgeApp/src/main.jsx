import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css'
import App from './App.jsx'

import SplashPage from "./pages/SplashPage.jsx"
import ErrorPage from "./Pages/ErrorPage.jsx"
import WidgetListPage from "./Pages/WidgetListPage.jsx";
import AdminPage from "./Pages/AdminPage.jsx";
import AboutPage from "./Pages/AboutPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx"
import ProtectedRoute from "./router/ProtectedRoute.jsx";
import RegistrationPage from "./Pages/RegistrationPage.jsx";
import {EditWidgetPage} from "./Pages/EditWidgetPage.jsx";
import {CartProvider} from "./context/CartContext.jsx";
import {CartPage} from "./Pages/CartPage.jsx";

const router = createBrowserRouter([
    {
        path:"/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {path: "splash", element: <SplashPage />},
            {path: "widgets", element: <WidgetListPage />},
            {path: "login", element: <LoginPage />},
            {path: "edit/:id", element: (
                <ProtectedRoute>
                    <EditWidgetPage />
                </ProtectedRoute>
                )
            },
            {path: "cart", element: <CartPage />},
            {path: "about", element: <AboutPage />},
            {path: "register", element: <RegistrationPage />},
            {index: true, element: <SplashPage />},
            {
                path: "admin",
                element: (
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
          <CartProvider>
              <RouterProvider router={router} />
          </CartProvider>
      </AuthProvider>
  </StrictMode>,
)
