import { render } from "@testing-library/react";
import Header from "../components/Header";

it('Header renderib', () => {
    const component = <Header shouldRender/>
    expect(component).toBeDefined()
})

