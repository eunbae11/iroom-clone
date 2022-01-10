import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { RoomInfos, Home, Intro, Reservation, Login, Profile, ScrollTop} from "../pages/PagesIndex";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function AppRouter({ refreshUser, isLoggedIn, userObj }) {

  return (
    <>
      <BrowserRouter basename="/iroom-clone/">
      <ScrollTop />
        <Navigation isLoggedIn={isLoggedIn} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/intro/:roomNum" element={<RoomInfos />} />

          <Route path="/reservation" element={
            <Reservation 
            isLoggedIn={isLoggedIn} 
            userObj={userObj}
            />} 
          />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={
            <Profile 
            isLoggedIn={isLoggedIn} 
            userObj={userObj}
            />} 
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
