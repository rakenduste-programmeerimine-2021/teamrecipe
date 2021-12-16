import OtherUserRecipes from "../components/OtherUserRecipes";

it('teiste kasutajate retseptid renderivad', () => {
    const component = <OtherUserRecipes shouldRender/>
    expect(component).toBeDefined()
})