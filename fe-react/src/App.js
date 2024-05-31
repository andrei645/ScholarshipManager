import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="*" Component={<h1>Not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
