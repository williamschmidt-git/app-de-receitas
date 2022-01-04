import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  let isValidUser = false;
  let parseUser;

  if (localStorage.length !== 0) {
    const { user } = localStorage;
    parseUser = JSON.parse(user);
    isValidUser = true;
  }

  return (
    <div data-testid="page-title">
      <Header pageName="Perfil" />
      <h2 data-testid="profile-email">
        {isValidUser ? (
          parseUser.email
        ) : null}
      </h2>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={
          (() => {
            history.push('/receitas-feitas');
          })
        }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={
          (() => {
            history.push('/receitas-favoritas');
          })
        }
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={
          (() => {
            localStorage.clear();
            history.push('/');
          })
        }
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
