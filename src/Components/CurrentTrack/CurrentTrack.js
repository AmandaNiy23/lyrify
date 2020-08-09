import React from 'react';
import './CurrentTrack.css';
import ProgressBar from '../ProgressBar/ProgressBar'
import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();


class CurrentTrack extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (

      <div className='player' >

        <div className='songInfo'>
          <img className="coverArt" src={this.props.image} alt={this.props.name} />

          <div className='songDetails'>
            <h4> {this.props.name}</h4>
            <h6> {this.props.artist}</h6>

          </div>
        </div>
        <div className="progress">
          <ProgressBar progress={this.props.progress} progressLevel={this.props.progressLevel} duration={this.props.duration}/>
        </div>
      </div>

    );
  }
}

export default CurrentTrack;
