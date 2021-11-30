import Image from "../images/recipe1.jpg"
import { Context } from "../store";
import { addRecipe, removeRecipe, updateRecipes } from "../store/actions";
import { useState, useEffect, useContext } from "react";
import { message } from 'antd';
import { Link } from "react-router-dom";

function Recipes(){

    const [state, dispatch] = useContext(Context);
    const [recipes, setRecipes] = useState([]);

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



    // const [recipes, setRecipes] = useState(null);

    // useEffect(() => {
    //     getRecipes();

    // async function getRecipes() {
    //     const response = await fetch("http://localhost:8081/api/recipe/")
    //     const data = await response.json();
    //         setRecipes(data);
    //         console.log(data);
    // }
    // }, []);
    
        return(
        <>
            <h1 style={{fontWeight:"700"}}>Recipes</h1>
            <div style={{backgroundColor: "rgb(240, 240, 240)", paddingTop: "5px", padding: "10px", borderRadius: "5px", display: "inline-block", marginBottom: "10px", textAlign: "left"}}>
                <img src={Image} alt="Chicken" width="150" height="150" style={{ float: "left", marginRight: "10px", cursor: "pointer"}}/>
                    <span>
                        <b style={{cursor: "pointer"}}>Gluten Free Baked Chicken Tenders Recipe</b>
                        <p>Author: account552</p>
                        <p>Crunchy chicken tenders are one of the most kid friendly foods around. Kids adore them and I suspect many adults do as well. Most family restaurants offer these golden nuggets on their kiddies menu and my boys have had their fair share when they were little.</p>
                    </span>
            </div>
            <div>
                <div>
                    {recipes.map((recipe, index) =>(
                        <div style={{backgroundColor: "rgb(240, 240, 240)", paddingTop: "5px", padding: "10px", borderRadius: "5px", display: "", marginBottom: "10px", textAlign: "left"}} key={index}>
                            <Link to={`/recipes/${recipe.recipeID}`}>
                            <b style={{color:"black"}}>{recipe.recipeName}</b>
                            </Link>
                            <Link to={`/user/`}>
                            <p style={{color:"black"}}>author: {recipe.userName}</p>
                            </Link>
                            <p>{recipe.recipeDescription}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
        )
    
}

export default Recipes