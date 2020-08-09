import React from 'react';
import './User.css';
import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: ""
    };
  }


  componentDidMount(){
    spotifyWebApi.setAccessToken(this.props.accessToken)
    this.getUserData()
  }

  getUserData() {
    spotifyWebApi.getMe()
      .then((response) => {
        if(response){
          this.setState({ userData: response });
        }
      })

  }

  render() {
    const userData = this.state.userData
    const userImage =
      userData && userData.images.length > 0
        ? userData.images[0].url
        : null;

    return (
      <div className='userCard' >

        <a href={this.state.userData.uri}>
          <img className="userImg" src={userImage} alt={this.state.userData.display_name} />
        </a>
        <div className='greeting'>
          <h4> Welcome to Lyrify</h4>
          <h6> {this.state.userData.display_name}</h6>
        </div>
      </div>
    );
  }
}

export default User;
