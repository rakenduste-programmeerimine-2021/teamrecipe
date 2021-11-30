import { Button, Checkbox, Input, Form } from "antd"
import React from "react"


function AccountPageEdit(){

    return (
        <div style={{padding:"10px 30px", width:"500px"}}>
            <h1 style={{fontWeight:"700"}}>Edit Account</h1>
            <div>
                <h2>Edit /Picture here/</h2>
            <Form 
                name="basic"
                initialValues={{remember: true,}}
                autoComplete="off"
                style={{ margin:"30px"}}
            >
            <div style={{textAlign:"left"}}>
                <h2>Firstname: </h2>
                <Form.Item
                    label=""
                    name="email"
                    rules={[
                    {
                        required: false,
                    },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <h2>Lastname: </h2>
                <Form.Item
                    label=""
                    name="email"
                    rules={[
                    {
                        required: false,
                    },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <h2>Email: </h2>
                <Form.Item
                    label=""
                    name="email"
                    rules={[
                    {
                        required: false,
                    },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <h2>Password: </h2>
                <Form.Item
                    label=""
                    name="password"
                    rules={[
                    {
                    required: true,
                    message: 'Please input your password!',
                    },
                    {
                    min: 6,
                    message: 'Minimum length is 6 characters!',
                    }
                    ]}
                >
                    <Input.Password className="color"/>
                </Form.Item>
                <h2>Confirm password: </h2>
                <Form.Item
                    name="confirm"
                    label=""
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
                    <Input.Password className="color"/>
                </Form.Item>
            </div>
            </Form>
            </div>
            <br/>
            <div style={{textAlign:"left", fontWeight:"600"}}>
            <Checkbox style={{}}>Recieve email notifications</Checkbox>
            <br/>
            <Checkbox style={{}}>Private account</Checkbox>
            </div>
            <br/>
            {/* <h1>My recipes</h1>
            <Button type="default" htmlType="button" style={{background: "#fadb14", color: "black", border:"none", fontWeight:"700"}}>My recipes</Button> */}
            <h1>Save Profile Changes</h1>
            <Button type="default" htmlType="logout" style={{width:"150px", background: "#fadb14", color: "black", border:"none", fontWeight:"700"}}>Save</Button>
            <br/>
        </div>
    )
}

export default AccountPageEdit