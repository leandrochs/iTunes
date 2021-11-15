import React from 'react';
import '../css/musicCard.css'
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    }
  }
  
  onInputChange = async ({ target }) => {
    const { loadingFavorite } = this.props;
    const { trackId } = target;
    loadingFavorite();
    const addSongResult = await addSong(trackId)
    console.log(addSongResult);
    const { checked } = this.state;
    this.setState({ checked: !checked }, () => {
      loadingFavorite();
    })
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props.dataMusic;
    const { checked } = this.props;

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
              checked={ checked }
              // value={ checked }
            />
          </label>
        </section>
      </div>
    )
  }
}

export default MusicCard;
