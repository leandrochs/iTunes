import React from 'react';
import Header from '../components/Header';
import "../css/search.css"
const MINIMUM_SIZE = 2;

class Search extends React.Component {

  constructor() {
    super();
    this.state = {
      artistName: '',
      // loading: false,
    };
  }

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      artistName: value,
    });
  }

  // onClickButton = () => {
  //   this.setState({ loading: true }, async () => {
  //     const { artistName } = this.state;
  //     await createUser({ name: artistName });
  //     this.setState({ loading: 'completed' });
  //   });
  // }

  render() {

    const { artistName } = this.state;

    return (
      <div className="searchPage-container" data-testid="page-search">
        <Header />
        <div className="searchInput-container">
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Banda ou artista"
            onChange={ this.onInputChange }
            value={ artistName }
          />
          <button 
            data-testid="search-artist-button"
            type="submit"
            disabled={ (artistName.length < MINIMUM_SIZE) }
            // onClick={ this.onClickButton }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
