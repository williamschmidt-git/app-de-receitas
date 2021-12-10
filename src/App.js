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
import RecipiesDone from './pages/RecipiesDone';
import RecipiesFavorites from './pages/RecipiesFavorites';
import ExploreRecipiesArea from './pages/ExploreRecipiesArea';
import Explore from './pages/Explore';
import MealsProvider from './context/provider/MealsProvider';

function App() {
  return (
    <div className="meals">
      <MealsProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/comidas" component={ RecipesMainScreen } />
            <Route path="/bebidas" component={ DrinksMainScreen } />
            <Route path="/explorar" component={ Explore } />
            <Route path="/explorar/comidas" component={ ExploreRecipies } />
            <Route path="/explorar/bebidas" component={ ExploreDrinks } />
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
            <Route path="/receitas-feitas" component={ RecipiesDone } />
            <Route path="/receitas-favoritas" component={ RecipiesFavorites } />
          </Switch>
        </BrowserRouter>
      </MealsProvider>
    </div>
  );
}

export default App;
