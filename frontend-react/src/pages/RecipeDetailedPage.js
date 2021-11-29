import FollowedRecipes from "../components/FollowedRecipes";
import Image from "../images/recipe1.jpg"
import { Table, message } from "antd"
import { useEffect, useState, useContext } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Context } from "../store"
import { addRecipe, removeRecipe, updateRecipes } from "../store/actions"
import { useParams } from "react-router";

function RecipePage(){

    // const [state, dispatch] = useContext(Context);
    // const [requestData, setRequestData] = useState("");
    // const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false)
    const {recipeID} = useParams();

    // useEffect(() => {
    //     setLoading(true)
    // }, [recipeID])


    const columns = [
    {
        title: 'Ingredient',
        dataIndex: 'ingredient',
        key: 'ingredient',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    }
    ]

    return(
        <>
        <h2>{recipeID}</h2>
        <img src={Image} alt="Chicken" width="300" height="300" style={{marginBottom: "10px"}}/>
        <h1 style={{fontWeight:"700"}}>title</h1>
        <p><b>Author: </b></p>
        <p></p>
        <Table columns={columns} size="small" pagination="hideOnSinglePage"/>
        <h2 style={{fontWeight:"700"}}>STEP 1</h2>
        <p></p>
        <h2 style={{fontWeight:"700"}}>STEP 2</h2>
        <p></p>
        </>
    );
}

export default RecipePage;