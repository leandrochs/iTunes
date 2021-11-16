import React from 'react';
import PropTypes from 'prop-types';
import '../css/musicCard.css';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      check: null,
    };
  }

  onInputChange = async ({ target: { value, checked } }) => {
    const { loadingFavorite } = this.props;
    const trackId = value;
    loadingFavorite();

    // (!checked) ? await removeSong(value) : await addSong(value);
    if (!checked) {
      await removeSong(value);
    } else {
      await addSong(value);
    }
    console.log(checked);
    console.log(value);
    this.setState({ check: checked }, () => {
      loadingFavorite(trackId);
    });
  }

  render() {
    const { previewUrl, trackName, trackId, hasCheck } = this.props;
    const { check } = this.state;
    const checkbox = (check === null) ? hasCheck : check;
    // console.log(typeof previewUrl);

    return (
      <div className="musicCard-container">
        <div>{ trackName }</div>
        <section className="audio-imput-container">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label htmlFor="imput-favorite-music">
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              id="imput-favorite-music"
              type="checkbox"
              onChange={ this.onInputChange }
              checked={ checkbox }
              value={ trackId }
            />
          </label>
        </section>
      </div>
    );
  }
}

MusicCard.propTypes = {
  hasCheck: PropTypes.bool.isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  loadingFavorite: PropTypes.func.isRequired,
};

export default MusicCard;
