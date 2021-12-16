import MyRecipes from "../components/MyRecipes";

it('MyRecipes renderib', () => {
    const component = <MyRecipes shouldRender/>
    expect(component).toBeDefined()
})