import React from "react";
import { Routes, Route } from "react-router-dom";
import Detail from "./views/Detail/Detail";
import Home from "./views/home/home.component";
import CreateProduct from "./views/create/create.view";
import Registro from "./Components/RegisterUser/registerUser.component";
import LoginForm from "./Components/Login/LoginForm.component";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/create" element={<CreateProduct />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Registro />} />
    </Routes>
  );
}

export default App;
