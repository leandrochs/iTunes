import React from 'react';
import PropTypes from 'prop-types';

class MakeAlbum extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        <img src={ data[0].artworkUrl100 } alt="Nome do album" />
        <div data-testid="artist-name">
          { data[0].artistName}
        </div>
        <div data-testid="album-name">
          {data[0].collectionName }
        </div>
        {
          data.map(({ previewUrl, trackName }) => {
            if (previewUrl) {
              return (
                <>
                  <div>{ trackName }</div>
                  <audio data-testid="audio-component" src={ previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    <code>audio</code>
                  </audio>
                </>
              );
            }
            return null;
          })
        }
      </div>
    );
  }
}

MakeAlbum.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  // showArtistName: PropTypes.string.isRequired,
};

export default MakeAlbum;
