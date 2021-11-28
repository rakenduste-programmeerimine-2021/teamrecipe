import React from "react";
import MyRecipes from "../components/MyRecipes";

function OtherUserPage(){

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