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
    <header>
      <div className="border div-header">
        <div className="btn-profile">
          <Link
            className="btn btn-danger"
            src={ profileIcon }
            data-testid="profile-top-btn"
            to="/perfil"
            style={ { width: 'auto' } }
          >
            <img src={ profileIcon } alt="User" />
          </Link>
        </div>

        <div data-testid="page-title" className="text-header">{ pageName }</div>
        <div>
          {toRenderSearchIcon ? (
            <button
              type="button"
              onClick={ () => toggleSearchBar() }
              className="btn btn-danger btn-search"
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

      </div>
    </header>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default Header;
