import React from 'react';
import Header from '../components/Header';
import Loadind from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      // data: [],
      loading: false,
      localChecked: [],
    };
  }

  componentDidMount() {
    this.getFavoriteSongsNow();
  }

  getFavoriteSongsNow = async () => {
    this.setState({ loading: true });

    const getLocalStorage = await getFavoriteSongs();

    this.setState({ localChecked: getLocalStorage }, () => {
      this.setState({ loading: false });
    });
  }

  loadingFavorite = () => {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  }

  onInputChange = async ({ target: { value, checked } }) => {
    this.loadingFavorite();
    const trackId = value;
    const { localChecked } = this.state;

    const targetMusic = localChecked.filter((d) => d.trackId === parseInt(trackId, 10));

    if (targetMusic.length > 0) {
      if (!checked) {
        await removeSong(...targetMusic);
      } else {
        await addSong(...targetMusic);
      }
    }

    this.loadingFavorite(trackId);
    this.getFavoriteSongsNow();
  }

  render() {
    const { loading, localChecked } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        favorites page
        <section>

          { (!loading) ? (
            localChecked.map(({ previewUrl, trackId, trackName }) => {
              if (previewUrl) {
                return (
                  <MusicCard
                    key={ trackId }
                    previewUrl={ previewUrl }
                    onInputChange={ this.onInputChange }
                    hasCheck={
                      localChecked
                        .some((local) => local.trackId === trackId)
                    }
                    trackId={ trackId }
                    trackName={ trackName }
                  />
                );
              }
              return null;
            })
          ) : <Loadind />}
        </section>
      </div>

    );
  }
}

export default Favorites;
