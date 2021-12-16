import Recipes from '../components/Recipes'

it('Retseptid renderivad', () => {
    const component = <Recipes shouldRender/>
    expect(component).toBeDefined()
})