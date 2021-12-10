import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Context } from "../store"
import { updateRecipes } from "../store/actions"
import { Link } from "react-router-dom";
import { Col, Row, Tooltip, message } from "antd";

function OtherUserRecipes(){
    const [state, dispatch] = useContext(Context);
    const [recipes, setRecipes] = useState([]);
    const {userName} = useParams();

    useEffect(() => {
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
    }, [])

    return(
        <>
            <Col>
                <Row>
                {recipes.map((recipe, index) => (userName === recipe.userName && ( 
                    <div style={{backgroundColor: "rgb(240, 240, 240)", margin: "10px", borderRadius: "5px"}} key={index}>
                            <Link to={`/recipes/${recipe.recipeID}`}>
                            <div style={{position: "relative"}}>
                                <img src={recipe.imageURL} title={recipe.recipeName} width="150" height="150" style={{cursor: "pointer", padding: "10px"}}/>
                                <b style={{position:"absolute", top:"85%", left: "50%", transform: "translate(-50%, -50%)", color:"white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "110px", textShadow: "1px 1px 1px rgb(0,0,0), 1px -1px 1px rgb(0,0,0), -1px -1px 1px rgb(0,0,0), -1px 1px 1px rgb(0,0,0)"}}>{recipe.recipeName}</b>
                            </div>
                            </Link>
                    </div>
                )))}
                </Row>
            </Col>
        </>
    )
}

export default OtherUserRecipes