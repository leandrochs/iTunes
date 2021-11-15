// import { object } from 'prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MakeAlbum from '../components/MakeAlbum';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.musicsAPINow();
  }

  musicsAPINow = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id: collectionId } = params;
    // const { id: collectionId } = this.props.match.params;
    const musicAPIResponse = await getMusics(collectionId);

    this.setState({ data: musicAPIResponse }, () => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { data, loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { (!loading) ? <MakeAlbum data={ data } /> : null }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.arrayOf(PropTypes.object).isRequired,
  // showArtistName: PropTypes.string.isRequired,
};

export default Album;
