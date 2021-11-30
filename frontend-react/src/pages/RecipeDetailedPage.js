import Image from "../images/recipe1.jpg"
import { Table, message } from "antd"
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Context } from "../store";

function RecipePage(){
    const {recipeID} = useParams();
    const [data, setData] = useState([]);
    let rows;
    let steps = [];
    console.log(recipeID)

    useEffect(() => {
        fetch("http://localhost:8081/api/recipe/" + recipeID
        ).then((response) => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error("Error fetching the recipe!");
            }
        }).then((data) => {
            setData(data)
        }).catch(error => {
            displayError(error)
        });
    }, [rows])

    const displayError = (error) => {
        message.error(error.toString());
    }

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

    if(data._id !== undefined && rows == undefined){
        const iteratedData = data.recipeIngredients.map((row, i) => ({
            key: row,
            ingredient: row,
            amount: data.recipeIngredientAmount[i],
        }))
        rows = [...iteratedData];

        for(let i=0; i<data.recipeSteps.length; i++){
            steps.push(<><h2 style={{fontWeight:'700'}}>STEP {i+1}</h2><p>{data.recipeSteps[i]}</p></>)
        }
    }

    return(
        <>
            <img src={Image} alt="Chicken" width="300" height="300" style={{marginBottom: "10px"}}/>
            <h1 style={{fontWeight:"700"}}>{data.recipeName}</h1>
            <p><b>Author: {data.userName}</b></p>
            <p></p>
            <Table dataSource={rows} columns={columns} size="small" pagination="false"/>
            {steps}
        </>
    );
}

export default RecipePage;