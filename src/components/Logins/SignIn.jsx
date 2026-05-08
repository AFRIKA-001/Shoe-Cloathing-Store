 import { useContext, useState } from "react";
import Input from "./CustomInput";
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
        // Safe access to error message from Supabase return
        setError(result.error?.message || "Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("SignIn Error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        
        {/* Heading Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tighter text-black uppercase">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Enter your details to access your JAHA account
          </p>
        </div>

        <form onSubmit={handleLogIn} className="space-y-6">
          <div className="space-y-4">
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

          {/* Action Section */}
          <div className="space-y-4 pt-2">
            <button
              disabled={isLoading}
              className="w-full py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 active:scale-[0.98] transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? "Authenticating..." : "Sign In"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-black hover:underline underline-offset-4"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-red-600 text-xs text-center font-medium">
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