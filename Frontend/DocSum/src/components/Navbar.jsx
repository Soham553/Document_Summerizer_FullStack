import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <>
      <div className="bg-gradient-to-b from-[#0d0d2b] to-[#181836] text-white w-full h-20 flex flex-row justify-between items-center px-6">
        <h1 id="my-element" className="text-2xl font-bold text-zinc-300 animate__bounce">DocSum</h1>
        <div className="flex flex-row gap-4">
          <Link
            to="/register"
          className="px-6 py-3 rounded-xl border border-gray-600 bg-transparent text-white font-medium hover:bg-gray-800 transition">
            Sigin
          </Link>
           <Link
            to="/Login"
            className="px-6 py-3 rounded-xl border border-gray-600 bg-transparent text-white font-medium hover:bg-gray-800 transition">
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
