import React from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Loadind from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../css/profileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      newName: '',
      newEmail: '',
      newImage: '',
      newDescription: '',
      loading: true,
      submitPress: false,
      isEmail: true,
    };
  }

  checkEmail = (newEmail) => {
    const textEmail = newEmail.split('@');
    const validation = textEmail.length === 2;
    this.setState({ isEmail: validation });
  };

  getUserNow = async () => {
    this.setState({ loading: true });
    const theUser = await getUser();
    const { name, email, image, description } = theUser;
    this.checkEmail(email);

    this.setState(
      {
        newName: name,
        newEmail: email,
        newImage: image,
        newDescription: description,
      },
      () => {
        this.setState({ loading: false });
      },
    );
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });

    if (name === 'newEmail') this.checkEmail(value);
  };

  inputImage = ({ target }) => { // Arquivo do computador
    const file = target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => { this.setState({ newImage: fileReader.result }) }
  };

  submitForm = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { newName, newEmail, newImage, newDescription } = this.state;
    const dataForSubmit = {
      name: newName,
      email: newEmail,
      description: newDescription,
      image: newImage,
    };

    await updateUser(dataForSubmit);
    this.setState({ submitPress: true });
  };

  componentDidMount = () => {
    this.getUserNow();
  };

  render() {
    const {
      newName,
      newEmail,
      newImage,
      newDescription,
      loading,
      isEmail,
      submitPress,
    } = this.state;

    return (
      <div data-testid="page-profile-edit" className="page-profile-edit">
        <Header />
        {loading ? (
          <Loadind />
        ) : (
          <section className="profile-container">
            {newImage ? (
              <img src={ newImage } alt="Profile" data-testid="profile-image" />
            ) : null}
            <p>Alterar Imagem</p>
            <br />
            <br />
            {/* <p>Endereço da internet</p>
            <input
              id="newImage"
              type="text"
              data-testid="edit-input-image"
              name="newImage"
              onChange={ this.handleChange }
              value={ newImage }
            /> */}
            <br />
            <br />

            <p>Arquivo do computador</p>
            <input id="input-image" type="file" onChange={ this.inputImage } />

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
              <button
                type="submit"
                data-testid="edit-button-save"
                disabled={ !newName || !isEmail || !newDescription }
                onClick={ this.submitForm }
              >
                Salvar
              </button>
            </form>
          </section>
        )}
        {submitPress ? <Redirect to="/profile" /> : null}
      </div>
    );
  }
}

export default ProfileEdit;
