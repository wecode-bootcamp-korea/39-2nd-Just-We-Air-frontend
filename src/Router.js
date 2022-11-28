import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Booking from './pages/Booking/Booking';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import MobileTicket from './pages/MobileTicket/MobileTicket';
import SignUp from './pages/SignUp/SignUp';
import Payment from './pages/Payment/Payment';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

export default function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/MobileTicket " element={<MobileTicket />} />
        <Route path="/Payment " element={<Payment />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
