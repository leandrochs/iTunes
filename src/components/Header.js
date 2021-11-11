import React from 'react';
import { getUser } from '../services/userAPI';
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
  }

  render() {
    const { fromGetUser, loading } = this.state;
    const loadingTag = <Loadind />;
    const loadCompleted = <div>{ fromGetUser }</div>;

    return (
      <header data-testid="header-component">
        <div data-testid="header-user-name">
          { loading ? loadingTag : loadCompleted }
        </div>
      </header>
    );
  }
}

export default Header;
