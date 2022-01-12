import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchImage from '../images/searchIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';
import '../styles/header.css';

function Header({ pageName }) {
  const [isHiddenSearchBar, setSearchBar] = useState(false);
  const { location: { pathname } } = useHistory();
  let toRenderSearchIcon = false;

  if (pathname === '/comidas'
  || pathname === '/bebidas'
  || pathname === '/explorar/comidas/area') {
    toRenderSearchIcon = true;
  }

  const toggleSearchBar = () => {
    setSearchBar(!isHiddenSearchBar);
  };

  return (
    <nav
      className="navbar navbar-dark"
      style={ { backgroundColor: '#F49952' } }
    >
      <div className="container">
        <Link
          src={ profileIcon }
          data-testid="profile-top-btn"
          to="/perfil"
        >
          <img src={ profileIcon } alt="User" />
        </Link>
        <div
          data-testid="page-title"
          style={ { fontSize: '35px', color: 'white' } }
        >
          { pageName }

        </div>

        {toRenderSearchIcon ? (
          <button
            style={ { border: 'none', backgroundColor: '#F49952' } }
            type="button"
            onClick={ () => toggleSearchBar() }
          >
            <img
              src={ searchImage }
              alt="Search"
              data-testid="search-top-btn"
            />
          </button>
        ) : (
          null
        )}
        {isHiddenSearchBar ? <HeaderSearchBar /> : null}
      </div>

    </nav>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default Header;
