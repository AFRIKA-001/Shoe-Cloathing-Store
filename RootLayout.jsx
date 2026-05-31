import { Outlet } from "react-router-dom"
import NavBar from "./src/components/NavBar.jsx"
import Footer from "./src/components/footer.jsx";
import { Whatsapp } from "./whatsapp.jsx";

function RootLayout() {
  return (
    <div>
     <NavBar/>
      <Outlet/>
      <Whatsapp />
      <Footer/>
    </div>
  )
}

export default RootLayout;
