import PropTypes from 'prop-types';
import React from 'react';
import getMusics from '../services/musicsAPI';

import '../css/makeAlbum.css';
import Loadind from '../components/Loading';
import MusicCard from '../components/MusicCard';
import {
  addSong,
  removeSong,
  getFavoriteSongs,
} from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
      localChecked: [],
      checkbox: [],
    };
  }

  componentDidMount() {
    this.musicsAPINow();
    this.getFavoriteSongsNow();
  }

  musicsAPINow = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id: collectionId } = params;

    const musicAPIResponse = await getMusics(collectionId);

    this.setState({ data: musicAPIResponse }, () => {
      this.setState({ loading: false });
    });
  };

  loadingFavorite = (trackId) => {
    const { loading, checkbox } = this.state;
    this.setState({ loading: !loading });
    if (trackId) {
      this.setState({ checkbox: [...checkbox, trackId] });
    }
  };

  getFavoriteSongsNow = async () => {
    this.setState({ loading: true });

    const getLocalStorage = await getFavoriteSongs();
    this.setState({ localChecked: getLocalStorage }, () => {
      this.setState({ loading: false });
    });
  };

  onInputChange = async ({ target: { value, checked } }) => {
    this.loadingFavorite();
    const { data } = this.state;

    const targetMusic = data.filter(
      ({ trackId }) => trackId === parseInt(value, 10),
    );

    if (!checked) {
      await removeSong(...targetMusic);
    } else {
      await addSong(...targetMusic);
    }

    this.loadingFavorite(value);
    this.getFavoriteSongsNow();
  };

  render() {
    const { data, loading, localChecked } = this.state;

    return (
      <div data-testid="page-album" className="album-container">
        <div>
          {!loading ? (
            <main>
              <section className="img-artist-album-container">
                <img src={ data[0].artworkUrl100 } alt="Nome do album" />
                <span className="artist-album-container">
                  <p data-testid="artist-name">{data[0].artistName}</p>
                  <p data-testid="album-name">{data[0].collectionName}</p>
                </span>
              </section>
              <section style={ { paddingBottom: '10%' } }>
                {data.map(({ previewUrl, trackId, trackName }) => {
                  if (previewUrl) {
                    return (
                      <MusicCard
                        key={ trackId }
                        previewUrl={ previewUrl }
                        loadingFavorite={ this.loadingFavorite }
                        onInputChange={ this.onInputChange }
                        hasCheck={ localChecked.some(
                          (local) => local.trackId === trackId,
                        ) }
                        trackId={ trackId }
                        trackName={ trackName }
                      />
                    );
                  }
                  return null;
                })}
              </section>
            </main>
          ) : null}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
};

export default Album;
