import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';
import "../css/makeAlbum.css"
import Loadind from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class MakeAlbum extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      favoriteMusics: [],
    }
  }

  loadingFavorite = () => {
    const { loading } = this.state;
    this.setState({ loading: !loading })
    console.log("chegou em loadingFavorite");
  }

  componentDidMount = async () => {
    const { loading } = this.state;
    this.setState({ loading: true })

    const favoriteMusics = await getFavoriteSongs()
    this.setState({ favoriteMusics: favoriteMusics }, () => {
      this.setState({ loading: false })
    })
  }


  render() {
    const { data } = this.props;
    const { loading, favoriteMusics } = this.state;

    return (
      <div>
        <div style={ (loading) ? {display: 'none'} : {} }>
          <section className="img-artist-album-container">
            <img src={ data[0].artworkUrl100 } alt="Nome do album" />
            <span className="artist-album-container">
              <div data-testid="artist-name">
                { data[0].artistName}
              </div>
              <div data-testid="album-name">
                {data[0].collectionName }
              </div>
            </span>
          </section>
          <section>
            {
              data.map((dataMusic) => {
                if (dataMusic.previewUrl) {
                  return (
                    <MusicCard
                      key={ dataMusic.trackId }
                      dataMusic={ dataMusic }
                      loadingFavorite={ this.loadingFavorite }
                      hasCheck={ favoriteMusics.some((local) => local == dataMusic.trackId) }
                      favoriteMusics={ favoriteMusics }
                      trackId={ dataMusic.trackId }
                    />
                  );
                }
                return null;
              })
            }
          </section>
        </div>
          {(loading) ? <Loadind /> : null}
      </div>
    );
  }
}

MakeAlbum.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MakeAlbum;
