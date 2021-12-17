import Registration from "../components/Registration";
import user from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import Checkbox from "antd/lib/checkbox/Checkbox";

it('Register form rendering', () => {
    const component = <Registration shouldRender />
    expect(component).toBeDefined()
});

// it('onFinish is called when all fields pass validation', async () => {
//     user.type(getUserName, 'Tester');
//     user.type(getFirstName, 'Eesnimi');
//     user.type(getLastName, 'Perekonnanimi');
//     user.type(getEmail, 'Tester@gmail.com');
//     screen.getByRole('checkbox', {
//         name: /enable email notifications/i
//     })
//     user.click(Checkbox);
//     user.click(screen.getByRole('button', {
//         name: /register/i
//     }))
//     await waitFor(() => {
//         expect(onFinish).toHaveBeenCalledTimes(1);
//     })
//     expect(onFinish).toHaveBeenCalledTimes({
//         lazy: "true"
//     })
// })

// function getUserName() {
//     return screen.getByRole('textbox', {
//   name: /username/i
// })
// }

// function getFirstName() {
//     return screen.getByRole('textbox', {
//   name: /firstname/i
// })
// }

// function getLastName() {
//     return screen.getByRole('textbox', {
//   name: /lastname/i
// })
// }

// function getEmail() {
//     return screen.getByRole('textbox', {
//   name: /email/i
// })
// }

