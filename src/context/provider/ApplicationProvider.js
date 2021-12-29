import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MealsContext from '../ApplicationContext';

function ApplicationProvider({ children }) {
  const [mealsArray, setMealsArray] = useState([]);
  const [drinksArray, setDrinksArray] = useState([]);

  const contextValue = {
    mealsArray,
    setMealsArray,
    drinksArray,
    setDrinksArray,
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
