import React from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AboutApp from "./pages/AboutApp";
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import Add from './pages/user/Add';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/add-user" exact element={<Add />} />
        <Route path="/edit-user/:id" exact element={<Add />} />
      </Routes>
      <AboutApp />
    </div>
  );
}

export default App;
