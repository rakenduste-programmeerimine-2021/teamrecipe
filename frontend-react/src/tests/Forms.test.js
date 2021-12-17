import { render, screen } from '@testing-library/react';

import Registration from "../components/Registration";
import Login from "../components/Login";
import RecipeCreate from "../pages/RecipeCreate";

test('Register render test', () => {
    const component = <Registration shouldRender />
    expect(component).toBeDefined()
})