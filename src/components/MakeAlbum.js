import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';
import '../css/makeAlbum.css';
import Loadind from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class MakeAlbum extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      allMusicsAlbum: [],
      checkbox: [],
    };
  }

  loadingFavorite = (trackId) => {
    const { loading, checkbox } = this.state;
    this.setState({ loading: !loading });
    if (trackId) {
      this.setState({ checkbox: [...checkbox, trackId] });
    }
  }

  getFavoriteSongsNow = async () => {
    // const { loading } = this.state;
    this.setState({ loading: true });

    const allMusics = await getFavoriteSongs();
    this.setState({ allMusicsAlbum: allMusics }, () => {
      this.setState({ loading: false });
    });
  }

  componentDidMount = () => {
    this.getFavoriteSongsNow();
  }

  render() {
    const { data } = this.props;
    const { loading, allMusicsAlbum } = this.state;

    return (
      <div>
        <div style={ (loading) ? { display: 'none' } : {} }>
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
              data.map(({ previewUrl, trackId, trackName }) => {
                if (previewUrl) {
                  return (
                    <MusicCard
                      key={ trackId }
                      loadingFavorite={ this.loadingFavorite }
                      hasCheck={ allMusicsAlbum.some((local) => local === trackId) }
                      trackId={ trackId }
                      trackName={ trackName }
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
