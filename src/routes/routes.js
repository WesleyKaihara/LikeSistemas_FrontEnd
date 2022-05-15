import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import Home from "../Pages/Home";
import SubCategorias from "../Pages/SubCategorias";
import Produtos from "../Pages/Produtos";

function Rotas() {
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

export default Rotas;