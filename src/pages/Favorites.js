import React from 'react';
import Header from '../components/Header';
import Loadind from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
      localChecked: [],
    };
  }

  getFavoriteSongsNow = async () => {
    this.setState({ loading: true });

    const getLocalStorage = await getFavoriteSongs();
    console.log(getLocalStorage);

    this.setState({ localChecked: getLocalStorage }, () => {
      this.setState({ loading: false });
    });
  }



  loadingFavorite = (trackId) => {
    const { loading, checkbox } = this.state;
    this.setState({ loading: !loading });
    // if (trackId) {
    //   this.setState({ checkbox: [...checkbox, trackId] });
    // }
  }



  onInputChange = async ({ target: { value, checked } }) => {
    this.loadingFavorite();
    const trackId = value;
    const { localChecked } = this.state;
 
    const targetMusic = localChecked.filter((d) => d.trackId == trackId)
    // console.log("targetMusic:", ...targetMusic);

    if (targetMusic.length > 0) {
      // console.log("Favorites", targetMusic);
      
      if (!checked) {
        await removeSong(...targetMusic);
      } else {
        await addSong(...targetMusic);
      }
      
    }




    this.setState({ check: checked }, () => {
      this.loadingFavorite(trackId);
      this.getFavoriteSongsNow();
    });
  }





  componentDidMount() {
    this.getFavoriteSongsNow();
  }

  render() {
    const { data, loading, localChecked } = this.state;

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
                      // loadingFavorite={ this.loadingFavorite }
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
            ) : <Loadind />
          } 
          </section>
      </div>

    );
  }
}

export default Favorites;
