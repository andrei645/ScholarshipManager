import React, { useState } from "react";
import { Input } from "../Input/Input";
import "../../utils/utils.scss";
import "./Register.scss";
import { Button } from "../Button/Button";
import axiosInstance from "../../services/AxiosInstance";

export const Register = ({setIsOnLoginComponent}) => {
  const [userData, setUserData] = useState({ role: "student" });
  const [successfullyCreated, setSuccessfullyCreated] = useState("");

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axiosInstance.post("api/register", userData).then(() => {
      setSuccessfullyCreated("Registered successfully. Now you can log in.");
    }).catch(() => {})
  };

  return (
    <div className="container">
      <div className="row justify-content-start">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <Input
                    type="text"
                    name="prenume"
                    label="First Name"
                    placeholder="Enter your first name"
                    onChange={handleChange}
                    className="input-textField"
                  />
                </div>
                <div className="mb-3">
                  <Input
                    type="text"
                    name="numeFam"
                    label="Last Name"
                    placeholder="Enter your last name"
                    onChange={handleChange}
                    className="input-textField"
                  />
                </div>
                <div className="mb-3">
                  <Input
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    className="input-textField"
                  />
                </div>
                <div className="mb-3">
                  <Input
                    type="text"
                    name="nrMat"
                    label="Numar matricol"
                    placeholder="Enter your nuamr matricol"
                    onChange={handleChange}
                    className="input-textField"
                  />
                </div>
                <div className="mb-3">
                  <Input
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Choose a password"
                    onChange={handleChange}
                    className="input-textField"
                  />
                </div>
                {successfullyCreated ? (
                  <p className="account-created">{successfullyCreated}</p>
                ) : (
                  <></>
                )}

                <div className="d-flex justify-content-between">
                  <Button
                    type={"submit"} role="secondary"
                    onClick={() => console.log("click")}
                    > Register
                  </Button> 
                  <Button
                    type={"button"} role="primary"
                    onClick={() => setIsOnLoginComponent(true)}
                    > Login
                  </Button> 
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  );
};
