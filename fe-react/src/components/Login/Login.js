import { Button } from "../Button/Button";
import "../../utils/utils.scss";
import { Input } from "../Input/Input";
import "./Login.scss";
import { useState } from "react";
import axiosInstance from "../../services/AxiosInstance";
import {useNavigate} from "react-router-dom";
import { useMySchoolarContext } from "../../context/SchoolarContext";
import { jwtDecode } from "jwt-decode";

export const Login = () => {
  const {state, setUserData} = useMySchoolarContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("api/authenticate", formData)
      .then((response) => {
        const jwtToken = response.data;
        sessionStorage.setItem("auth_code", jwtToken);
        const decodedToken = jwtDecode(jwtToken);
        setUserData(decodedToken);
        window.location.href = "/";
      })
      .catch(() => {
        setError("Wrong credentials");
      });
  };

  return (
    <div className="container">
    <div className="row justify-content-start">
        <div className="card mt-5">
          <div className="card-body">
            <h2 className="card-title text-center">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
            <Input
              type="text"
              name="email"
              label="Email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="input-textField"
            />
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Insert your password"
              onChange={handleChange}
              className="input-textField"
            />
            {
              error ? <p style={{ color:'red'}}>{error}</p> : ""
              }
            <div className="d-flex justify-content-between">
            <Button
              type={"button"} className=""
              onClick={() => console.log("click")}
              > Login
            </Button> 
            <Button
              type={"button"} role="secondary"
              onClick={() => console.log("click")}
              > Register
            </Button> 
            </div>
              </div>
            </form>
          </div>
      </div>
    </div>
    </div>
  );
};
