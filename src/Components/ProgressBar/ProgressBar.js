import React from 'react';
import './ProgressBar.css';
import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();


class ProgressBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      progressLevel: this.props.progressLevel
   }
  }

  timestamp(ms) {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }


  render() {
    //var progress = {this.state.progressLevel}
    const num = 50
    var temp =  num +'%';
    var style = { "width": temp };
    return (

      <div className='container' >

        <div className='progressbar'>
          <div id="fill" style={{'width': `${this.props.progressLevel}%`}}>
          </div>
        </div>
        <div className='timestamps'>
          <p id="currentTime"><span className="small">{this.timestamp(this.props.progress)}</span></p>
          <p id="duration"><span className="small">{this.timestamp(this.props.duration)}</span></p>
        </div>
      </div>

    );
  }
}

export default ProgressBar;
