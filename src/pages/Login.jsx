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
    <form className="login-form">
      <input
        type="text"
        name="email"
        value={ email }
        placeholder="Digite o email"
        data-testid="email-input"
        onChange={ (event) => handleChange(event) }
      />
      <input
        type="password"
        name="password"
        value={ password }
        placeholder="Digite senha"
        data-testid="password-input"
        onChange={ (event) => handleChange(event) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
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
    </form>
  );
}

export default Login;
