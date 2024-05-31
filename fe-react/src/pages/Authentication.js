import { useEffect, useState } from "react"
import { Button } from "../components/Button/Button";
import axiosInstance from "../services/AxiosInstance";

export const Authentication = () => {
    const [isOnLoginComponent, setIsOnLoginComponent] = useState(true);
    
    return(
        <>
            <Button type="button" role="secondary" onClick={() => setIsOnLoginComponent(!isOnLoginComponent)}>Switch</Button>
            {
                isOnLoginComponent ? <p>Login component</p> : <p>Register compoennt</p>
            }

        </>

    )
}