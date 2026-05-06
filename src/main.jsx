import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from '../routes.jsx'
import { CartContextProvider } from '../store/cartContext.jsx'
import { UserAuthContextProvider } from '../store/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthContextProvider>
      <CartContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </CartContextProvider>
    </UserAuthContextProvider>

  </StrictMode>,
)
