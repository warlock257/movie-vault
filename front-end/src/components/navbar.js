import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <div className="navBar">

        <div className="searchBarAndText">
          <Link to="/">
            <img src="searchIcon.png" alt="search icon" className="searchIcon" /> 
            <p>Search</p>
          </Link>
        </div>

        <div className="newBarAndText">
          <Link to="/addnew">
            <img src="addNewIcon.png" alt="add new icon" className="newIcon" /> 
            <p>Add New</p>
          </Link>
        </div>
      </div>
    )
  }
}

