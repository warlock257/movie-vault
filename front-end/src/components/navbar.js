import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <div className="navBar">
        <Link to="/">Search</Link>
        <Link to="/addnew">Add New</Link>
      </div>
    )
  }
}

