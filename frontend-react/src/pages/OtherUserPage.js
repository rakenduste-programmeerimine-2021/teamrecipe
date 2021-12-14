import { useContext, useState, useEffect, useRef } from "react"
import emailjs from 'emailjs-com';
import { useParams } from "react-router";
import OtherUserRecipes from "../components/OtherUserRecipes";
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { ContactUs } from "../components/Email";
import { Button, message, Tooltip } from "antd";
import { Context } from "../store";
import "./pageStyles.css" 

function OtherUserPage(){
    const [state, dispatch] = useContext(Context)
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const {userName} = useParams();
    var tempArray = [];
    
    useEffect(() => {
        followedUsersArray();
    }, [data])

    async function followedUsersArray() {
        fetch("http://localhost:8081/api/recipe/followed/" + state.auth.username)
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error("Error fetching recipes!");
            }
        })
        .then(allData => {
            for(var i=0; i<allData.length; i++){
                tempArray.push(allData[i].userName)
            }
            setData(tempArray)
        })
        .catch(error => {
            message.error(error.toString());
        });
    }

    const followUser = () => {
        const data = {
            followedUser: userName,
            followingUser: state.auth.username
        }
        fetch("http://localhost:8081/api/auth/follow",{
            method: "PUT",
            body: JSON.stringify(data),
            headers: {"Content-Type":"application/json"}
        }).then(response => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error("User has already been followed")
            }
        }).then(() => {
            message.success("User followed successfully!")
        }).catch(error => {
            message.error(error.toString())
        });
    }

    const unFollowUser = () => {
        const data = {
            followedUser: userName,
            followingUser: state.auth.username
        }
        fetch("http://localhost:8081/api/auth/unfollow",{
            method: "PUT",
            body: JSON.stringify(data),
            headers: {"Content-Type":"application/json"}
        }).then(response => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error("User has already been unfollowed")
            }
        }).then(() => {
            message.success("User unfollowed successfully!")
        }).catch(error => {
            message.error(error.toString())
        });
    }

    useEffect(() => {
        getUser();

        async function getUser(){
        fetch("http://localhost:8081/api/auth/" + userName)
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error("Error fetching recipes!");
            }
        })
        .then(userData => {
            setUser(userData);
        })
        .catch(error => {
            message.error(error.toString());
        });
    }
    }, [])

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        if(user.emailNotifications == true){
        emailjs.sendForm('service_p38sdoj', 'template_lw5hgx5', form.current, 'user_G7lpyhoGW19jDbX5LjATm')
        .then((result) => {
            console.log(result.text);
            console.log(userName)
            console.log(user)
            console.log(state.auth.username)
        }, (error) => {
            console.log(error.text);
        });
    }
    };

    

    if(data.includes(userName)){
        return (
            <div style={{padding:"10px 30px", width:"400px"}}>
                <div style={{minHeight: "110px"}}>
                    <svg width="100" height="100" style={{marginBottom: "10px", float:"left", marginLeft: "10px"}}>
                    <rect width="100" height="100" style={{fill:"rgb(255,100,100)", strokeWidth:"3"}} />
                    </svg>
                    <h1 style={{fontWeight:"700", textAlign:"left", marginLeft:"125px"}}>{userName}'s recipes</h1>
                    <Tooltip placement="right" title="Unfollow"><Button icon={<UserDeleteOutlined/>} shape="circle" style={{border:"none", float:"left", marginLeft:"5px"}} onClick={unFollowUser}></Button></Tooltip>
                </div>
                <p className="footer" style={{ margin: "10px 3% 10px 3%" }}/>
                <OtherUserRecipes></OtherUserRecipes>
            </div>
            
        )
    } else {
        return (
            <div style={{padding:"10px 30px", width:"400px"}}>
                <div style={{minHeight: "110px"}}>
                    <svg width="100" height="100" style={{marginBottom: "10px", float:"left", marginLeft: "10px"}}>
                    <rect width="100" height="100" style={{fill:"rgb(255,100,100)", strokeWidth:"3"}} />
                    </svg>
                    <h1 style={{fontWeight:"700", textAlign:"left", marginLeft:"125px"}}>{userName}'s recipes</h1>
                    <form ref={form} onSubmit={sendEmail}>
                        <input type="text" name="to_name" value={userName} style={{display:"none"}}/>
                        <input type="text" name="from_name" value={state.auth.username} style={{display:"none"}}/>
                    <Tooltip placement="right" title="Follow"><Button icon={<UserAddOutlined/>} shape="circle" style={{border:"none", float:"left", marginLeft:"5px"}} htmlType="submit" onClick={followUser}></Button></Tooltip>
                    </form>
                </div>
                <p className="footer" style={{ margin: "10px 3% 10px 3%" }}/>
                <OtherUserRecipes></OtherUserRecipes>
            </div>
        )
    }
}

export default OtherUserPage