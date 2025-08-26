import React from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";

export default function Home() {
  return (
    <>
     <div className="bg-gradient-to-b h-screen from-[#0d0d2b] to-[#09091a] text-whiteh-screen flex flex-cloum items-center justify-center">
        <div className="text-center max-w-2xl px-4 ">
        <div className="inline-block mb-6">
          <span className="px-4 py-1 rounded-full border border-purple-500/60 bg-purple-500/20 text-purple-300 font-semibold text-sm">
            DocSum 2025
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-white">
          The AI Tool <br />
          <span className="text-gray-300 font-normal">for the Summerization</span>
        </h1>

        <p className="text-lg text-gray-400 mb-8">
          DocSum is an Document Summerization tool <br />
          with Citation and Chatbot.
        </p>

        <div className="flex items-center justify-center gap-4">
           <Link 
           to="/register"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg hover:opacity-90 transition">
            Get Started
         </Link>
          <a
            href=""
            className="px-6 py-3 rounded-xl border border-gray-600 bg-transparent text-white font-medium hover:bg-gray-800 transition"
          >
            About Us
          </a>
        </div>
      </div>
     </div>
    </>
  );
}
