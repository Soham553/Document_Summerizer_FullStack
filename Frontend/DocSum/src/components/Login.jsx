import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <>
      <div className="bg-gray-900 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Login Into Your Account
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">
                Your email
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
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
    </>
  );
}
