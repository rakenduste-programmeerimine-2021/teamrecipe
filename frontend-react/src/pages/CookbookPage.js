import FollowedRecipes from "../components/FollowedRecipes";
import LikedRecipes from "../components/LikedRecipes";
import { Context } from "../store";
import { useContext, useState } from "react";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from '@ant-design/icons';

function CookbookPage(){
    const [state, dispatch] = useContext(Context);
    const [key, setKey] = useState(1);

    const onClick = ({ key }) => {
        setKey(key)
    }

    const menu = (
        <Menu onClick={onClick}>
            <Menu.Item key="1">Your followed users</Menu.Item>
            <Menu.Item key="2">Your liked recipes</Menu.Item>
        </Menu>
    )

    if(state.auth.token == undefined){
        return(
            <div>
                <h1 style={{fontWeight:"700"}}>My Cookbook</h1>
                <h3>Log in to use this page</h3>
            </div>
        )
    } else {
        if(key == 1){
            return (
                <div>
                    <h1 style={{fontWeight:"700"}}>Your followed users' recipes</h1>
                    <Dropdown overlay={menu} placement="bottomCenter">
                    <b style={{cursor: "pointer", marginBottom: "10px"}} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        Filter <DownOutlined />
                    </b>
                    </Dropdown>
                    <FollowedRecipes></FollowedRecipes>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 style={{fontWeight:"700"}}>Your liked recipes</h1>
                    <Dropdown overlay={menu} placement="bottomCenter">
                    <b style={{cursor: "pointer", marginBottom: "10px"}} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        Filter <DownOutlined />
                    </b>
                    </Dropdown>
                    <LikedRecipes></LikedRecipes>
                </div>
            )
        }
    }
}

export default CookbookPage;