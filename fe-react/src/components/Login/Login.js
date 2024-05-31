import { Button } from "../Button/Button";
import "../../utils/utils.scss";
import { Input } from "../Input/Input";
import "./Login.scss";

export const Login = () => {
  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6">
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
              type="text"
              name="password"
              label="Password"
              placeholder="Choose a password"
              onChange={() => console.log("changed")}
              className="input-textField"
            />
              <Button
              type={"button"} className=""
              onClick={() => console.log("click")}
              > Login
            </Button> 
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    
  );
};
