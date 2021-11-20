import {Form, Input, message, Button} from 'antd';
import { Link } from 'react-router-dom';
import "../components/InputStyles.css";

function Registration(){

    return (
        <div style={{padding:"10px 30px", width:"500px"}}>
            <h1 style={{fontWeight:"700"}}>Create Your Account</h1>
            <Form
            name="register"
            scrollToFirstError
            >
            <h1>Firstname</h1>
            <Form.Item
                name="firstname"
                label=""
                rules={[
                {
                    required: true,
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
                <Input style={{backgroundColor:"lightgray"}}/>
            </Form.Item>
            <h1>Lastname</h1>
            <Form.Item
                name="lastname"
                label=""
                rules={[
                {
                    required: true,
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
                <Input style={{backgroundColor:"lightgray"}}/>
            </Form.Item>
            <h1>Email</h1>
            <Form.Item
                name="email"
                label=""
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
            >
                <Input style={{backgroundColor:"lightgray"}}/>
            </Form.Item>
            <h1>Password</h1>
            <Form.Item
                name="password"
                label=""
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
                <Input.Password className="color" style={{backgroundColor:"lightgray"}}/>
            </Form.Item>
            <h1>Confirm password</h1>
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
                <Input.Password className="color" style={{backgroundColor:"lightgray"}}/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{width:"150px", background:"#fadb14", color:"black", border:"none", fontWeight:"700"}}>
                Register
                </Button>
            </Form.Item>
            </Form>
            <Link to="/account">Already have an account?</Link>
        </div>
    )
}

export default Registration