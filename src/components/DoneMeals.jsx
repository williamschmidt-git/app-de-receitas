import React, { useContext } from 'react';
import shareIcon from '../images/shareIcon.svg';
import { onClipboardClicked } from '../services/supportFunctions';
import ApplicationContext from '../context/ApplicationContext';

const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

function DoneMeals() {
  const { clipboardState, setClipboardState } = useContext(ApplicationContext);
  return (
    <div>
      {
        doneRecipes.map((meal, index) => (
          <div key={ index }>
            <img
              src={ meal.image }
              alt="comida"
              data-testid={ `${index}-horizontal-image` }
            />
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { `${meal.area} - ${meal.category}` }

            </p>
            <p data-testid={ `${index}-horizontal-name` }>{ meal.name }</p>
            <button
              src={ shareIcon }
              type="button"
              data-testid={ `${index}-horizontal-share-btn"` }
              onClick={ () => onClipboardClicked(setClipboardState, meal.id) }
            >
              <img src={ shareIcon } alt="compartilhar" />
            </button>
            <p>
              {clipboardState ? 'Link copiado!' : ''}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{ meal.doneDate }</p>
            <p
              data-testid={ `${index}-${meal.tags[0]}-horizontal-tag` }
            >
              { meal.tags[0]}

            </p>
            <p
              data-testid={ `${index}-${meal.tags[1]}-horizontal-tag` }
            >
              { meal.tags[1]}

            </p>
          </div>
        ))
      }
    </div>
  );
}

export default DoneMeals;
