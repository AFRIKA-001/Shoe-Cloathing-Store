import Input from "./CustomInput"
import { Link } from "react-router-dom"


function SignIn() {



  return (
    <>
    <form  className="max-w-md">
    <div>
     <Input label="email" id="email" type="email" name="email" />
     <Input label="password" id="password" type="password" name="password" />
    </div>
    
    <p>Don't have an account? <Link to='/signup'> sign up</Link></p>
    <button className="w-full py-2 bg-black text-white">Login</button>
    </form>
    </>
  )
}

export default SignIn
