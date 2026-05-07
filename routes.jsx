import { createBrowserRouter} from "react-router-dom";
import App from "./src/App";
import RootLayout from "./RootLayout.jsx";
import Mens from "./src/components/Mens.jsx";
import Women from "./src/components/Women.jsx";
import Kids from "./src/components/Kids.jsx";
import New from "./src/components/New.jsx";
import DetailsPage from "./src/components/DetailsPage.jsx";
import Cart from "./src/components/Cart.jsx";
import SignIn from "./src/components/Logins/SignIn.jsx";
import SignUp from "./src/components/Logins/SignUp.jsx";
import ProtectedRoute from "./src/components/Protected/ProtectedRoute.jsx";


const router = createBrowserRouter([
    {
        path:'/',
        element:<RootLayout />,
        children:[
        {index:true,element:<App/>},
        {path:'/cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},
        {path:'/men',element:<ProtectedRoute><Mens/></ProtectedRoute>},
        {path:'/women',element:<ProtectedRoute><Women/></ProtectedRoute>},
        {path:'/kids',element:<ProtectedRoute><Kids/></ProtectedRoute>},
        {path:'/newarrivals',element:<ProtectedRoute><New/></ProtectedRoute>},
        {path:'/signin',element:<SignIn/>},
        {path:'/signup',element:<SignUp/>},
    
        {path:'/products/:category/:productid',element:<DetailsPage/>}

        ]

    },
   
]);
export default router;