import React from 'react';
import Header from '../components/Header';
import Loadind from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../css/profileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      // user: {},
      newName: '',
      newEmail: '',
      newImage: '',
      newDescription: '',
      loading: true,
    };
  }

  getUserNow = async () => {
    this.setState({ loading: true });
    const theUser = await getUser();
    const { name, email, image, description } = theUser;
    this.setState({
      // user: theUser,
      newName: name,
      newEmail: email,
      newImage: image,
      newDescription: description,
    }, () => {
      this.setState({ loading: false });
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  componentDidMount = () => {
    this.getUserNow();
  }

  render() {
    const { newName, newEmail, newImage, newDescription, loading } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { (loading) ? <Loadind /> : (
          <section className="profile-container">
            <img
              src={ newImage }
              alt="Profile"
              data-testid="profile-image"
            />
            <form className="profile-container">
              <label htmlFor="newName">
                Nome
                <input
                  data-testid="edit-input-name"
                  type="text"
                  name="newName"
                  id="newName"
                  value={ newName }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="newEmail">
                Email
                <input
                  data-testid="edit-input-email"
                  type="text"
                  name="newEmail"
                  id="newEmail"
                  value={ newEmail }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="newDescription">
                Descrição
                <textarea
                  data-testid="edit-input-description"
                  type="text"
                  name="newDescription"
                  id="newDescription"
                  value={ newDescription }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="input-image">
                Alterar Imagem
                <input id="input-image" type="file" data-testid="edit-input-image" />
              </label>
              <button type="submit" data-testid="edit-button-save">Salvar</button>
            </form>
          </section>
        ) }
      </div>
    );
  }
}

export default ProfileEdit;
