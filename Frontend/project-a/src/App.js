import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./CustomComponents/Header/Header";
import Footer from "./CustomComponents/Footer/Footer";
import RegistrationForm from "./CustomComponents/RegistrationForm/Registration";
import DashBoard from "./CustomComponents/DashBoard/DashBoard";
import Home from "./CustomComponents/Home/Home";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
