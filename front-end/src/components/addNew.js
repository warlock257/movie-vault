import React, { Component } from 'react'
import SearchResult from './searchResult'
import BarcodeScanner from './barcodeScanner'

export default class addNew extends Component {



  render() {
    let searchResults;
    if(this.props.currentMovie.title){
      searchResults = <SearchResult currentMovie={this.props.currentMovie}
                                    addToCollection={this.props.addToCollection} />
    } 


    return (
      <div className="addNew">
        <h1>Add New Movie</h1>
        <form onSubmit={this.props.searchForUpc}>
            <input type="text" name="upcInput" placeholder="Enter UPC number" />
            <button type="submit" className="buttonSearch" >Search</button>
        </form>

        <BarcodeScanner />

        {searchResults}
      </div>
    )
  }
}
