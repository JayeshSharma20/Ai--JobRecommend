// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Login from './Auth/Login'
import PdfUpload from './Components/PdfUpload'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Route, Routes } from 'react-router-dom';
import Signup from './Auth/Signup';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> 
      <Route path="/PdfUpload" element={<PdfUpload />} />
    {/* <Login/> */}
    {/* <PdfUpload /> */}
    </Routes>
 </>
  )
}

export default App
