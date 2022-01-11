import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import { onClipboardClicked } from '../services/supportFunctions';
import ApplicationContext from '../context/ApplicationContext';

const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

function DoneDrinks() {
  const history = useHistory();
  const { clipboardState, setClipboardState } = useContext(ApplicationContext);
  return (
    <div>
      {
        doneRecipes.map((drink, index) => (
          <div key={ index }>
            <button
              src={ drink.image }
              type="button"
              onClick={ () => history.push('/bebidas/${drink.id') }

            >
              <img
                src={ drink.image }
                alt="bebida"
                data-testid={ `${index}-horizontal-image` }
              />
            </button>

            <p data-testid={ `${index}-horizontal-top-text` }>{ drink.alcoholicOrNot }</p>

            <button
              type="button"
              onClick={ () => history.push('/bebidas/${drink.id') }
            >
              <p data-testid={ `${index}-horizontal-name` }>{ drink.name }</p>
            </button>

            <button
              src={ shareIcon }
              type="button"
              onClick={ () => {
                const pathname = `/bebidas/${drink.id}`;
                onClipboardClicked(setClipboardState, pathname);
              } }
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
