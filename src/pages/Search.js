import React from 'react';
import Header from '../components/Header';
import Loadind from '../components/Loading';
import ShowAlbuns from '../components/ShowAlbuns';
import '../css/search.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MINIMUM_SIZE = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      showArtistName: '',
      loading: false,
      albuns: '',
    };
  }

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      artistName: value,
    });
  }

  onClickButton = () => {
    this.setState({
      loading: true,
    }, async () => {
      const { artistName } = this.state;
      const returnSearchAlbumsAPI = await searchAlbumsAPI(artistName);
      this.setState({ loading: 'completed' });
      this.setState({
        showArtistName: artistName,
        artistName: '',
        albuns: returnSearchAlbumsAPI,
      });
    });
  }

  render() {
    const { artistName, loading, albuns, showArtistName } = this.state;

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
            onClick={ this.onClickButton }
          >
            Pesquisar
          </button>
        </div>
        { (loading === true) ? <Loadind /> : null }
        { (loading === 'completed')
          ? <ShowAlbuns albuns={ albuns } showArtistName={ showArtistName } />
          : null }
      </div>
    );
  }
}

export default Search;
