import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import "../components/InputStyles.css";

function Login(){


    return (
        <div>
        <h1 style={{fontWeight:"700"}}>Log In</h1>
        <Form 
        name="basic"
        //labelCol={{span: 8}}
        //wrapperCol={{span: 8}}
        initialValues={{remember: true,}}
        autoComplete="off"
        style={{ margin:"30px"}}
        >
        <br/>
        <h1>Email</h1>
        <Form.Item
            label=""
            name="email"
            rules={[
            {
                required: true,
                message: 'Please input your email!',
            },
            ]}
        >
            <Input style={{backgroundColor:"lightgray"}}/>
        </Form.Item>
        <h1>Password</h1>
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
            <Input.Password className="color" style={{backgroundColor:"lightgray"}}/>
        </Form.Item>
        <br/>
        <Form.Item wrapperCol={{}}>
            <Button type="primary" htmlType="login" style={{width:"150px", background: "#fadb14", color: "black", border:"none", fontWeight:"700"}}>
            Login
            </Button>
        </Form.Item>
        </Form>
        <Link to="account/registration">Create a new account</Link>
        </div>
    );
};

export default Login