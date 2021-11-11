import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loadind from '../components/Loading';

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
      <div data-testid="page-login">
        { (loading === true) ? <Loadind /> : null }
        { (loading === 'completed') ? <Redirect to="/search" /> : null }
        <div>
          <input
            type="text"
            data-testid="login-name-input"
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
      </div>
    );
  }
}

export default Login;
