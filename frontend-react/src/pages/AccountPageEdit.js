import { Button, Checkbox, Input, Form } from "antd"
import React from "react"
import { Context } from "../store";
import { useState, useContext, useEffect } from "react";
import { updateUser } from "../store/actions";
import { message } from 'antd';
import Login from "../components/Login";
import axios from "axios";
import { logoutUser } from "../store/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AccountPageEdit(){

    const [state, dispatch] = useContext(Context);
    const [user, setUser] = useState([]);
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [privacyToggle, setPrivacyToggle] = useState("");
    // const [emailNotifications, setEmailNotifications] = useState("");
    
        useEffect(() => {
        getAccount();

        async function getAccount(){
        fetch("http://localhost:8081/api/auth/" + state.auth.username)
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error("error fetching users!");
            }
        })
        .then(data => {
            console.log(data);
            dispatch(updateUser(data));
            setUser(data);
            setEmail(data.email)
            setFirstname(data.firstName)
            setLastname(data.lastName)
            setUsername(data.userName)
            // setPassword(data.password)
            // setPrivacyToggle(data.privacyToggle)
            // setEmailNotifications(data.emailNotifications)
        })
        .catch(error => {
            displayError(error)
        });
    }
    }, [])

        const displayError = (error) => {
    message.error(error.toString());
  }

  const handleSubmit = async () => {
      console.log("Data for update : ", username, email, firstname, lastname);
      await axios.put(`http://localhost:8081/api/auth/${user.userName}`,{
          userName: username,
          email,
          firstName: firstname,
          lastName: lastname
      }).then((response) => {
          console.log(JSON.stringify(response.data));
          dispatch(logoutUser());
      })
  };

    if(state.auth.token == undefined){
        return (
            <Login></Login>
        )
    } else {
    return (
        <div style={{padding:"10px 30px", width:"500px"}}>
            <h1>hi {user.userName}</h1>
            <h1 style={{fontWeight:"700"}}>Edit Account</h1>
            <div>
                <h2>Edit /Picture here/</h2>
            <Form 
                name="basic"
                initialValues={{remember: true,}}
                autoComplete="off"
                style={{ margin:"30px"}}
                onFinish={handleSubmit}
            >
            <div style={{textAlign:"left"}}>

                <h2>username: </h2>
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: false,
                        message: 'Please input your username!',
                        whitespace: true,
                    },
                    {
                        min: 6,
                        message: 'Minimum length is 6 characters!',
                        whitespace: true,
                    },
                    ]}
                >
                    <Input onChange={(e) => setUsername(e.target.value)} size="default"/>
                </Form.Item>

                <h1>Firstname</h1>
                <Form.Item
                    name="firstname"
                    rules={[
                    {
                        required: false,
                        message: 'Please input your first name!',
                        whitespace: true,
                    },
                    {
                        min: 3,
                        message: 'Minimum length is 3 characters!',
                        whitespace: true,
                    },
                    ]}
                >
                    <Input onChange={(e) => setFirstname(e.target.value)}/>
                </Form.Item>

                <h1>Lastname</h1>
                <Form.Item
                    name="lastname"
                    rules={[
                    {
                        required: false,
                        message: 'Please input your last name!',
                        whitespace: true,
                    },
                    {
                        min: 3,
                        message: 'Minimum length is 3 characters!',
                        whitespace: true,
                    },
                    ]}
                >
                    <Input onChange={(e) => setLastname(e.target.value)}/>
                </Form.Item>

                <h1>Email</h1>
                <Form.Item
                    name="email"
                    rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: false,
                        message: 'Please input your E-mail!',
                    },
                    ]}
                >
                    <Input onChange={(e) => setEmail(e.target.value)}/>
                </Form.Item>

                {/* <h1>New Password</h1>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: false,
                        message: 'Please input your password!',
                    },
                    {
                        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                        message: "Password must contain atleast: 1 lowercase letter, 1 uppercase letter, 1 number"
                    },
                    {
                        min: 6,
                        message: 'Minimum length is 6 characters!',
                    }
                    ]}
                    hasFeedback
                >
                    <Input.Password onChange={(e) => setPassword(e.target.value)}/>
                </Form.Item>

                <h1>Confirm New Password</h1>
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                    {
                        required: false,
                        message: 'Please confirm your password!',
                    },
                    {
                        min: 6,
                        message: 'Minimum length is 6 characters!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }

                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item> */}

                <Form.Item 
                    name="emailnotifications" valuePropName="checked"
                >
                    <Checkbox><span style={{marginLeft:"10px"}}>Enable email notifications</span></Checkbox>
                </Form.Item>

                <Form.Item 
                    name="privacytoggle" valuePropName="checked"
                >
                    <Checkbox><span style={{marginLeft:"10px"}}>Private account</span></Checkbox>
                </Form.Item>
                    <h1>Save Profile Changes</h1>
                    
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{width:"150px", background: "#fadb14", color: "black", border:"none", fontWeight:"700"}}>
                    Save
                    </Button>
                </Form.Item>
            </div>
            </Form>
            </div>
        </div>
    )
        }
}

export default AccountPageEdit