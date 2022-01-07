import React, { useContext } from 'react';
import shareIcon from '../images/shareIcon.svg';
import { onClipboardClicked } from '../services/supportFunctions';
import ApplicationContext from '../context/ApplicationContext';

const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

function DoneDrinks() {
  const { clipboardState, setClipboardState } = useContext(ApplicationContext);
  return (
    <div>
      {
        doneRecipes.map((drink, index) => (
          <div key={ index }>
            <img
              src={ drink.image }
              alt="bebida"
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{ drink.alcoholicOrNot }</p>
            <p data-testid={ `${index}-horizontal-name` }>{ drink.name }</p>
            <button
              src={ shareIcon }
              type="button"
              data-testid={ `${index}-horizontal-share-btn"` }
              onClick={ () => onClipboardClicked(setClipboardState, drink.id) }
            >
              <img src={ shareIcon } alt="compartilhar" />
            </button>
            <p>
              {clipboardState ? 'Link copiado!' : ''}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{ drink.doneDate }</p>
          </div>
        ))
      }
    </div>
  );
}

export default DoneDrinks;
