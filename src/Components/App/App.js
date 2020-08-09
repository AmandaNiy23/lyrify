import React from 'react';
import './App.css';
import LogIn from '../LogIn/LogIn'
import User from '../User/User'
import Home from '../Home/Home'
import Lyrics from '../Lyrics/Lyrics'
import CurrentTrack from '../CurrentTrack/CurrentTrack'
import Spotify2 from '../../util/Spotify'
import Spotify from 'spotify-web-api-js';
import { AppProvider } from "@shopify/polaris";
const spotifyWebApi = new Spotify();


class App extends React.Component {

  constructor(props){
    super();
    const params = this.getHashParams()
    this.state = {
      accessToken: getUrlParams("access_token"),
      loggedIn: params.access_token ? true : false,
    }

    if(params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
    }

  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }


  render(){

    if(!this.state.loggedIn){
      return (
        <div className='wrap'>

          <div className="title">
            <h1>Lyri<span className="highlight">fy</span></h1>
          </div>

          <div className="App">

            <div className='login' >
              <LogIn />
            </div>

          </div>
        </div>
      )
    }else{
      return (
        <div className='wrap'>

          <div className="title">
            <h1>Lyri<span className="highlight">fy</span></h1>
          </div>

          <div className="App">

            <Home accessToken={this.state.accessToken}/>

          </div>
        </div>
      )
    }

  }
}


function getUrlParams(prop) {
  const params = {};
  const url = new URL(window.location.href);
  const definitions = url.hash.substring(1).split("&");

  definitions.forEach(function(val, key) {
    const parts = val.split("=", 2);
    params[parts[0]] = parts[1];
  });

  return prop && prop in params ? params[prop] : null;
}


export default App;
