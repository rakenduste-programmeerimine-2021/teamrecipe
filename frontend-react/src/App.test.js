import { render, screen } from '@testing-library/react';
import RecipePage from './pages/RecipePage';
import App from './App';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Switch } from 'antd';
import {Context} from './store'


describe('renders learn react link', () => {
  const context = {
    'auth':null,
  }

  const dispatch = jest.fn

  test('renders learn react link', () => {
  render(
  <Context.Provider value={[context, dispatch]}>
  <App><BrowserRouter><Switch><RecipePage></RecipePage></Switch></BrowserRouter></App>
  </Context.Provider>
  );
  const linkElement = screen.queryAllByText(/learn react/i);
  expect(linkElement).toHaveLength(0);
});
})