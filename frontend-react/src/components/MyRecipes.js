import { useEffect, useState, useContext } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Context } from "../store"
import { message } from 'antd';
import { addRecipe, removeRecipe, updateRecipes } from "../store/actions"
import { Link } from "react-router-dom";

function MyRecipes(){

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


    return(
        <>
            <div>
                {recipes.map((recipe, index) => (state.auth.username == recipe.userName && ( 
                    <div style={{backgroundColor: "rgb(240, 240, 240)", paddingTop: "5px", padding: "10px", borderRadius: "5px", display: "inline-block", marginBottom: "10px", textAlign: "left"}} key={index}>
                        <span>
                            <Link to={`/recipes/${recipe.recipeID}`}>
                            <b style={{color:"black"}}>{recipe.recipeName}</b>
                            </Link>
                            <Link to={`/user/`}>
                            <p style={{color:"black"}}>author: {recipe.userName}</p>
                            </Link>
                            <p>{recipe.recipeDescription}</p>
                        </span>
                    </div>
                )))}
            </div>
        </>
    )
}

export default MyRecipes