import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userImage from '../images/profileIcon.svg';
import searchImage from '../images/searchIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';

function Header() {
  const [isHiddenSearchBar, setSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setSearchBar(!isHiddenSearchBar);
  };

  return (
    <header>
      <Link
        src={ userImage }
        data-testid="profile-top-btn"
        to="/perfil"
      >
        <img src={ userImage } alt="User" />
      </Link>
      <div data-testid="page-title">Comidas</div>
      <button
        type="button"
        onClick={ () => toggleSearchBar() }
      >
        <img
          src={ searchImage }
          alt="Search"
          data-testid="search-top-btn"
        />
      </button>
      {isHiddenSearchBar && <HeaderSearchBar />}
    </header>
  );
}

export default Header;
