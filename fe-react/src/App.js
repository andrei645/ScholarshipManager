import { Route, Routes } from "react-router-dom";
import "./App.css";
import { NotFound } from "./pages/NotFound";
import { Authentication } from "./pages/Authentication";
import { Input } from "./components/Input/Input";
import 'bootstrap/dist/css/bootstrap.min.css';


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
