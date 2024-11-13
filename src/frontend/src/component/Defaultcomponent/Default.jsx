import React from "react";
import Header from "../Headercomponent/Header";

const Defaul = ({children}) => {
    return (
        <>
        <Header/>
        {children}
        </>
    )
}

export default Defaul;