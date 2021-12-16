import Login from "../components/Login";

it('login form rendering', () => {
    const component = <Login shouldRender/>
    expect(component).toBeDefined();
})