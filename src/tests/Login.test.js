import render, { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';

describe('Verifica comportamento da página de Login', () => {
  it('Verifica se os inputs e o botão são renderizados na ṕágina', () => {
    render(Login);

    const inputEmail = screen.findByText(/email/i);
    const inputPassword = screen.findByText(/password/i);
    const buttonSend = screen.findByText(/send/i);

    expect(inputEmail).toBeIntheDocument();
    expect(inputPassword).toBeIntheDocument();
    expect(buttonSend).toBeIntheDocument();
    expect(buttonSend).toHaveAttribute('disabled', true);
  });

  it('Verifica se o email e a senha são validados corretamente', () => {
    render(Login);

    const inputEmail = screen.findByText(/email/i);
    const inputPassword = screen.findByText(/password/i);
    const buttonSend = screen.findByText(/send/i);

    userEvent.type(inputEmail, 'estudante.com');
    expect(buttonSend).toHaveAttribute('disabled', true);
    userEvent.type(inputPassword, '12345');
    expect(buttonSend).toHaveAttribute('disabled', true);

    userEvent.type(inputEmail, 'estudante@estudante.com');
    userEvent.type(inputPassword, '123456');
    expect(buttonSend).toHaveAttribute('disabled', false);
  });
});