import { useContext } from "react"
import UserAuthContext from "../../../store/authContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {
const userAuthCtxt = useContext(UserAuthContext)
if(!userAuthCtxt.session){
    return <Navigate to='/signin' replace/>
}


  return children
    
}

export default ProtectedRoute
