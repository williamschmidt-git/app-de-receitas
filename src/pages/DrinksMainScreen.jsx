import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function DrinksMainScreen({ history }) {
  return (
    <div>
      <Header pageName="Bebidas" history={ history } />
      Bebidas
      <Footer />
    </div>
  );
}

export default DrinksMainScreen;
