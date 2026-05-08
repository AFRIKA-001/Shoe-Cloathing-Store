 import { useContext, useState } from "react"
import Input from "./CustomInput"
import { Link, useNavigate } from "react-router-dom"
import UserAuthContext from "../../../store/authContext"

function SignUp() {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const userAuthCtx = useContext(UserAuthContext)
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
      console.log("Attempting to sign up with:", { userName, email, password });
     
        try {
            const result = await userAuthCtx.signUp(email, password, userName);
            
            if (result && result.success) {
                navigate('/');
            } else {
                
                setError(result.error?.message || "There was an error signing up");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.",err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-[100vh] flex items-center justify-center bg-black/10 px-4 py-12">
            <div className="w-full max-w-md bg-white/80 p-8 rounded-2xl shadow-xl border border-gray-100">
                
                {/* Heading Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tighter text-black uppercase">
                        Join JAHA
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">
                        Create an account to start your next generation fashion journey
                    </p>
                </div>

                <form onSubmit={handleSignUp} className="space-y-5">
                    {/* Name Grid */}
                    <div >
                        <Input 
                            onChange={(e) => setUserName(e.target.value)} 
                            label="Username" 
                            id='username' 
                            type="text" 
                            name="username" 
                            placeholder="Gabriel ..."
                        />
                       </div>

                    <div className="space-y-4">
                        <Input 
                            onChange={(e) => setEmail(e.target.value)} 
                            label="Email Address" 
                            id="email" 
                            type="email" 
                            name="email" 
                            placeholder="name@example.com"
                        />
                        <Input 
                            onChange={(e) => setPassword(e.target.value)} 
                            label="Password" 
                            id="password" 
                            type="password" 
                            name="password" 
                            placeholder="••••••••"
                        />
                    </div>
                    
                    <div className="pt-2 space-y-4">
                        <button 
                            disabled={isLoading} 
                            className="w-full py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 active:scale-[0.98] transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            Already have an account? 
                            <Link to='/signin' className="ml-1 font-bold text-black hover:underline underline-offset-4">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    {/* Error Message Display */}
                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 border border-red-200 animate-pulse">
                            <p className="text-red-600 text-xs text-center font-medium">{error}</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    ) 
}

export default SignUp