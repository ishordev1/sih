import { useState } from 'react'
import './App.css'
import Navbar from './component/common/navbar/Navbar'
import Signup from './component/common/signup/Signup'
import SignIn from './component/common/signin/SignIn'
import { Route, Routes } from 'react-router-dom'
import Footer from './component/common/footer/Footer'
import { BasePage } from './pages/passenger/BasePage'
import PassengerDashboard from './pages/passenger/dashboard/PassengerDashboard'
import Home from './pages/common/Home'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
    <Navbar/>
    <ToastContainer />
     <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path='/' element={<Home/>}/>
    <Route path="/passenger" element={<BasePage />}>
      <Route path="dashboard" element={<PassengerDashboard />} />
    </Route>

     </Routes>
  <Footer/>
    
    </>
  )
}

export default App
