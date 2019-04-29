import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios'

import Navbar from './components/navbar'
import SearchPage from './components/searchPage'
import AddNew from './components/addNew'
import './App.scss';

class App extends Component {
  state = {
    currentMovie : {}
  }

  searchForUpc = (ev) =>{
    ev.preventDefault();
    console.log(ev.target.upcInput.value)
    let upc = ev.target.upcInput.value
    let axConfig ={
      method:"post",
      url:"/getUpcInfo",
      data:{
        "upc":upc
      },
      headers:{
        'content-type':'application/json'
      }
    }
    axios(axConfig)
    .then((res)=>{
      console.log(res.data)
      this.setState({
        currentMovie:res.data
      })
    })
    .catch((err) =>{
      console.log(err)
    })
  }


  render() {
    return (
      <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/" label="searchPage" render={(props) =>{
                                          return <SearchPage {...props} />
                                        }} />

          <Route path="/addnew" label="addNew"  render={(props) =>{
                                          return <AddNew {...props} searchForUpc={this.searchForUpc}
                                                                    currentMovie={this.state.currentMovie} />
                                        }} />
        </Switch>
      </Router>
    </div>
    )
  }
}

export default App