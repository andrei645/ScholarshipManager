import React from "react";
import { useState } from "react";
import { Login } from "../Login/Login";
import "./FormsBox.scss";
import { Register } from "../Register/Register";
import { Button } from "../Button/Button";
import loginImg from "../../assets/images/Login.png";

export const FormsBox = () => {
  const [isOnLoginComponent, setIsOnLoginComponent] = useState(true);

  return (
    <>
      <div className="forms-box container border-fade">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-6">
                {isOnLoginComponent ? (
                  <Login setIsOnLoginComponent={setIsOnLoginComponent} />
                ) : (
                  <Register setIsOnLoginComponent={setIsOnLoginComponent} />
                )}
              </div>
              <div className="col-md-6 d-flex justify-content-center align-items-center">
                <div className="spinner-container">
                  <div className="spinner">
                    <span className="spinner-text">S</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  );
};
