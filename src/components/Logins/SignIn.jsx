import { useContext, useState } from "react"
import Input from "./CustomInput"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import UserAuthContext from "../../../store/authContext"


function SignIn() {
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [error,setError] = useState(null)
const [isLoading,setIsLoading] = useState(false)

const userAuthCotxt = useContext(UserAuthContext);
const navigate = useNavigate();

async function handleLogIn (e) {
  setIsLoading(true)
e.preventDefault()
try {
  const result =  await userAuthCotxt.SignIn(email,password);
  if(result && result.success){
    navigate('/')
  }else{
    setError(error.message || "you have used invalid credentials")
  }
} catch (error) {
  setError(error)
}finally{
setIsLoading(false)
}
}



  return (
    <>
    <form  onSubmit={handleLogIn} className="max-w-md">
    <div>
     <Input onchange={(e) => setEmail(e.target.value)} label="email" id="email" type="email" name="email" />
     <Input onchange={(e) => setPassword(e.target.value)}  label="password" id="password" type="password" name="password" />
    </div>
    
    <p>Don't have an account? <Link to='/signup'> sign up</Link></p>
    <button disabled={isLoading} className="w-full py-2 bg-black text-white">Login</button>
    {error && <p>{error}</p>}
    </form>
    </>
  )
}

export default SignIn
