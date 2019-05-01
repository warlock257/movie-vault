import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    let searchHighlight;
    let addHighlight;
    if(this.props.page === "search"){
      searchHighlight = "searchBarAndText buttonHighlight"
      addHighlight = "newBarAndText";
    } else if (this.props.page === "add"){
      searchHighlight = "searchBarAndText"
      addHighlight = "newBarAndText buttonHighlight";
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
            <p>Add New</p>
          </Link>
        </div>
      </div>
    )
  }
}

