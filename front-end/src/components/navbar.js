import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    let searchHighlight;
    let addHighlight;
    let manHighlight
    if(this.props.page === "search"){
      searchHighlight = "searchBarAndText buttonHighlight"
      addHighlight = "newBarAndText";
      manHighlight = "manualBarAndText";

    } else if (this.props.page === "add"){
      searchHighlight = "searchBarAndText"
      addHighlight = "newBarAndText buttonHighlight";
      manHighlight = "manualBarAndText";
    } else if (this.props.page === "manual"){
      searchHighlight = "searchBarAndText"
      addHighlight = "newBarAndText";
      manHighlight = "manualBarAndText buttonHighlight";
    }

    return (
      <div className="navBar">

        <div className={searchHighlight}>
          <Link to="/" onClick={this.props.setSearchPage}>
            <img src="searchIcon.png" alt="search icon" className="searchIcon" /> 
            <p>Search</p>
          </Link>
        </div>

        <div className={addHighlight}>
          <Link to="/addnew" onClick={this.props.setAddPage}>
            <img src="addNewIcon.png" alt="add new icon" className="newIcon" /> 
            <p>UPC Add</p>
          </Link>
        </div>

        <div className={manHighlight}>
          <Link to="/manual" onClick={this.props.setManualPage}>
            <img src="Forms-icon.png" alt="manual add new icon" className="manualIcon" /> 
            <p>Manual Add</p>
          </Link>
        </div>

      </div>
    )
  }
}

