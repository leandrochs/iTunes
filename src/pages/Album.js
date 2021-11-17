import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

import '../css/makeAlbum.css';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loadind from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong } from '../services/favoriteSongsAPI';


class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
      loadingII: false,
      localChecked: [],
      checkbox: [],
      check: false,
    };
  }

  musicsAPINow = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id: collectionId } = params;

    const musicAPIResponse = await getMusics(collectionId);

    this.setState({ data: musicAPIResponse }, () => {
      this.setState({ loading: false });
    });
  }

  ////
  loadingFavorite = (trackId) => {
    const { loadingII, checkbox } = this.state;
    this.setState({ loadingII: !loadingII });
    if (trackId) {
      this.setState({ checkbox: [...checkbox, trackId] });
    }
  }

  getFavoriteSongsNow = async () => {
    this.setState({ loadingII: true });

    const getLocalStorage = await getFavoriteSongs();
    this.setState({ localChecked: getLocalStorage }, () => {
      this.setState({ loadingII: false });
    });
  }

  onInputChange = async ({ target: { value, checked } }) => {
    this.loadingFavorite();
    const trackId = value;
    const { data } = this.state;
 
    const targetMusic = data.filter((d) => d.trackId == trackId)
    console.log("targetMusic:", ...targetMusic);

    if (!checked) {
      await removeSong(...targetMusic);
    } else {
      await addSong(...targetMusic);
    }

    this.setState({ check: checked }, () => {
      this.loadingFavorite(trackId);
      this.getFavoriteSongsNow();
    });
  }

  componentDidMount() {
    this.musicsAPINow();
    this.getFavoriteSongsNow();
  }
  
  render() {
    const { data, loading, loadingII, localChecked } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
           <div style={ (loadingII) ? { display: 'none' } : {} }>
          { (!loading) ? ( <section className="img-artist-album-container">
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
             ) : null
          }
             <section>
          { (!loading) ? ( 
              data.map(({ previewUrl, trackId, trackName }) => {
                if (previewUrl) {
                  return (
                    <MusicCard
                      key={ trackId }
                      previewUrl={ previewUrl }
                      loadingFavorite={ this.loadingFavorite }
                      onInputChange={ this.onInputChange }
                      hasCheck={
                        localChecked
                          .some((local) => local.trackId == trackId)
                      }
                      trackId={ trackId }
                      trackName={ trackName }
                    />
                  );
                }
                return null;
              } ) 
            ) : null
          } 
          </section>
        </div>
        {(loadingII) ? <Loadind /> : null }
      </div>
    );
  }
}

export default Album;
