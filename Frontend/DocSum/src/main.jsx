import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SignupForm from "./components/RegisterationCard";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './components/Login.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },{
    path: "/register",
    Component: SignupForm,
  },{
    path: "/login",
    Component: LoginPage
  }
]);

createRoot(root).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

