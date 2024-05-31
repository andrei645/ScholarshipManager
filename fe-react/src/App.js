import { Route, Routes } from "react-router-dom";
import "./App.css";
import { NotFound } from "./pages/NotFound";
import { Authentication } from "./pages/Authentication";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Authentication} />
        <Route path="*" Component={NotFound} />
      </Routes>
    </div>
  );
}

export default App;
