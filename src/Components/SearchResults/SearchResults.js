import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
  //<TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false}/>

  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        {this.props.searchResults}
      </div>
    );
  }
}

export default SearchResults;
