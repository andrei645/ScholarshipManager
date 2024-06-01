import React from 'react';
import { Input } from "../Input/Input";
import "../../utils/utils.scss";
import "./Register.scss";
import { Button } from '../Button/Button';

export const Register = () => {
  return (
    <div className="container">
      <div className="row justify-content-start">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center">Register</h2>
              <form>
                <div className="mb-3">
                  <Input
                    type="text"
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                    onChange={() => console.log("changed")}
                    className="input-textField"
                  />
                </div>
                <div className="mb-3">
                  <Input
                    type="text"
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                    onChange={() => console.log("changed")}
                    className="input-textField"
                  />
                </div>
                <div className="mb-3">
                  <Input
                    type="text"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    onChange={() => console.log("changed")}
                    className="input-textField"
                  />
                </div>
                <div className="mb-3">
                  <Input
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Choose a password"
                    onChange={() => console.log("changed")}
                    className="input-textField"
                  />
                </div>
                
                  <Button type="submit">Register</Button>
                
              </form>
            </div>
        </div>
      </div>
    </div>
  );
};
