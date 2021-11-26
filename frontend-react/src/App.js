import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import RecipePage from "./pages/RecipePage";
import SearchPage from "./pages/SearchPage";
import Registration from "./components/Registration";
import AccountPage from "./pages/AccountPage";
import AccountPageEdit from "./pages/AccountPageEdit";
import RecipeDetailedPage from "./pages/RecipeDetailedPage";
import CookbookPage from "./pages/CookbookPage";
import RecipeCreate from "./pages/RecipeCreate";
import "./App.less"

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Header} />
      <div className="content">
        <div className="content-border">
          <Switch>
            <Route exact path="/recipes" component={RecipePage}/>
            <Route exact path="/create" component={RecipeCreate}/>
            <Route exact path="/recipes/:recipeid" component={RecipeDetailedPage}/>
            <Route exact path="/cookbook" component={CookbookPage}/>
            <Route exact path="/search" component={SearchPage}/>
            <Route exact path="/account" component={AccountPage}/>
            <Route exact path="/account/registration" component={Registration} />
            <Route exact path="/account/edit" component={AccountPageEdit} />
          </Switch>
          <h1 className="footer"></h1>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
