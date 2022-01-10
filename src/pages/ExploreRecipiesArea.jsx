import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchMealsArea } from '../services/helpers';

function ExploreRecipiesArea() {
  const [area, setArea] = useState([]);

  const requestAPI = async () => {
    const responseAPI = await fetchMealsArea();
    setArea(responseAPI.meals);
  };

  useEffect(() => {
    requestAPI();
  }, []);

  return (
    <div>
      <Header pageName="Explorar Origem" />
      <div>
        <select data-testid="explore-by-area-dropdown">
          <option data-testid="All-option">All</option>
          {area.map((recipe, index) => (
            <option
              data-testis={ `[data-testid="${recipe.strArea}-option"]` }
              key={ index }
            >
              {recipe.strArea}
            </option>
          ))}
        </select>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreRecipiesArea;
