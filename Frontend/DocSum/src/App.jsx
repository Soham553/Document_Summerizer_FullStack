import Home from "./components/LoginHome";
import React from "react";
import './index.css';
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
   <>
   <AuthProvider>
    <Navbar />
    <Home />
   </AuthProvider>
   
   </>
  );
}

export default App;