import { Button } from "../Button/Button";
import "../../utils/utils.scss";
import { Input } from "../Input/Input";
import "./Login.scss";

export const Login = () => {
  return (
    <>
      <Button
        type={"button"}
        role={"secondary"}
        onClick={() => console.log("click")}
      >
        Login button test
      </Button>
      <Input
        type="text"
        name="username"
        label="Username"
        value={12}
        placeholder="Enter your username"
        errorMessage={"eroare"}
        onChange={() => console.log("changed")}
        className="test"
      />
    </>
  );
};
