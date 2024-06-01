import { Button } from "../Button/Button";
import "../../utils/utils.scss";
import { Input } from "../Input/Input";
import "./Login.scss";

export const Login = () => {
  return (
    <div className="container">
    <div className="row justify-content-start">
        <div className="card mt-5">
          <div className="card-body">
            <h2 className="card-title text-center">Login</h2>
            <form>
              <div className="mb-3">
            <Input
              type="text"
              name="email"
              label="Email"
              placeholder="Enter your email"
              onChange={() => console.log("changed")}
              className="input-textField"
            />
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Insert your password"
              onChange={() => console.log("changed")}
              className="input-textField"
            />
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
