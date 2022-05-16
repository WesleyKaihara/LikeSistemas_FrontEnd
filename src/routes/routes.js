import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import Home from "../Pages/Home";
import SubCategorias from "../Pages/SubCategorias";
import Produtos from "../Pages/Produtos";


//Criação de rotas utilizando React-Router-Dom
//Organiza a URN – Uniform Resource Name

export default function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/subcategorias" element={<SubCategorias />} />
        <Route path="/produtos" element={<Produtos />} />
      </Routes>
    </Router>

  )
}
