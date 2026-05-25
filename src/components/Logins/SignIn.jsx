// import { useContext, useState } from "react";
import Input from "./CustomInput";
import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAuthContext from "../../../store/authContext";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const userAuthCotxt = useContext(UserAuthContext);
  const navigate = useNavigate();

  async function handleLogIn(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await userAuthCotxt.signIn(email, password);

      if (result && result.success) {
        navigate('/');
      } else {
        setError(
          result.error?.message ||
            "Invalid email or password. Please try again."
        );
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("SignIn Error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-10">
      
      {/* Background Blur Effect */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-gray-200/40 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gray-300/30 blur-3xl"></div>

      <div className="relative w-full max-w-md rounded-3xl border border-gray-200 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
        
        {/* Logo / Brand */}
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full border border-gray-200 bg-gray-100 px-4 py-1 text-xs font-bold uppercase tracking-[0.3em] text-gray-500 shadow-sm">
            JAHA
          </span>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            Sign in to continue shopping premium fashion collections.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogIn} className="space-y-6">
          
          <div className="space-y-5">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
            />

            <Input
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>

          {/* Forgot Password */}
          {/* <div className="flex justify-end">
            <button
              type="button"
              className="text-sm font-medium text-gray-500 transition hover:text-black hover:underline"
            >
              Forgot password?
            </button>
          </div> */}

          {/* Submit */}
          <button
            disabled={isLoading}
            className="w-full rounded-2xl bg-black py-4 text-sm font-bold uppercase tracking-[0.25em] text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-2xl active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isLoading ? "Authenticating..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="px-4 text-xs uppercase tracking-widest text-gray-400">
              OR
            </span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {/* Signup Redirect */}
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-black transition hover:underline underline-offset-4"
            >
              Create Account
            </Link>
          </p>

          {/* Error */}
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

export default SignIn;
// import Input from "./CustomInput";
// import { Link, useNavigate } from "react-router-dom";
// import UserAuthContext from "../../../store/authContext";

// function SignIn() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const userAuthCotxt = useContext(UserAuthContext);
//   const navigate = useNavigate();

//   async function handleLogIn(e) {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null); 

//     try {
//       const result = await userAuthCotxt.signIn(email, password);

      
//       if (result && result.success) {
//         navigate('/');
//       } else {
//         // Safe access to error message from Supabase return
//         setError(result.error?.message || "Invalid email or password. Please try again.");
//       }
//     } catch (err) {
//       setError("An unexpected error occurred. Please try again.");
//       console.error("SignIn Error:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-[100vh] flex items-center justify-center px-4 bg-black/10">
//       <div className="w-full max-w-md bg-white/80 p-8 rounded-2xl shadow-xl border border-gray-100">
        
//         {/* Heading Section */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-extrabold tracking-tighter text-black uppercase">
//             Welcome Back
//           </h1>
//           <p className="text-gray-500 text-sm mt-2">
//             Enter your details to access your JAHA account
//           </p>
//         </div>

//         <form onSubmit={handleLogIn} className="space-y-6">
//           <div className="space-y-4">
//             <Input
//               onChange={(e) => setEmail(e.target.value)}
//               label="Email"
//               id="email"
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//             />

//             <Input
//               onChange={(e) => setPassword(e.target.value)}
//               label="Password"
//               id="password"
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//             />
//           </div>

//           {/* Action Section */}
//           <div className="space-y-4 pt-2">
//             <button
//               disabled={isLoading}
//               className="w-full py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 active:scale-[0.98] transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
//             >
//               {isLoading ? "Authenticating..." : "Sign In"}
//             </button>

//             <p className="text-center text-sm text-gray-600">
//               Don't have an account?{" "}
//               <Link
//                 to="/signup"
//                 className="font-bold text-black hover:underline underline-offset-4"
//               >
//                 Sign up
//               </Link>
//             </p>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="p-3 rounded-lg bg-red-50 border border-red-200">
//               <p className="text-red-600 text-xs text-center font-medium">
//                 {error}
//               </p>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignIn;