import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {


  getUserNow = async () => {
    const user = await getUser();
    console.log(user);
  }

  componentDidMount = () => {
    this.getUserNow();
  }
  

  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        profile page
      </div>
    );
  }
}

export default Profile;
