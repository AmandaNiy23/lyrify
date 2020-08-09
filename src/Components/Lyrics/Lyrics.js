import React from 'react';
import './Lyrics.css';
import { getLyrics } from 'genius-lyrics-api';
import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();



class Lyrics extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    if(this.props.lyrics){
      const lyricObj = this.props.lyrics
      return (

        <div className='lyric-container' >
          {this.props.lyrics.map((txt, index) => {
            if(txt===''){
              return <br/>
            }else{
              return <p className='lyric' key={'mykey' + index}>{txt}</p>
            }

          })}
        </div>

      );
    }else{
      return(
        <div className='lyric-container' >
          Lyrics Loading
        </div>
      )
    }

  }
}

export default Lyrics;
