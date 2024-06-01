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
      {/* <Button type="button" role="secondary" onClick={() => setIsOnLoginComponent(!isOnLoginComponent)}>Switch</Button>
            {
                isOnLoginComponent ? <Login/> : <Register/>
            } */}

      <div className="forms-box container border-fade">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Login />
          </div>
          <div className=" col-md-6 image-container">
        <img src={loginImg} alt="Login" className="img-fluid" />
      </div>
        </div>
      </div>
    </>
  );
};
