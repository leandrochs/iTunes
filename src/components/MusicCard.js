import React from 'react';
import PropTypes from 'prop-types';
import '../css/musicCard.css';

class MusicCard extends React.Component {
  render() {
    const { previewUrl, trackName, trackId, hasCheck, onInputChange } = this.props;

    return (
      <div className="musicCard-container">
        <div className="musiccard-trackname-audio-input-container">
          <p className="musiccard-section-p-trackname">{trackName}</p>
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
