import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MealsContext from '../MealsContext';

function MealsProvider({ children }) {
  const [searchInput, setSearchInput] = useState('');

  const contextValue = {
    searchInput,
    setSearchInput,
  };

  return (
    <MealsContext.Provider
      value={ contextValue }
    >
      {children}
    </MealsContext.Provider>
  );
}

MealsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MealsProvider;
