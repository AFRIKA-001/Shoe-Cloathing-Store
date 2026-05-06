import Input from "./CustomInput"
import { Link } from "react-router-dom"

function SignUp() {









  return (
    <>
    <div >
       <form  className="max-w-md">
          <div>
            <Input label="first name" id='first-name' type="text" name="first-name" />
            <Input label="last name"  id="last-name" type="text" name="last-name"/>
          </div>
      
          <div>
           <Input label="email" id="email" type="email" name="email" />
           <Input label="password" id="password" type="password" name="password" />
          </div>
          
          <p>Already have an account? <Link to='/signin'> sign in</Link></p>
          <button className="w-full py-2 bg-black text-white">create account</button>
          </form>
    </div>
  
    </>
  ) 
}

export default SignUp
