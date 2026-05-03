import { Outlet } from "react-router-dom"
import NavBar from "./src/components/NavBar.jsx"

function RootLayout() {
  return (
    <div>
     <NavBar/>
      <Outlet/>
    </div>
  )
}

export default RootLayout;
