import Home from "./components/LoginHome";
import React from "react";
import './index.css';
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import DocumentSummaryUploader from "./components/chatfield";


function App() {
  return (
   <>
   <AuthProvider>
     <Navbar/>
     <Home/>
   </AuthProvider>
   
   </>
  );
}

export default App;