import { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/"); // redirect to home
    } catch (error) {
      setErrorMsg(error.message.replace("Firebase: ", ""));
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center">
      <form onSubmit={handleAuth} className="w-full max-w-md p-8 bg-slate-800/40 backdrop-blur-md rounded-2xl shadow-xl border border-slate-700/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 tracking-tight text-white">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
          <p className="text-slate-400 text-sm">
            {isSignUp ? "Sign up to get started" : "Sign in to your account"}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]">
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(""); }}
            className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}