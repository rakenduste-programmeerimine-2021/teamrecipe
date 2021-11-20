import { useEffect, useState } from "react";
import FollowedRecipes from "../components/FollowedRecipes";
import Image from "../images/recipe1.jpg"
import { Table } from "antd"

function RecipePage(){
    const dataSource = [
    {
        key: '1',
        ingredient: 'Chicken',
        amount: '1 kg',
    },
    {
        key: '2',
        ingredient: 'Panko Breadcrumbs',
        amount: '200 g',
    }
    ]

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
        <img src={Image} alt="Chicken" width="300" height="300" style={{marginBottom: "10px"}}/>
        <h1 style={{fontWeight:"700"}}>Gluten Free Baked Chicken Tenders Recipe</h1>
        <p><b>Author</b>: account552</p>
        <p>Crunchy chicken tenders are one of the most kid friendly foods around. Kids adore them and I suspect many adults do as well. Most family restaurants offer these golden nuggets on their kiddies menu and my boys have had their fair share when they were little.</p>
        <Table dataSource={dataSource} columns={columns} size="small" pagination="hideOnSinglePage"/>
        <h2 style={{fontWeight:"700"}}>STEP 1</h2>
        <p>Step 1 tekst jne</p>
        <h2 style={{fontWeight:"700"}}>STEP 2</h2>
        <p>Step 2 tekst jne</p>
        </>
    );
}

export default RecipePage;