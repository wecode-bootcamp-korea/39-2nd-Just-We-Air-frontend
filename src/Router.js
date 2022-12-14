import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Booking from './pages/Booking/Booking';
import BookingConfirm from './pages/BookingConfirm/BookingConfirm';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import MobileTicket from './pages/MobileTicket/MobileTicket';
import SignUp from './pages/SignUp/SignUp';
import Payment from './pages/Payment/Payment';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import RedirectHandler from './pages/Login/RedirectHandler';
import PaymentSuccess from './pages/Payment/PaymentSuccess';
import BookingDetails from './pages/BookingDetails/BookingDetails';
import ScrollToTop from './ScrollToTop';

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking-details" element={<BookingDetails />} />
        <Route path="/booking-confirm" element={<BookingConfirm />} />
        <Route path="/log-in" element={<Login />} />
        {/* <Route path="/oauth/callback/kakao" component={RedirectHandler} /> */}
        <Route path="/mobile-ticket" element={<MobileTicket />} />
        <Route path="/oauth/callback/kakao" element={<RedirectHandler />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
