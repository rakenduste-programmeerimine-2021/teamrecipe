import React from "react";
import { useParams } from "react-router";
import OtherUserRecipes from "../components/OtherUserRecipes";
import { UserAddOutlined } from '@ant-design/icons'
import { Button, Tooltip } from "antd";
import "./pageStyles.css" 

function OtherUserPage(){
    const {userName} = useParams();

    return (
        <div style={{padding:"10px 30px", width:"400px"}}>
            <div style={{minHeight: "110px"}}>
                <svg width="100" height="100" style={{marginBottom: "10px", float:"left", marginLeft: "10px"}}>
                <rect width="100" height="100" style={{fill:"rgb(255,100,100)", strokeWidth:"3"}} />
                </svg>
                <h1 style={{fontWeight:"700", textAlign:"left", marginLeft:"125px"}}>{userName}'s recipes</h1>
                <Tooltip placement="right" title="Follow"><Button icon={<UserAddOutlined/>} shape="circle" style={{border:"none", float:"left", marginLeft:"5px"}}></Button></Tooltip>
            </div>
            <p className="footer" style={{ margin: "10px 3% 10px 3%" }}/>
            <OtherUserRecipes></OtherUserRecipes>
        </div>
    )
}

export default OtherUserPage