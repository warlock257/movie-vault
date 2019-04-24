import React, { Component } from 'react'
import SearchResult from './searchResult'

export default class addNew extends Component {
  render() {
    return (
      <div className="addNew">
        <h1>Add New Page</h1>
        <h3>Search by UPC</h3>
        <form onSubmit={this.props.searchForUpc}>
            <input type="text" name="upcInput" />
            <button type="submit">Search</button>
        </form>

        <SearchResult currentMovie={this.props.currentMovie} />
      </div>
    )
  }
}
