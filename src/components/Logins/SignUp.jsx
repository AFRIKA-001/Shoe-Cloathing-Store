import { useContext, useState } from "react";
import Input from "./CustomInput";
import { Link, useNavigate } from "react-router-dom";
import UserAuthContext from "../../../store/authContext";

function SignUp() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const userAuthCtx = useContext(UserAuthContext);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        console.log("Attempting to sign up with:", {
            userName,
            email,
            password,
        });

        try {
            const result = await userAuthCtx.signUp(
                email,
                password,
                userName
            );

            if (result && result.success) {
                navigate('/');
            } else {
                setError(
                    result.error?.message ||
                        "There was an error signing up"
                );
            }
        } catch (err) {
            setError(
                "An unexpected error occurred. Please try again.",
                err
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-12">
            
            {/* Background Glow */}
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-gray-200/40 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gray-300/30 blur-3xl"></div>

            <div className="relative w-full max-w-md rounded-3xl border border-gray-200 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
                
                {/* Header */}
                <div className="mb-10 text-center">
                    <span className="inline-block rounded-full border border-gray-200 bg-gray-100 px-4 py-1 text-xs font-bold uppercase tracking-[0.3em] text-gray-500 shadow-sm">
                        JAHA
                    </span>

                    <h1 className="mt-5 text-4xl font-black tracking-tight text-gray-900">
                        Create Account
                    </h1>

                    <p className="mt-3 text-sm leading-relaxed text-gray-500">
                        Join the next generation fashion experience and start
                        shopping premium collections.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSignUp} className="space-y-6">
                    
                    <div className="space-y-5">
                        <Input
                            onChange={(e) => setUserName(e.target.value)}
                            label="Username"
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Gabriel ..."
                        />

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

                    {/* Terms */}
                    <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                        <input
                            type="checkbox"
                            className="mt-1 h-4 w-4 rounded border-gray-300"
                        />

                        <p className="text-xs leading-relaxed text-gray-500">
                            By creating an account, you agree to our{" "}
                            <span className="font-semibold text-black">
                                Terms
                            </span>{" "}
                            and{" "}
                            <span className="font-semibold text-black">
                                Privacy Policy
                            </span>.
                        </p>
                    </div>

                    {/* Button */}
                    <button
                        disabled={isLoading}
                        className="w-full rounded-2xl bg-black py-4 text-sm font-bold uppercase tracking-[0.25em] text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-2xl active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                        {isLoading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                    {/* Divider */}
                    <div className="relative flex items-center py-1">
                        <div className="h-px flex-1 bg-gray-200"></div>

                        <span className="px-4 text-xs uppercase tracking-widest text-gray-400">
                            OR
                        </span>

                        <div className="h-px flex-1 bg-gray-200"></div>
                    </div>

                    {/* Redirect */}
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?
                        <Link
                            to="/signin"
                            className="ml-1 font-semibold text-black transition hover:underline underline-offset-4"
                        >
                            Sign in
                        </Link>
                    </p>

                    {/* Error Message */}
                    {error && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 shadow-sm">
                            <p className="text-center text-sm font-medium text-red-600">
                                {error}
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default SignUp;







//  import { useContext, useState } from "react"
// import Input from "./CustomInput"
// import { Link, useNavigate } from "react-router-dom"
// import UserAuthContext from "../../../store/authContext"

// function SignUp() {
//     const [userName, setUserName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [isLoading, setIsLoading] = useState(false)
//     const [error, setError] = useState(null)

//     const userAuthCtx = useContext(UserAuthContext)
//     const navigate = useNavigate()

//     const handleSignUp = async (e) => {
//         e.preventDefault();
//         setError(null);
//         setIsLoading(true);
//       console.log("Attempting to sign up with:", { userName, email, password });
     
//         try {
//             const result = await userAuthCtx.signUp(email, password, userName);
            
//             if (result && result.success) {
//                 navigate('/');
//             } else {
                
//                 setError(result.error?.message || "There was an error signing up");
//             }
//         } catch (err) {
//             setError("An unexpected error occurred. Please try again.",err);
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     return (
//         <div className="min-h-[100vh] flex items-center justify-center bg-black/10 px-4 py-12">
//             <div className="w-full max-w-md bg-white/80 p-8 rounded-2xl shadow-xl border border-gray-100">
                
//                 {/* Heading Section */}
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-extrabold tracking-tighter text-black uppercase">
//                         Join JAHA
//                     </h1>
//                     <p className="text-gray-500 text-sm mt-2">
//                         Create an account to start your next generation fashion journey
//                     </p>
//                 </div>

//                 <form onSubmit={handleSignUp} className="space-y-5">
//                     {/* Name Grid */}
//                     <div >
//                         <Input 
//                             onChange={(e) => setUserName(e.target.value)} 
//                             label="Username" 
//                             id='username' 
//                             type="text" 
//                             name="username" 
//                             placeholder="Gabriel ..."
//                         />
//                        </div>

//                     <div className="space-y-4">
//                         <Input 
//                             onChange={(e) => setEmail(e.target.value)} 
//                             label="Email Address" 
//                             id="email" 
//                             type="email" 
//                             name="email" 
//                             placeholder="name@example.com"
//                         />
//                         <Input 
//                             onChange={(e) => setPassword(e.target.value)} 
//                             label="Password" 
//                             id="password" 
//                             type="password" 
//                             name="password" 
//                             placeholder="••••••••"
//                         />
//                     </div>
                    
//                     <div className="pt-2 space-y-4">
//                         <button 
//                             disabled={isLoading} 
//                             className="w-full py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 active:scale-[0.98] transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
//                         >
//                             {isLoading ? "Creating Account..." : "Create Account"}
//                         </button>

//                         <p className="text-center text-sm text-gray-600">
//                             Already have an account? 
//                             <Link to='/signin' className="ml-1 font-bold text-black hover:underline underline-offset-4">
//                                 Sign in
//                             </Link>
//                         </p>
//                     </div>

//                     {/* Error Message Display */}
//                     {error && (
//                         <div className="p-3 rounded-lg bg-red-50 border border-red-200 animate-pulse">
//                             <p className="text-red-600 text-xs text-center font-medium">{error}</p>
//                         </div>
//                     )}
//                 </form>
//             </div>
//         </div>
//     ) 
// }

// export default SignUp