import FollowedRecipes from "../components/FollowedRecipes";

function CookbookPage(){
    return(
        <>
        <h1 style={{fontWeight:"700"}}>My Cookbook</h1>
        <FollowedRecipes></FollowedRecipes>
        </>
    );
}

export default CookbookPage;