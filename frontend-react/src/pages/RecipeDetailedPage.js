import { Table, message, Button, Tooltip } from "antd"
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import { Context } from "../store";
import { EditOutlined } from '@ant-design/icons';

function RecipePage(){
    const {recipeID} = useParams();
    const [state, dispatch] = useContext(Context)
    const [data, setData] = useState([]);
    let rows;
    let steps = [];

    console.log(data)

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
            message.error(error.toString());
        });
    }, [rows])

    const checkAccount = () => {
        if(data.userName == state.auth.username){
            return (
            <>
                <img src={data.imageURL} width="300" height="300" style={{marginBottom: "10px"}}/>
                <h1 style={{fontWeight:"700"}}>{data.recipeName} <Tooltip title="Edit recipe" placement="right"><Link to={data.recipeID + `/edit`}><Button style={{border:"none"}} icon={<EditOutlined />} shape="circle"></Button></Link></Tooltip></h1>
                <p><b>Author: {data.userName}</b></p>
                <p><b>Recipe Type:</b><br/> {data.recipeType}</p>
                <p><b>Recipe Description:</b><br/> {data.recipeDescription}</p>
                <Table dataSource={rows} columns={columns} size="small" pagination="false"/>
                {steps}
                <p><b>Recipe privacy: </b><br/>{data.recipePrivacy}</p>
            </>
            )
        } else {
            return (
            <>
                <img src={data.imageURL} width="300" height="300" style={{marginBottom: "10px"}}/>
                <h1 style={{fontWeight:"700"}}>{data.recipeName}</h1>
                <p><b>Author: {data.userName}</b></p>
                <p>{data.recipeDescription}</p>
                <Table dataSource={rows} columns={columns} size="small" pagination="false"/>
                {steps}
            </>
            )
        }
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
            key: i,
            ingredient: row,
            amount: data.recipeIngredientAmount[i],
        }))
        rows = [...iteratedData];

        for(let i=0; i<data.recipeSteps.length; i++){
            steps.push(<><h2 style={{fontWeight:'700'}}>STEP {i+1}</h2><p>{data.recipeSteps[i]}</p></>)
        }
    }

    return(
        checkAccount()
    );
}

export default RecipePage;