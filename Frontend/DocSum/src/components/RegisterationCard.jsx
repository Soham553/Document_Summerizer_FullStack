import { useState } from "react";
import {useAuth} from "../context/AuthContext";



export default function SignupForm() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const { register } = useAuth();
    const handlesubmit = async (e) => {
        e.preventDefault();
        await register(email, username, password);
    }

  return (
    <div className="bg-gray-900 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">

        <h2 className="text-2xl font-bold text-white text-center">
          Create your Free Account
        </h2>

        <div className="flex align-center justify-center">
          <button className="w-1/2 flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-100">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign up with Google
          </button>
        </div>

        <div className="flex items-center text-gray-400">
          <hr className="flex-1 border-gray-600" />
          <span className="px-2 text-sm">or</span>
          <hr className="flex-1 border-gray-600" />
        </div>

        <form className="space-y-4 " onSubmit={handlesubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Your email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
             <label className="block mb-1 text-sm font-medium text-gray-300">
              UserName
             </label>
             <input type="text" placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex items-start">
            <input
              type="checkbox"
              className="w-4 h-4 mt-1 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-400">
              By signing up, you agree to our{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Privacy Policy
              </a>.
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 text-white font-medium rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}
