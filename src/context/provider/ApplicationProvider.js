import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MealsContext from '../ApplicationContext';

function ApplicationProvider({ children }) {
  const [mealsArray, setMealsArray] = useState([]);
  const [drinksArray, setDrinksArray] = useState([]);
  const [mealsCategory, setMealsCategory] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);
  const [recipesByMealsCategory, setMealsRecipes] = useState([]);
  const [changeArrayToRender, setArrayToRender] = useState(false);
  const [mealSelected, setMealSelected] = useState('');

  const contextValue = {
    mealsArray,
    setMealsArray,
    drinksArray,
    setDrinksArray,
    mealsCategory,
    setMealsCategory,
    drinksCategory,
    setDrinksCategory,
    recipesByMealsCategory,
    setMealsRecipes,
    changeArrayToRender,
    setArrayToRender,
    mealSelected,
    setMealSelected,
  };

  return (
    <MealsContext.Provider
      value={ contextValue }
    >
      {children}
    </MealsContext.Provider>
  );
}

ApplicationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ApplicationProvider;
