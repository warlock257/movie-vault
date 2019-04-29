import React, { Component } from 'react'

export default class searchPage extends Component {
  render() {
    let ownStatus = true
    let ownButton

    if (ownStatus === true){
      ownButton = <button className="buttonOwned">Owned</button>
    } else {
      ownButton = <button className="buttonNotOwned">Not Owned</button>
    }

    return (
      <div className="searchPage">

        <div className="searchArea">
          <h1>Search Movie Vault</h1>
          <form>
            <input type="text" name="searchDb" />
            <button>Search</button>
          </form>
        </div>

        <hr/>

        <div className="searchResults">

          <div className="singleResult">
            <h3>Black Panther 4K Ultra [Blu-ray]</h3>
            <p>UPC: 786936856316</p>
            <img src="https://d29pz51ispcyrv.cloudfront.net/images/I/J3u8uowQRzyQ7O6x1.MD256.JPEG" alt="movie poster"/>
            {ownButton}
            <hr/>
          </div>

        </div>
      </div>
    )
  }
}
