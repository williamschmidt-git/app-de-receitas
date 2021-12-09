import React from 'react';

function HeaderSearchBar() {
  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
      />
      <label htmlFor="ingredient">
        Ingrediente:
        <input
          type="radio"
          id="ingredient"
          name="ingredient"
        />
      </label>
      <label htmlFor="name">
        Nome:
        <input
          type="radio"
          id="name"
          name="name"
        />
      </label>
      <label htmlFor="first-letter">
        Primeira Letra:
        <input
          type="radio"
          id="first-letter"
          name="first-letter"
        />
      </label>
    </div>
  );
}

export default HeaderSearchBar;
