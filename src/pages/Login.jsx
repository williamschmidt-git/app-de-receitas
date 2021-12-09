import React, { useState } from 'react';

function Login() {
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
    } return true;
  };

  return (
    <form>
      <input
        type="email"
        name="email"
        value={ email }
        placeholder="Digite o email"
        data-testid="email-input"
        onChange={ (event) => handleChange(event) }
      />
      <input
        type="text"
        name="password"
        value={ password }
        placeholder="Digite senha"
        data-testid="password-input"
        onChange={ (event) => handleChange(event) }
      />
      <button
        type="button"
        onClick={ (e) => console.log(e.target) }
        data-testid="login-submit-btn"
        disabled={ isDisabledButton() }
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
