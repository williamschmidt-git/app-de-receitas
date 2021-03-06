import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchDrinksRandom } from '../services/helpers';

function ExploreDrinks() {
  const history = useHistory();

  const randomDrinks = async () => {
    const responseAPI = await fetchDrinksRandom();
    const { idDrink } = responseAPI.drinks[0];
    return history.push(`/bebidas/${idDrink}`);
  };

  return (
    <div>
      <Header pageName="Explorar Bebidas" />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={
          (() => {
            history.push('/explorar/bebidas/ingredientes');
          })
        }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={
          (() => {
            randomDrinks();
          })
        }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
