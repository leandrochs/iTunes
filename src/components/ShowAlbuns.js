import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../css/showAlbuns.css';

class ShowAlbuns extends React.Component {
  render() {
    const { albuns } = this.props;

    return albuns.length > 0 ? (
      <div className="showAlbun-card-container">
        {albuns.map(
          ({ artistName, collectionName, collectionId, artworkUrl100 }) => (
            <Link
              key={ collectionId }
              data-testid={ `link-to-album-${collectionId}` }
              to={ `/album/${collectionId}` }
            >
              <section className="showAlbuns-card">
                <div className='showalbuns-div-img-container'>
                  <img src={ artworkUrl100 } alt={ artistName } />
                </div>
                <div className='showalbuns-div-p-container'>
                  <p>{artistName}</p>
                  <p>{collectionName}</p>
                </div>
              </section>
            </Link>
          ),
        )}
      </div>
    ) : (
      <div>
        <div>Carregando...</div>
      </div>
    );
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

ShowAlbuns.propTypes = {
  albuns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// cards: PropTypes.arrayOf(PropTypes.object).isRequired,

export default ShowAlbuns;
