import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loadind from '../components/Loading';
import '../css/login.css';
import logoItunes from '../images/itunes_logo.png';

const MINIMUM_SIZE = 3;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      loading: false,
    };
  }

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      nameInput: value,
    });
  };

  onClickButton = () => {
    this.setState({ loading: true }, async () => {
      const { nameInput } = this.state;
      await createUser({ name: nameInput });
      this.setState({ loading: 'completed' });
    });
  };

  render() {
    const { nameInput, loading } = this.state;

    return (
      <div className="login-container" data-testid="page-login">
        <div className="login-logo-title-container">
          <img src={ logoItunes } className="login-logo-img" alt="Logo itunes" />
          <div className="login-title-container">
            <h1 className="login-title">iTunes</h1>
            <h1 className="login-title-signature">by Leandro</h1>
          </div>
        </div>
        <div className="nameInput-button-container">
          <input
            type="text"
            data-testid="login-name-input"
            placeholder="Nome"
            onChange={ this.onInputChange }
            value={ nameInput }
          />
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ nameInput.length < MINIMUM_SIZE }
            onClick={ this.onClickButton }
          >
            Entrar
          </button>
        </div>
        <div style={ { position: 'absolute' } }>
          {loading === true ? <Loadind /> : null}
        </div>
        {loading === 'completed' ? <Redirect to="/search" /> : null}
      </div>
    );
  }
}

export default Login;
