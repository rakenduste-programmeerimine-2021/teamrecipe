import { Input, Space, Button } from "antd";

function SearchPage(){
    const { Search } = Input;

    function onSearch(){
        console.log("Search")
    }

    return(
        <div>
            <h1 style={{fontWeight:"700"}}>Search a recipe</h1>
            <Input onPressEnter={onSearch} placeholder="Search a recipe..."></Input>
            <Button type="primary" style={{width:"150px", background: "#fadb14", color: "black", border:"none", fontWeight:"700", marginTop:"10px"}} onClick={onSearch}>Search</Button>
        </div>
    );
}

export default SearchPage;