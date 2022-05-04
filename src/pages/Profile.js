import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loadind from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../css/profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: false,
    };
  }

  getUserNow = async () => {
    this.setState({ loading: true });
    const theUser = await getUser();
    console.log(theUser);
    this.setState({ user: theUser }, () => {
      this.setState({ loading: false });
    });
  };

  componentDidMount = () => {
    this.getUserNow();
  };

  render() {
    const { loading } = this.state;
    const {
      user: { name, email, image, description },
    } = this.state;

    return (
      <div data-testid="page-profile" className="page-profile">
        <Header />
        {loading ? (
          <Loadind />
        ) : (
          <section className="profile-container">
            {image ? (
              <img src={ image } alt="Profile" data-testid="profile-image" />
            ) : null}
            <p>{name}</p>
            <p>{email}</p>
            <p>{description}</p>
            <Link to="/profile/edit" className="profile-edit-link">
              Editar perfil
            </Link>
          </section>
        )}
      </div>
    );
  }
}

export default Profile;
