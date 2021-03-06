import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

describe('Verifica comportamento da página de Login', () => {
  it('Verifica se os inputs e o botão são renderizados na ṕágina', () => {
    renderWithRouter(<Login />);

    const inputEmail = screen.getByPlaceholderText(/digite o email/i);
    const inputPassword = screen.getByPlaceholderText(/digite senha/i);
    const buttonSend = screen.getByRole('button', { name: /entrar/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonSend).toBeInTheDocument();
    expect(buttonSend).toHaveAttribute('disabled');
  });

  it('Verifica se o email e a senha são validados corretamente', () => {
    const { history } = renderWithRouter(<Login />);

    const inputEmail = screen.getByPlaceholderText(/digite o email/i);
    const inputPassword = screen.getByPlaceholderText(/digite senha/i);
    const buttonSend = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'estudante.com');
    expect(buttonSend).toHaveAttribute('disabled');
    userEvent.type(inputPassword, '12345');
    expect(buttonSend).toHaveAttribute('disabled');

    userEvent.type(inputEmail, 'estudante@estudante.com');
    userEvent.type(inputPassword, '1234567');
    expect(buttonSend).not.toHaveAttribute('disabled');

    userEvent.click(buttonSend);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/comidas');
  });
});
