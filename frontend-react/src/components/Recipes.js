import { Context } from "../store";
import { updateRecipes } from "../store/actions";
import { useState, useEffect, useContext } from "react";
import { message, Select } from 'antd';
import { Link } from "react-router-dom";

function Recipes(){
    const [state, dispatch] = useContext(Context);
    const [recipes, setRecipes] = useState([]);

    const { Option } = Select;

    useEffect(() => {
        getRecipes();

        async function getRecipes(){
        fetch("http://localhost:8081/api/recipe/")
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error("Error fetching recipes!");
            }
        })
        .then(data => {
            dispatch(updateRecipes(data));
            setRecipes(data);
        })
        .catch(error => {
            message.error(error.toString());
        });
    }
    }, [])

    const checkAccount = (recipe, index) => {
        if(recipe.userName == state.auth.username && recipe.recipePrivacy == "Shared"){
            return (
                <div key={index}>
                <div style={{backgroundColor: "rgb(240, 240, 240)", paddingTop: "5px", minHeight:"170px", minWidth:"400px", padding: "10px", borderRadius: "5px", display: "", marginBottom: "10px", textAlign: "left"}}>
                    <Link to={`/recipes/${recipe.recipeID}`}><img src={recipe.imageURL} width="150" height="150" style={{ float: "left", marginRight: "10px", cursor: "pointer"}}/></Link>
                    <Link to={`/recipes/${recipe.recipeID}`}>
                    <h2 style={{color:"black"}}>{recipe.recipeName}</h2>
                    </Link>
                    <Link to={`/account`}>
                    <p style={{color:"black"}}><b>Author:</b> {recipe.userName}</p>
                    </Link>
                    <p><b>Recipe Type: </b>{recipe.recipeType}</p>
                    <p><b>Description: </b>{recipe.recipeDescription}</p>
                </div>
                </div>
            )
        } else if(recipe.recipePrivacy == "Shared") {
            return (
                <div key={index}>
                <div style={{backgroundColor: "rgb(240, 240, 240)", paddingTop: "5px", minHeight:"170px", minWidth:"400px", padding: "10px", borderRadius: "5px", display: "", marginBottom: "10px", textAlign: "left"}}>
                    <Link to={`/recipes/${recipe.recipeID}`}><img src={recipe.imageURL} width="150" height="150" style={{ float: "left", marginRight: "10px", cursor: "pointer"}}/></Link>
                    <Link to={`/recipes/${recipe.recipeID}`}>
                    <h2 style={{color:"black"}}>{recipe.recipeName}</h2>
                    </Link>
                    <Link to={`/user/${recipe.userName}`}>
                    <p style={{color:"black"}}><b>Author:</b> {recipe.userName}</p>
                    </Link>
                    <p><b>Recipe Type: </b>{recipe.recipeType}</p>
                    <p><b>Description: </b>{recipe.recipeDescription}</p>
                </div>
                </div>
            )
        }
    }
    
        return(
        <>
            <h1 style={{fontWeight:"700"}}>Recipes</h1>
            <div>
                <div>
                        {/* <Select mode="tags" style={{width:"50%"}} placeholder="Select filters for recipes">
                        {recipes.map((recipe) => (
                            <Option value = {Option}>{recipe.recipeType}</Option>
                        ))}
                        </Select>
                        <br/>
                        <br/> */}
                    {recipes.map((recipe, index) =>(
                        checkAccount(recipe, index)
                    ))}
                </div>
            </div>
        </>
        )
    
}

export default Recipes