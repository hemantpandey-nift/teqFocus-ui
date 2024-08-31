import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./utils/NotFound";
import UserRegistrationForm from "./pages/user/userRegistration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserRegistrationForm />}></Route>
        <Route path="/user/register" element={<UserRegistrationForm />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
