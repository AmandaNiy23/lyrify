import React from 'react';
import './LogIn.css';

class LogIn extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='LogIn'>
        <a className="LogInButton" href="http://localhost:8888/login">Log in with Spotify!</a>
      </div>
    );
  }
}

export default LogIn;
