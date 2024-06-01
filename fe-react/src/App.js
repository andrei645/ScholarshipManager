import { Route, Routes } from "react-router-dom";
import "./App.css";
import { NotFound } from "./pages/NotFound";
import { Authentication } from "./pages/Authentication";
import { Input } from "./components/Input/Input";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dashboard } from "./pages/Dashboard";
import { useState } from "react";

function App() {
  const isLogged = sessionStorage.getItem("auth_code");

  if (isLogged == null) {
    return (
      <Routes>
        <Route path="/" Component={Authentication} />
      </Routes>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Dashboard} />
        <Route path="*" Component={Dashboard} />
      </Routes>
    </div>
  );
};

export default App;
