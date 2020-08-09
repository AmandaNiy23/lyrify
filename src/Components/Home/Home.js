import React from 'react';
import './Home.css';
import Lyrics from '../Lyrics/Lyrics'
import User from '../User/User'
import CurrentTrack from '../CurrentTrack/CurrentTrack'
import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     nowPlaying: {},
     prevSong: ''
   }
  }

  componentDidMount(){
    spotifyWebApi.setAccessToken(this.props.accessToken)
    this.getNowPlaying()
  }


  /*
   * Get information about the user’s current playback state, including track name, artist name, album image, track progress, duration, and the spotify URI.
   * NOTE: The spotify web api glitches on occasion and returns null, this will be handled by simply reloading the webapp
   * Using a poller to constantly check the songs progress and weather the song has been changed
   * See [Get Information About The User’s Current Playback](https://developer.spotify.com/web-api/get-information-about-the-users-current-playback/) on
   * the Spotify Developer site for more information about the endpoint.
   */
  getNowPlaying(){
    const pollerTimeout = 1000;

    const fetchData = () => {
      spotifyWebApi.getMyCurrentPlaybackState()
        .then((response) => {
          if(response){
            try{
              this.setState({
                nowPlaying: {
                  name: response.item.name,
                  artist: response.item.artists[0].name,
                  image: response.item.album.images[0].url,
                  progress: response.progress_ms,
                  progressLevel: parseFloat(
            (100 * response.progress_ms) / response.item.duration_ms
          ).toFixed(2),
                  duration: response.item.duration_ms,
                  spotifyURI: response.item.uri
                }
              })
            } catch (e){
              console.log('Error')
              window.location = window.location.origin;
            }

          }
          //If the song has been changed we need to scrape for the new song lyrics
          if(this.state.prevSong !== this.state.nowPlaying.spotifyURI){
            this.setState({
              prevSong: this.state.nowPlaying.spotifyURI
            })
            this.setState({
                lyrics: ["...Lyrics Loading..."]
            })

            this.getLyrics()
          }
        })
    }

    fetchData();

    const poller = setInterval(fetchData.bind(this), pollerTimeout);

  }

  /*
   * fetch lyrics from the scraper
   */
  getLyrics(){
    fetch(`http://localhost:8888/scrape?songName=${this.state.nowPlaying.name}&artistName=${this.state.nowPlaying.artist}`, {mode: 'cors'})
    .then((response)=>response.json().then((data)=>
      this.setState({
          lyrics: data.lyrics
      })
    }))
  }

  render() {
    return (
      <div className="components">
        <div className="side">
          <div className="user">
            <User accessToken={this.props.accessToken} />
          </div>

          <div className="CurrentTrack">
            <div className="CurrentTrack">
              <CurrentTrack name={this.state.nowPlaying.name} artist={this.state.nowPlaying.artist} image={this.state.nowPlaying.image} progress={this.state.nowPlaying.progress} progressLevel={this.state.nowPlaying.progressLevel} duration={this.state.nowPlaying.duration} spotifyURI={this.state.nowPlaying.spotifyURI} />
            </div>
          </div>


        </div>

        <div className = "lyrics">
          <Lyrics name={this.state.nowPlaying.name} artist={this.state.nowPlaying.artist} lyrics={this.state.lyrics}/>
        </div>


      </div>
    );
  }
}

export default Home;
