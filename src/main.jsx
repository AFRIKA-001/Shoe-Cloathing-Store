import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from '../routes.jsx'
import { CartContextProvider } from '../store/cartContext.jsx'
import { UserAuthContextProvider } from '../store/authContext.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthContextProvider>
      <CartContextProvider>
        <Toaster position="top-left" reverseOrder={false} toastOptions={{
    duration: 1000,
    style: {
      background: "#fff",
      color: "#000",
      borderRadius: "14px",
      padding: "14px 18px",
      fontWeight: "600",
      fontFamily:"monospace",
      fontSize:"12px"
    },
  }}/>
        <RouterProvider router={router}></RouterProvider>
      </CartContextProvider>
    </UserAuthContextProvider>

  </StrictMode>,
)
