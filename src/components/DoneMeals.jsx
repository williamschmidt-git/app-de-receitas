import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import { onClipboardClicked } from '../services/supportFunctions';
import ApplicationContext from '../context/ApplicationContext';

function DoneMeals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setMeals(doneRecipes);
  }, []);

  const history = useHistory();
  const { clipboardState, setClipboardState } = useContext(ApplicationContext);
  const filteredMeals = meals.filter(({ type }) => type === 'comida');
  return (
    <div>
      {
        filteredMeals.map((meal, index) => (
          <div key={ index }>
            <button
              type="button"
              onClick={ () => history.push(`/comidas/${meal.id}`) }
            >
              <div>
                <img
                  src={ meal.image }
                  alt="comida"
                  data-testid={ `${index}-horizontal-image` }
                />
                <p data-testid={ `${index}-horizontal-name` }>{ meal.name }</p>
              </div>
            </button>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { `${meal.area} - ${meal.category}` }

            </p>
            <button
              src={ shareIcon }
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => {
                const pathname = `/comidas/${meal.id}`;
                onClipboardClicked(setClipboardState, pathname);
              } }
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
