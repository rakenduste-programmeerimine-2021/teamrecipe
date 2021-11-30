import React from "react";
import MyRecipes from "../components/MyRecipes";
import { Context } from "../store"
import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router";

function OtherUserPage(){

    // const [state, dispatch] = useContext(Context);
    // const [requestData, setRequestData] = useState("");
    // const [user, setUser] = useState([]);
    // const {userName} = useParams();

    //     useEffect(() => {
    //     getUser();

    //     async function getUser(){
    //         const response = await fetch("http://localhost:8081/api/auth/signup" + userName)
    //         const data = await response.json();
    //         console.log(response)
    //         console.log(data)
    //         setUser(data);
    //         console.log(data)

    // }
    // }, []);

        return (
            <div style={{padding:"10px 30px", width:"400px"}}>
                <h1 style={{fontWeight:"700"}}>/users/ Account</h1>
                <svg width="100" height="100" style={{marginBottom: "10px"}}>
                <rect width="100" height="100" style={{fill:"rgb(255,100,100)", strokeWidth:"3"}} />
                </svg>
                <br/>
                <h1 style={{fontWeight:"700"}}>My Recipes</h1>
                <p className="footer" style={{ margin: "10px 3% 10px 3%" }}/>
                <MyRecipes></MyRecipes>
            </div>
        )
    }

export default OtherUserPage