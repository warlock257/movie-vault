import React, { Component } from 'react'

export default class searchPage extends Component {

  render() {
    
    let titleResults = this.props.titleSearchResults.map((object, index) =>{
      let discImg = ""
      if(this.props.titleSearchResults[index].disc === 'dvd'){
        discImg = "DVD-Logo.png"
      } else if (this.props.titleSearchResults[index].disc === 'bd'){
        discImg = "Blu_ray_logo.png"
      } else if (this.props.titleSearchResults[index].disc === 'uhd'){
        discImg = "4k-logo.png"
      } else if (this.props.titleSearchResults[index].disc === 'digital'){
        discImg = "play_logo.png"
      }
      return(
        <>
        <div className="singleDBResult">
          <div className="singleDBResult__text">
            <h3>{this.props.titleSearchResults[index].title}</h3>
            <p>UPC: {this.props.titleSearchResults[index].upc}</p>
            <img src={discImg} alt="format logo"/>
          </div>

          <div className="singleDBResult__pic">
            <img src={this.props.titleSearchResults[index].imgUrl} alt="movie poster"/>
          </div>
          
      </div>
      <hr/>
      </>
      )
    })

    return (
      <div className="searchPage">

        <div className="searchArea">
          <h1>Search Movie Vault</h1>
          <form onSubmit={this.props.searchForTitle}>
            <input type="text" name="searchDb" placeholder="search by title" />
            <button type="submit">Search</button>
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
