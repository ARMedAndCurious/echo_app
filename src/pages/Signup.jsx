import { useState } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created!");
      navigate("/"); // go to home after signup
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSignup} className="p-6 bg-white rounded shadow">
        <h2 className="text-xl mb-4">Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-3 w-full"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-3 w-full"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-black text-white px-4 py-2 w-full">
          Sign Up
        </button>
      </form>
    </div>
  );
}