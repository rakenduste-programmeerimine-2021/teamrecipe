import { Button } from "antd"
import React from "react"
import Login from "../components/Login"
import { useState } from "react"


function AccountPage(){
    const [state, setState] = useState("")
    const [user, setUser] = useState(true)

    function checkLogin(){
        if(user === false){
            return ( //kui pole sisse logitud
                <Login></Login>
            )
        } else {
            return ( //sisse logitud
                <div style={{padding:"10px 30px", width:"400px"}}>
                    <h1 style={{fontWeight:"700"}}>Account</h1>
                    <div>
                        <h2>/Picture here/</h2>
                    <div style={{textAlign:"left"}}>
                        <h2>Firstname: </h2>
                        <h2>Lastname: </h2>
                        <h2>Email: </h2>
                        <h2></h2>
                        <h2></h2>
                    </div>
                    </div>
                    <br/>
                    <Button type="default" htmlType="button" style={{width:"150px", background: "#fadb14", color: "black", border:"none", fontWeight:"700"}}>Edit account</Button>
                    <h1>My recipes</h1>
                    <Button type="default" htmlType="button" style={{width:"150px", background: "#fadb14", color: "black", border:"none", fontWeight:"700"}}>My recipes</Button>
                    <h1>Log out from this account</h1>
                    <Button type="default" htmlType="logout" style={{width:"150px", background: "#fadb14", color: "black", border:"none", fontWeight:"700"}}>Logout</Button>
                    <br/>
                </div>
            )
        }
    }

    return checkLogin();
}

export default AccountPage