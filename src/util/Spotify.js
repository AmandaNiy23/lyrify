let clientId = 'e4aa4d6dcb33451281d2a6f0f0abb609';
let redirect_uri = 'http://localhost:3000/';


let accessToken;
let SavedAccessToken;

const Spotify = {

  getAccessToken(){
    console.log('Access Token1: ' + accessToken)
    if(accessToken){
      console.log('we in here!!')
      return accessToken;
    }
    const newAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const newExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    console.log('newAccessToken: ' + newAccessToken)
    console.log('newExpiresIn: ' + newExpiresIn)
    if(newAccessToken && newExpiresIn){
      accessToken = newAccessToken[1];
      console.log("accessToken : " + accessToken)
      const expiresIn = Number(newExpiresIn[1]);
      console.log("OPTION1")
      //clear the access token after the expiry time has elapsed
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      console.log("OPTION2")
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&show_dialog=true&redirect_uri=${redirect_uri}&
scope=user-read-private%20user-read-currently-playing`;
      window.location = accessUrl;
    }

  },

  logIn(){
    if(!SavedAccessToken){
      SavedAccessToken = Spotify.getAccessToken();
    }
//     const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&show_dialog=true&redirect_uri=${redirect_uri}&
// scope=user-read-private%20user-read-currently-playing`;
//     window.location = accessUrl;


  },

  getCurrentlyPlaying(){
    accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };


    return fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {headers: headers}).then(response => {

      if(response.ok){
        console.log(response)
        return response.json();
      }
      throw new Error('request failed!');
    }, networkError =>{
      console.log(networkError.message);
    }).then(jsonResponse => {
      console.log(jsonResponse)
      return(jsonResponse)
    });
  },

  search(term){

    console.log('searching!!!!!!!!!!')
    accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: headers}).then(response => {
      if (response.ok) {
        console.log("WHAT ARE THE RESULTS?")
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => {
      console.log(networkError.message);
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({id: track.id, name: track.name, artist: track.artists[0].name, album: track.album.name, uri: track.uri}));
    });
  },

  savePlaylist(playlistName, trackURIs) {
    if (playlistName && trackURIs.length) {
      const accessToken = Spotify.getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`
      };
      let userID;
      let playlistID;
      return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => {
        console.log(networkError.message);
      }).then(jsonResponse => {
        userID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({name: playlistName})
        }).then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Request failed!');
        }, networkError => {
          console.log(networkError.message);
        }).then(jsonResponse => {
          playlistID = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({uris: trackURIs})
          }).then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Request failed!');
          }, networkError => {
            console.log(networkError.message);
          }).then(jsonResponse => jsonResponse);
        });
      });

    } else {
      return;
    }
  }
}



export default Spotify;
