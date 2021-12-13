import { Menu, Input } from "antd";
import { Link } from "react-router-dom";
import "../index.less";
import { SearchOutlined } from '@ant-design/icons';

function Header(){

    return (
        <>
            <div style={{float: "left", width: "120px", height: "45px", background: "#FBDB14", display: "flex", justifyContent: "center", alignItems: "center", fontWeight:"700" }}>
                TEAM RECIPE
            </div>
            {/* <div style={{background: "#FBDB14", float: "right", height: "45px", width: "200px"}}>
                <Input type="search" id="header-search" placeholder="Search..." onKeyPress={handleKeyPress} style={{margin:"5px 10px", width: "90%"}}/>
            </div> */}
            <Menu mode="horizontal" defaultSelectedKeys={['2']} style={{ marginBottom: "14px", background: "#FBDB14", fontWeight:"600" }}>
                <Menu.Item><Link to="/recipes">Recipes</Link></Menu.Item>
                <Menu.Item><Link to="/cookbook">Cookbook</Link></Menu.Item>
                <Menu.Item><Link to="/account">Account</Link></Menu.Item>
                <Menu.Item style={{marginLeft: "auto"}}><Link to ="/search"><SearchOutlined /></Link></Menu.Item>
            </Menu>
        </>
    )
}

export default Header