import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/login.css';

function Login() {
  const history = useHistory();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleChange = ({ target }) => {
    const { value, name } = target;
    return name === 'email' ? setEmail(value) : setPassword(value);
  };

  const isDisabledButton = () => {
    const passwordLength = 6;
    if (email.includes('.com')
    && email.includes('@')
    && password.length > passwordLength) {
      return false;
    }
    return true;
  };

  const saveOnLocalStorage = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };

  return (
    <div className="login-container">
      <form className="form-group form-login-container">
        <div
          className="div-container-all p-3 mb-5 bg-white rounded"
        >
          <div className="sign-in-text-container">
            <p className="sign-in-paragraph">
              Faça Login
            </p>
          </div>
          <div className="email-container">
            <input
              type="email"
              name="email"
              className="form-control form-control-sm input-email"
              aria-describedby="emailHelp"
              value={ email }
              placeholder="Digite o email"
              data-testid="email-input"
              onChange={ (event) => handleChange(event) }
            />
          </div>
          <div className="password-container">
            <input
              type="password"
              name="password"
              className="form-control form-control-sm input-password"
              value={ password }
              placeholder="Digite senha"
              data-testid="password-input"
              onChange={ (event) => handleChange(event) }
            />
          </div>
          <button
            className="btn btn-danger"
            type="button"
            data-testid="login-submit-btn"
            variant="success"
            disabled={ isDisabledButton() }
            onClick={
              (() => {
                saveOnLocalStorage();
                history.push('/comidas');
              })
            }
          >
            Entrar
          </button>
        </div>
        <div className="date-container">
          <p className="date-paragraph">
            &#169;
            &nbsp;
            {`Jan/${new Date().getFullYear()}`}
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
