import { useState, useContext } from "react";
import { Context } from "../store";
import { Button } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import Login from "../components/Login";
import { logoutUser } from "../store/actions";

function AccountPage(){
    const [state, dispatch] = useContext(Context);

    function logout(){
        dispatch(logoutUser());
    }

    if(state.auth.token == undefined){
        return ( //kui pole sisse logitud
            <Login></Login>
        )
    } else {
        return ( //kui on sisse logitud
            <div style={{padding:"10px 30px", width:"400px"}}>
                <h1 style={{fontWeight:"700"}}>Account</h1>
                <svg width="100" height="100" style={{marginBottom: "10px"}}>
                <rect width="100" height="100" style={{fill:"rgb(255,100,100)", strokeWidth:"3"}} />
                </svg>
                <br/>
                <Button type="primary" htmlType="button">Edit account</Button><span><Button type="default" htmlType="logout" onClick={() => logout()} style={{marginLeft: "10px", marginBottom: "10px"}}>Logout</Button></span>
                <h1>Recipes</h1>
                
                <p className="footer" style={{ margin: "10px 3% 10px 3%" }}/>
                <Link to="/create" style={{ marginBottom: "10px" }}>Create a new recipe</Link>
                <p> -- siia retseptid -- </p>
            </div>
        )
    }
}

export default AccountPage