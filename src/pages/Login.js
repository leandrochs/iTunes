import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loadind from '../components/Loading';
import '../css/login.css';

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
  }

  onClickButton = () => {
    this.setState({ loading: true }, async () => {
      const { nameInput } = this.state;
      await createUser({ name: nameInput });
      this.setState({ loading: 'completed' });
    });
  }

  render() {
    const { nameInput, loading } = this.state;

    return (
      <div className="login-container" data-testid="page-login">
        { (loading === true) ? <Loadind /> : null }
        <h1 className="title-container">TrybeTunes</h1>
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
            disabled={ (nameInput.length < MINIMUM_SIZE) }
            onClick={ this.onClickButton }
          >
            Entrar
          </button>
        </div>
        { (loading === 'completed') ? <Redirect to="/search" /> : null }
      </div>
    );
  }
}

export default Login;
