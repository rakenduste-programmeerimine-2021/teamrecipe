import { Button, Checkbox, Input, Form } from "antd"
import React from "react"
import { Context } from "../store";
import { useState, useContext, useEffect } from "react";
import { updateUser, logoutUser } from "../store/actions";
import { message } from 'antd';
import Login from "../components/Login";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AccountPagePasswordEdit(){
    const [state, dispatch] = useContext(Context);
    const [user, setUser] = useState([]);
    const [emailNotif, setEmailNotif] = useState("");
    const [form] = Form.useForm();
    const history = useHistory();
    const [pass, setPass] = useState("");

//         useEffect(() => {
//         fetch("http://localhost:8081/api/auth/" + state.auth.username)
//         .then(response => {
//             if(response.ok){
//                 return response.json();
//             } else {
//                 throw new Error("error fetching users!");
//             }
//         })
//         .then(data => {
//             console.log(data);
//             dispatch(updateUser(data));
//             setUser(data);
//             setPass(data.password)
//         })
//         .catch(error => {
//             displayError(error)
//         });
//     }, [])

//         const displayError = (error) => {
//     message.error(error.toString());
//   }


    const onFinish = (values) => {
        const update = {
            password: values.password,
            passwordConfirmation: values.passwordConfirmation
        };
        fetch(`http://localhost:8081/api/auth/${user.userName}`, {
            method: "PUT",
            body: JSON.stringify(update),
            headers: {"Content-Type":"application/json"}
        }).then(response => {
            if(response.ok){
                let successEvent = "Password successfully updated!"
                displaySuccess(successEvent);
            } else {
                console.log(update)
                throw new Error("Error updating password!");
            }
        }).catch(error => {
            displayError(error)
        });

    const displayError = (error) => {
        message.error(error.toString());
    }

    const displaySuccess = (success) => {
        message.success(success);
    }
    }

    return(
        <>
            <Form
                name="basic"
                form={form}
                initialValues={{remember: true,}}
                autoComplete="off"
                style={{ margin:"30px"}}
                onFinish={onFinish}
            >
                {/* <h1>Old Password</h1>
                <Form.Item
                    name="oldPassword"
                    dependencies={pass}
                    rules={[
                    {
                        required: true,
                        message: 'Please insert your old password!',
                    },
                    {
                        min: 6,
                        message: 'Minimum length is 6 characters!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('oldPassword') === value) {
                            return Promise.resolve();
                        }

                        return Promise.reject(new Error('This is not your old password!'));
                        },
                    }),
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item> */}
                <h1>New Password</h1>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
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
                    <Input.Password/>
                </Form.Item>

                <h1>Confirm New Password</h1>
                <Form.Item
                    name="passwordConfirmation"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
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
                </Form.Item>
                    <h1>Save Password</h1>
                    
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{width:"150px", background: "#fadb14", color: "black", border:"none", fontWeight:"700"}}>
                    Save
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default AccountPagePasswordEdit
