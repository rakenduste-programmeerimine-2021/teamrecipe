import { Menu, Input } from "antd";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../index.less";

function Header(){
    const history = useHistory();
    const handleKeyPress = (event) => {
        if (event.key === 'Enter'){
            history.replace("/search/")
        }
    }

    return (
        <>
            <div style={{float: "left", width: "120px", height: "45px", background: "#FBDB14", display: "flex", justifyContent: "center", alignItems: "center", fontWeight:"700" }}>
                TEAM RECIPE
            </div>
            <div style={{background: "#FBDB14", float: "right", height: "45px", width: "200px"}}>
                <Input type="search" id="header-search" placeholder="Search..." onKeyPress={handleKeyPress} style={{margin:"5px 10px", width: "90%"}}/>
            </div>
            <Menu mode="horizontal" defaultSelectedKeys={['2']} style={{ marginBottom: "14px", background: "#FBDB14" }}>
                <Menu.Item><Link to="/recipes">Recipes</Link></Menu.Item>
                <Menu.Item><Link to="/cookbook">Cookbook</Link></Menu.Item>
                <Menu.Item><Link to="/account">Account</Link></Menu.Item>
            </Menu>
        </>
    )
}

export default Header