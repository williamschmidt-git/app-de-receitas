import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import RecipesMainScreen from './pages/RecipesMainScreen';
import Profile from './pages/Profile';
import DrinksMainScreen from './pages/DrinksMainScreen';
import ExploreRecipies from './pages/ExploreRecipies';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreRecipiesIngredients from './pages/ExploreRecipiesIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
// import RecipiesDone from './pages/RecipiesDone';
import RecipiesFavorites from './pages/RecipiesFavorites';
import ExploreRecipiesArea from './pages/ExploreRecipiesArea';
import Explore from './pages/Explore';
import ApplicationProvider from './context/provider/ApplicationProvider';
import NotFound from './pages/NotFound';
import MealsInProgress from './pages/MealsInProgress';
import DrinksInProgress from './pages/DrinksInProgress';
import ScreenMealDetails from './pages/ScreenMealDetails';
import ScreenDrinkDetails from './pages/ScreenDrinkDetails';

function App() {
  return (
    <div className="app-container">
      <ApplicationProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ RecipesMainScreen } />
            <Route exact path="/bebidas" component={ DrinksMainScreen } />
            <Route exact path="/comidas/:id" component={ ScreenMealDetails } />
            <Route exact path="/bebidas/:id" component={ ScreenDrinkDetails } />
            <Route path="/comidas/:id/in-progress" component={ MealsInProgress } />
            <Route path="/bebidas/:id/in-progress" component={ DrinksInProgress } />
            <Route exact path="/explorar" component={ Explore } />
            <Route exact path="/explorar/comidas" component={ ExploreRecipies } />
            <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
            <Route
              path="/explorar/comidas/ingredientes"
              component={ ExploreRecipiesIngredients }
            />
            <Route
              path="/explorar/bebidas/ingredientes"
              component={ ExploreDrinksIngredients }
            />
            <Route path="/explorar/comidas/area" component={ ExploreRecipiesArea } />
            <Route path="/perfil" component={ Profile } />
            {/* <Route path="/receitas-feitas" component={ RecipiesDone } /> */}
            <Route path="/receitas-favoritas" component={ RecipiesFavorites } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </ApplicationProvider>
    </div>
  );
}

export default App;
