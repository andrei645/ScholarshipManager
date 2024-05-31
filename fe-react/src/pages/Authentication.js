import { useEffect, useState } from "react"
import { Button } from "../components/Button/Button";
import { Login } from "../components/Login/Login";
import { Register } from "../components/Register/Register";

export const Authentication = () => {
    const [isOnLoginComponent, setIsOnLoginComponent] = useState(true);
    
    return(
        <>
            <Button type="button" role="secondary" onClick={() => setIsOnLoginComponent(!isOnLoginComponent)}>Switch</Button>
            {
                isOnLoginComponent ? <Login/> : <Register/>
            }

        </>

    )
}