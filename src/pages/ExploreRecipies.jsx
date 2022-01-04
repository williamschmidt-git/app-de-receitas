import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchMealsRandom } from '../services/helpers';

function ExploreRecipies() {
  const history = useHistory();

  const randomMeals = async () => {
    const responseAPI = await fetchMealsRandom();
    const { idMeal } = responseAPI.meals[0];
    return history.push(`/comidas/${idMeal}`);
  };

  return (
    <div>
      <Header pageName="Explorar Comidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={
          (() => {
            history.push('/explorar/comidas/ingredientes');
          })
        }
      >
        Por Ingredientes
      </button>

      <button
        type="button"
        data-testid="explore-by-area"
        onClick={
          (() => {
            history.push('/explorar/comidas/area');
          })
        }
      >
        Por Local de Origem
      </button>

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={
          (() => {
            randomMeals();
          })
        }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreRecipies;
