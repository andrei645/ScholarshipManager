import { FormsBox } from "../components/FormsBox/FormsBox";
import Header from "../components/Header/Header";
import React from "react";
import { useState } from "react";


export const Authentication = () => {

    const [isOnLoginComponent, setIsOnLoginComponent] = useState(true);
    
    return(
        <>
            <Header/>
            <FormsBox/>
        </>

    )
}