import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../css/header.css';
import logoApple from '../images/apple_logo.png';
import Loadind from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      fromGetUser: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getUserNow();
  }

  getUserNow = () => {
    this.setState({ loading: true }, async () => {
      const { name } = await getUser();
      this.setState({
        fromGetUser: name,
        loading: false,
      });
    });
  };

  render() {
    const { fromGetUser, loading } = this.state;
    const loadingTag = <Loadind />;
    const loadCompleted = <div className="header-user-name">{fromGetUser}</div>;

    return (
      <header className="header-container" data-testid="header-component">
        <section className="up-sectio-container">
          <div className="header-logo-title-container">
            <img
              src={ logoApple }
              className="header-logo-img-apple"
              alt="Logo Apple"
            />
            <div className="header-title-container">
              <h1 className="header-title">iTunes</h1>
              <h1 className="header-title header-title-signature">
                by Leandro
              </h1>
            </div>
          </div>
          <div data-testid="header-user-name">
            {loading ? loadingTag : loadCompleted}
          </div>
        </section>
        <section className="down-sectio-container">
          <Link className="Link" to="/search" data-testid="link-to-search">
            <span className="header-link-span"> Pesquisa </span>
          </Link>
          <Link
            data-testid="link-to-favorites"
            className="Link"
            to="/favorites"
          >
            <span className="header-link-span"> Favoritos </span>
          </Link>
          <Link data-testid="link-to-profile" className="Link" to="/profile">
            <span className="header-link-span"> Profile </span>
          </Link>
        </section>
      </header>
    );
  }
}

export default Header;
