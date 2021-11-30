import Image2 from "../images/recipe2.jpg"

function FollowedRecipes(){
    return(
    <>
        <div style={{backgroundColor: "rgb(240, 240, 240)", paddingTop: "5px", padding: "10px", borderRadius: "5px", display: "inline-block", textAlign: "left"}}>
        <img src={Image2} alt="Italian Meatballs" width="150" height="150" style={{ float: "left", marginRight: "10px", cursor: "pointer"}}/>
            <span>
                <b style={{cursor: "pointer"}}>Italian Meatballs Recipe</b>
                <p>Author: defaultSg</p>
                <p>Years ago I had an Italian neighbor who became a close friend. I always commented on her delicious meatballs and one day she shared the recipe with me. I have made them ever since about the same way. You can vary the meats using what's on hand</p>
            </span>
        </div>
    </>
    )
}

export default FollowedRecipes;