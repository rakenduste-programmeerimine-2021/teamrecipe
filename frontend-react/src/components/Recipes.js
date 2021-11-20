import Image from "../images/recipe1.jpg"
import Image2 from "../images/recipe2.jpg"

function Recipes(){
    function allRecipes(){
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

    return allRecipes()
    
}

export default Recipes