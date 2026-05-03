import { Outlet } from "react-router-dom"
import NavBar from "./src/components/NavBar.jsx"
import Footer from "./src/components/footer.jsx";

function RootLayout() {
  return (
    <div>
     <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default RootLayout;
