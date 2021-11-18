import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import Main from "./pages/Main";


function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Header} />
      <Switch>
        <Route exact path="/" component={Main}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
