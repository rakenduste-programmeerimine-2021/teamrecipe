import { Context } from "../store";
import { updateRecipes } from "../store/actions";
import { useState, useEffect, useContext } from "react";
import { message } from 'antd';
import { Link } from "react-router-dom";

function LikedRecipes(){
    const [state, dispatch] = useContext(Context);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipes();
    }, [])

    function getRecipes(){
        fetch("http://localhost:8081/api/recipe/like/" + state.auth.username)
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error("Error fetching liked recipes!");
            }
        })
        .then(data => {
            setRecipes(data);
        })
        .catch(error => {
            message.error(error.toString());
        });
    }

    const displayLikedUserRecipes = (recipe, index) => {
        return (
            <div style={{backgroundColor: "rgb(240, 240, 240)", paddingTop: "5px", minHeight:"170px", minWidth:"400px", padding: "10px", borderRadius: "5px", display: "", marginBottom: "10px", textAlign: "left"}} key={index}>
                <Link to={`/recipes/${recipe.recipeID}`}><img src={recipe.imageURL} width="150" height="150" style={{ float: "left", marginRight: "10px", cursor: "pointer"}}/></Link>
                <Link to={`/recipes/${recipe.recipeID}`}>
                <h2 style={{color:"black"}}>{recipe.recipeName}</h2>
                </Link>
                <Link to={`/user/${recipe.userName}`}>
                <p style={{color:"black"}}><b>Author:</b> {recipe.userName}</p>
                </Link>
                <p>{recipe.recipeDescription}</p>
            </div>
        )
    }
    
    if(recipes.length == 0){
        return (<h3>Like recipes to start seeing them here</h3>)
    } else {
        return(
            <div>
                {recipes.map((recipe, index) =>(
                    displayLikedUserRecipes(recipe, index)
                ))}
            </div>
        )
    }
}

export default LikedRecipes