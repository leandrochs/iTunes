import React from 'react';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        Album page
        <Header />
      </div>
    );
  }
}

export default Album;
