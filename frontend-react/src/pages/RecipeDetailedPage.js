import { Table, message, Button, Tooltip } from "antd"
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import { Context } from "../store";
import { EditOutlined, StarOutlined, StarFilled } from '@ant-design/icons';

function RecipePage(){
    const {recipeID} = useParams();
    const [state, dispatch] = useContext(Context)
    const [data, setData] = useState([]);
    const [likeData, setLikeData] = useState([]);
    var rows;
    var steps = [];
    var tempArray = [];

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
            if(state.auth.username != undefined){
                checkLike();
            }
        }).catch(error => {
            message.error(error.toString());
        });
    }, [rows, data])

    async function checkLike(){
        fetch("http://localhost:8081/api/recipe/like/" + state.auth.username
        ).then((response) => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error("Error fetching the recipe!");
            }
        }).then((allData) => {
            for(var i=0; i<allData.length; i++){
                tempArray.push(allData[i].recipeID)
            }
            setLikeData(tempArray)
        }).catch(error => {
            message.error(error.toString());
        });
    }

    const likeRecipe = () => {
        const data = {
            userName: state.auth.username,
            recipeID: recipeID
        }
        fetch("http://localhost:8081/api/recipe/like",{
            method: "PUT",
            body: JSON.stringify(data),
            headers: {"Content-Type":"application/json"}
        }).then(response => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error("Recipe has already been liked")
            }
        }).then(() => {
            message.success("Recipe liked successfully!")
        }).catch(error => {
            message.error(error.toString())
        });
    }

    const unLikeRecipe = () => {
        const data = {
            userName: state.auth.username,
            recipeID: recipeID
        }
        fetch("http://localhost:8081/api/recipe/unlike",{
            method: "PUT",
            body: JSON.stringify(data),
            headers: {"Content-Type":"application/json"}
        }).then(response => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error("Recipe has already been unliked")
            }
        }).then(() => {
            message.success("Recipe unliked successfully!")
        }).catch(error => {
            message.error(error.toString())
        });
    }

    const checkAccount = () => {
        if(data.userName == state.auth.username){
            return (
            <>
                <img src={data.imageURL} width="300" height="300" style={{marginBottom: "10px"}}/>
                <h1 style={{fontWeight:"700"}}>{data.recipeName} <Tooltip title="Edit recipe" placement="right"><Link to={data.recipeID + `/edit`}><Button style={{border:"none"}} icon={<EditOutlined />} shape="circle"></Button></Link></Tooltip></h1>
                <Link to={`/account`}><p style={{color:"black"}}><b>Author: {data.userName}</b></p></Link>
                <p>{data.recipeDescription}</p>
                <Table dataSource={rows} columns={columns} size="small" pagination="false"/>
                {steps}
                
            </>
            )
        } else {
            if(state.auth.username != undefined){
                if(likeData.includes(parseInt(recipeID))){
                    return (
                        <>
                            <img src={data.imageURL} width="300" height="300" style={{marginBottom: "10px"}}/>
                            <h1 style={{fontWeight:"700"}}>{data.recipeName} <Tooltip title="Unlike" placement="right"><Button shape="circle" style={{border:"none"}} icon={<StarFilled/>} onClick={unLikeRecipe}></Button></Tooltip></h1>
                            <Link to={`/user/${data.userName}`}><p style={{color:"black"}}><b>Author: </b><br/>{data.userName}</p></Link>
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
                            <h1 style={{fontWeight:"700"}}>{data.recipeName} <Tooltip title="Like" placement="right"><Button shape="circle" style={{border:"none"}} icon={<StarOutlined/>} onClick={likeRecipe}></Button></Tooltip></h1>
                            <Link to={`/user/${data.userName}`}><p style={{color:"black"}}><b>Author: </b><br/>{data.userName}</p></Link>
                            <p><b>Recipe Type:</b><br/> {data.recipeType}</p>
                            <p><b>Recipe Description:</b><br/> {data.recipeDescription}</p>
                            <Table dataSource={rows} columns={columns} size="small" pagination="false"/>
                            {steps}
                            <p><b>Recipe privacy: </b><br/>{data.recipePrivacy}</p>
                        </>
                    )
                }
            } else {
                return(
                    <>
                        <img src={data.imageURL} width="300" height="300" style={{marginBottom: "10px"}}/>
                        <h1 style={{fontWeight:"700"}}>{data.recipeName}</h1>
                        <Link to={`/user/${data.userName}`}><p style={{color:"black"}}><b>Author: </b><br/>{data.userName}</p></Link>
                        <p><b>Recipe Type:</b><br/> {data.recipeType}</p>
                        <p><b>Recipe Description:</b><br/> {data.recipeDescription}</p>
                        <Table dataSource={rows} columns={columns} size="small" pagination="false"/>
                        {steps}
                        <p><b>Recipe privacy: </b><br/>{data.recipePrivacy}</p>
                    </>
                )
                
            }
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