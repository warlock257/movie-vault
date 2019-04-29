import React, { Component } from 'react'
import SearchResult from './searchResult'

export default class addNew extends Component {



  render() {
    let searchResults;
    if(this.props.currentMovie.title){
      searchResults = <SearchResult currentMovie={this.props.currentMovie} />
    } 


    return (
      <div className="addNew">
        <h1>Add New Movie</h1>
        <h3>Search by UPC</h3>
        <form onSubmit={this.props.searchForUpc}>
            <input type="text" name="upcInput" />
            <button type="submit" className="buttonSearch">Search</button>
        </form>

        {searchResults}
      </div>
    )
  }
}
