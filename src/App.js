import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import RecipesMainScreen from './pages/RecipesMainScreen';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="meals">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas" component={ RecipesMainScreen } />
          {/* <Route path="/bebidas" component={ DrinksMainScreen } /> */}
          <Route path="/perfil" component={ Profile } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
