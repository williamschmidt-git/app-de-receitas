import PropTypes from 'prop-types';
import React from 'react';
import MealsContext from '../ApplicationContext';

function ApplicationProvider({ children }) {
  const contextValue = {};

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
