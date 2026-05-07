import { useContext, useState } from "react"
import Input from "./CustomInput"
import { Link ,useNavigate} from "react-router-dom"
import UserAuthContext from "../../../store/authContext"



function SignUp() {
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

const usercartctx = useContext(UserAuthContext)
 const navigate = useNavigate() 


const handleSignUp = async (e) => {
    e.preventDefault();
    try{
     setIsLoading(true)
    const result = await usercartctx.SignUp(email,password,username);
    if(result.success){
      navigate('/')
    }
    }catch(error){
      setError(error.message || "there was an error signing up")
    }finally{
      setIsLoading(false)
    }

}



  return (
    <>
    <div >
       <form onSubmit={handleSignUp}  className="max-w-md">
          <div>
            <Input onChange={(e) => setUserName(e.target.input)} label="first name" id='first-name' type="text" name="first-name" />
            <Input onChange={(e) => setUserName(e.target.input)} label="last name"  id="last-name" type="text" name="last-name"/>
          </div>
      
          <div>
           <Input onChange={(e) => setEmail(e.target.input)} label="email" id="email" type="email" name="email" />
           <Input onChange={(e)=> setPassword(e.target.input)} label="password" id="password" type="password" name="password" />
          </div>
          
          <p>Already have an account? <Link to='/signin'> sign in</Link></p>
          <button disabled={isLoading} className="w-full py-2 bg-black text-white">create account</button>
          {error && <p>{error}</p>}
          </form>
    </div>
  
    </>
  ) 
}

export default SignUp
