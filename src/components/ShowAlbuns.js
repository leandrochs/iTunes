import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../css/showAlbuns.css';

class ShowAlbuns extends React.Component {
  render() {
    const { albuns, showArtistName } = this.props;

    if (albuns.length > 0) {
      console.log(albuns);
      return (
        <div>
          <p>{`Resultado de álbuns de: ${showArtistName}`}</p>
          <div className="card-container">
            {
              albuns.map(({
                artistName,
                collectionName,
                collectionId,
                artworkUrl100,
              }) => (
                <Link
                  key={ collectionId }
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `/album/${collectionId}` }
                >
                  <section className="card">
                    <img src={ artworkUrl100 } alt={ artistName } />
                    <p>{ artistName }</p>
                    <p>{ collectionName }</p>
                  </section>
                </Link>
              ))
            }
          </div>
        </div>
      );
    } else {
      return (
        <>
          <p>{`Resultado de álbuns de: ${showArtistName}`}</p>
          <p>Nenhum álbum foi encontrado</p>
        </>
      );
    }
  }
}
  
// ShowAlbuns.propTypes = {
//   showArtistName: PropTypes.string.isRequired,
//   albuns: PropTypes.arrayOf(
//     PropTypes.shape({
//       artistId: PropTypes.number.isRequired,
//       artistName: PropTypes.string.isRequired,
//       collectionId: PropTypes.number,
//       artworkUrl100: PropTypes.number.isRequired,

//   })).isRequired,
// }


// ShowAlbuns.propTypes = {
//   albuns: PropTypes.arrayOf(
//     PropTypes.shape({
//       artistId: PropTypes.number.isRequired,
//       artistName: PropTypes.string.isRequired,
//       collectionId: PropTypes.number.isRequired,
//       artworkUrl100: PropTypes.number.isRequired,
//     }).isRequired
//   ).isRequired
// }

// ShowAlbuns.propTypes = {
//   albuns: PropTypes.arrayOf(
//     PropTypes.objectOf(
//       PropTypes.string.isRequired
//     ).isRequired
//   ).isRequired
// }

export default ShowAlbuns;
