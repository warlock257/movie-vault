import React, { Component } from 'react'

export default class searchPage extends Component {




  render() {

    let titleResults = this.props.titleSearchResults.map((object, index) =>{
      return(
        <div className="singleDBResult">
          <h3>{this.props.titleSearchResults[index].title}</h3>
          <p>UPC: {this.props.titleSearchResults[index].upc}</p>
          <p>Format: {this.props.titleSearchResults[index].disc}</p>
          <img src={this.props.titleSearchResults[index].imgUrl} alt="movie poster"/>
          <hr/>
      </div>
      )
    })

    return (
      <div className="searchPage">

        <div className="searchArea">
          <h1>Search Movie Vault</h1>
          <form onSubmit={this.props.searchForTitle}>
            <input type="text" name="searchDb" />
            <button>Search</button>
          </form>
        </div>

        <hr/>

        <div className="dbResults">
          {titleResults}
        </div>

        </div>
    )
  }
}
