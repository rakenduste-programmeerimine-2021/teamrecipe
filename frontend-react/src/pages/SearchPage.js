import { Input, Space, Button } from "antd";
import { Context } from "../store";
import { addRecipe, removeRecipe, updateRecipes } from "../store/actions";
import { useState, useEffect, useContext } from "react";
import { message } from 'antd';
import { Link } from "react-router-dom";

function SearchPage(){
    const { Search } = Input;
    const [state, dispatch] = useContext(Context);
    const [recipes, setRecipes] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

        useEffect(() => {
        getRecipes();

        async function getRecipes(){
        fetch("http://localhost:8081/api/recipe/")
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error("error fetching recipes!");
            }
        })
        .then(data => {
            console.log(data);
            dispatch(updateRecipes(data));
            setRecipes(data);
        })
        .catch(error => {
            displayError(error)
        });
    }
    }, [])

    const displayError = (error) => {
    message.error(error.toString());
  }

    function onSearch(){
        handleFilter()
    }

    const handleFilter = (event) =>{
        const searchWord = event.target.value
        const newFilter = recipes.filter((value) => {
            return value.recipeName.toLowerCase().includes(searchWord.toLowerCase());
        })

        if(searchWord === "") {
            setFilteredData([])
        } else {
        setFilteredData(newFilter)
    }}

    return(
        <div>
            <h1 style={{fontWeight:"700"}}>Search a recipe</h1>
            <Input type="text" onPressEnter={onSearch} placeholder="Search a recipe..." onChange={handleFilter}></Input>
            {/* <Button type="primary" style={{width:"150px", background: "#fadb14", color: "black", border:"none", fontWeight:"700", marginTop:"10px"}} onClick={onSearch}>Search</Button> */}
                <div>
                    <br/>
                    {filteredData.map((value, index) =>(
                        <div style={{backgroundColor: "rgb(240, 240, 240)", paddingTop: "5px", padding: "10px", borderRadius: "5px", display: "", marginBottom: "10px", textAlign: "left", minWidth:"800px", maxWidth:"800px"}} key={index}>
                            <Link to={`/recipes/${value.recipeID}`}>
                            <b style={{color:"black"}}>{value.recipeName}</b>
                            </Link>
                            <Link to={`/user/`}>
                            <p style={{color:"black"}}>author: {value.userName}</p>
                            </Link>
                            <p>{value.recipeDescription}</p>
                        </div>
                    ))}
                </div>
        </div>
    );
}

export default SearchPage;