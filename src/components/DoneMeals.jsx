import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import { onClipboardClicked } from '../services/supportFunctions';
import ApplicationContext from '../context/ApplicationContext';

function DoneMeals({ meals }) {
  const history = useHistory();
  const { clipboardState, setClipboardState } = useContext(ApplicationContext);
  // const [meals, setMeals] = useState([]);

  // useEffect(() => {
  //   const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  //   setMeals(doneRecipes);
  // }, []);

  // const filteredMeals = meals.filter(({ type }) => type === 'comida');
  return (
    <div>
      {
        meals.map((item, index) => {
          if (item.type === 'comida') {
            return (
              <div key={ index }>
                <button
                  type="button"
                  onClick={ () => history.push(`/comidas/${item.id}`) }
                >
                  <div>
                    <img
                      style={ { width: '50px', height: '50px' } }
                      src={ item.image }
                      alt="comida"
                      data-testid={ `${index}-horizontal-image` }
                    />
                    <p data-testid={ `${index}-horizontal-name` }>{ item.name }</p>
                  </div>
                </button>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { `${item.area} - ${item.category}` }
                </p>
                <button
                  src={ shareIcon }
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => {
                    const pathname = `/comidas/${item.id}`;
                    onClipboardClicked(setClipboardState, pathname);
                  } }
                >
                  <img src={ shareIcon } alt="compartilhar" />
                </button>
                <p>
                  {clipboardState ? 'Link copiado!' : ''}
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>{ item.doneDate }</p>
                <p
                  data-testid={ `${index}-${item.tags[0]}-horizontal-tag` }
                >
                  { item.tags[0]}
                </p>
                <p
                  data-testid={ `${index}-${item.tags[1]}-horizontal-tag` }
                >
                  { item.tags[1]}
                </p>
              </div>
            );
          }
          return (
            <div key={ index }>
              <button
                type="button"
                onClick={ () => history.push(`/bebidas/${item.id}`) }
              >
                <div>
                  <img
                    style={ { width: '50px', height: '50px' } }
                    src={ item.image }
                    alt="bebida"
                    data-testid={ `${index}-horizontal-image` }
                  />
                  <p data-testid={ `${index}-horizontal-name` }>{ item.name }</p>
                </div>
              </button>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { item.alcoholicOrNot }
              </p>
              <button
                src={ shareIcon }
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => {
                  const pathname = `/bebidas/${item.id}`;
                  onClipboardClicked(setClipboardState, pathname);
                } }
              >
                <img src={ shareIcon } alt="compartilhar" />
              </button>
              <p>
                {clipboardState ? 'Link copiado!' : ''}
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>{ item.doneDate }</p>
            </div>
          );
        })
      }
    </div>
  );
}

DoneMeals.propTypes = {
  meals: PropTypes.shape(PropTypes.objectOf.any).isRequired,
};

export default DoneMeals;
