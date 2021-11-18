import React from 'react';
import PropTypes from 'prop-types';
import '../css/musicCard.css';

class MusicCard extends React.Component {
  render() {
    const { previewUrl, trackName, trackId, hasCheck, onInputChange } = this.props;

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
              onChange={ onInputChange }
              checked={ hasCheck }
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
  onInputChange: PropTypes.func.isRequired,
};

export default MusicCard;

// {
//   trackId: 12,
//   trackName: 'Track Name 1',
//   previewUrl: 'preview-url-1',
//   kind: 'song',
// }
