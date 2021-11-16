import React from 'react';
import '../css/musicCard.css'
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      // loading: false,
      checked: null,
      // favoriteMusics: [],
    }    
  }
  
  onInputChange = async ({ target }) => {
    const { loadingFavorite } = this.props;
    const trackId = target.value;
    loadingFavorite();
    const addSongResult = await addSong(trackId)
    // console.log(addSongResult);
    const { checked } = this.state;
    // const { favoriteMusics } = this.state;
    this.setState({ checked: !checked }, () => {
      loadingFavorite(trackId);
    })
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props.dataMusic;
    const { checked } = this.state;
    const { hasCheck } = this.props;
    // console.log(hasCheck);
    const checkbox = (checked === null) ? hasCheck : checked;

    return(
      <div className="musicCard-container">
        <div>{ trackName }</div>
        <section className="audio-imput-container">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label htmlFor="imput-favorite-music">Favorita
            <input
              data-testid={`checkbox-music-${trackId}`}
              id="imput-favorite-music"
              type="checkbox"
              onChange={ this.onInputChange }
              checked={ checkbox }
              value={ trackId }
            />
          </label>
        </section>
      </div>
    )
  }
}

export default MusicCard;
