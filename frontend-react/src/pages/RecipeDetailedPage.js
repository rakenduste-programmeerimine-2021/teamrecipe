import FollowedRecipes from "../components/FollowedRecipes";
import Image from "../images/recipe1.jpg"
import { Table, message } from "antd"
import { useEffect, useState, useContext } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Context } from "../store"
import { addRecipe, removeRecipe, updateRecipes } from "../store/actions"
import { useParams } from "react-router";

function RecipePage(){

    const [state, dispatch] = useContext(Context);
    const [requestData, setRequestData] = useState("");
    const [recipes, setRecipes] = useState([]);
    const {recipeID} = useParams();

        useEffect(() => {
        getRecipe();

        async function getRecipe(){
        fetch("http://localhost:8081/api/recipe/" + recipeID)
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error("error fetching");
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
    }, [requestData])

        const displayError = (error) => {
    message.error(error.toString());
  }

    // const dataSource = [
    // {
    //     key: '1',
    //     ingredient: 'Chicken',
    //     amount: '1 kg',
    // },
    // {
    //     key: '2',
    //     ingredient: 'Panko Breadcrumbs',
    //     amount: '200 g',
    // }
    // ]

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
        <h2>id - {recipeID}</h2>
        <img src={Image} alt="Chicken" width="300" height="300" style={{marginBottom: "10px"}}/>
        <h1 style={{fontWeight:"700"}}>title</h1>
        <p><b>Author:</b></p>
        <p>body</p>
        <Table columns={columns} size="small" pagination="hideOnSinglePage"/>
        <h2 style={{fontWeight:"700"}}>STEP 1</h2>
        <p>Step 1 tekst jne</p>
        <h2 style={{fontWeight:"700"}}>STEP 2</h2>
        <p>Step 2 tekst jne</p>
        </>
    );
}

export default RecipePage;