import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios'

import Navbar from './components/navbar'
import SearchPage from './components/searchPage'
import AddNew from './components/addNew'
import './App.scss';

class App extends Component {
  state = {
    page:"search",
    currentMovie : {},
    titleSearchResults:[]
  }

  setSearchPage = () =>{
    this.setState({
      page:"search"
    })
  }
  setAddPage = () =>{
    this.setState({
      page:"add"
    })
  }

  searchForUpc = (ev) =>{
    ev.preventDefault();
    //console.log(ev.target.upcInput.value)
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

  searchForTitle = (ev) =>{
    ev.preventDefault();
    //console.log(ev.target.searchDb.value)
    let title = ev.target.searchDb.value
    let axConfig ={
      method:"post",
      url:"/searchDbByTitle",
      data:{
        "title":title
      },
      headers:{
        'content-type':'application/json'
      }
    }
    axios(axConfig)
    .then((res)=>{
      console.log(res.data)
      this.setState({
        titleSearchResults:res.data
      })
    })
    .catch((err) =>{
      console.log(err)
    })
  }

  addToCollection = (ev) =>{
    ev.preventDefault();
    let movieToAdd = {
      "title":this.state.currentMovie.title,
      "upc": this.state.currentMovie.upc,
      "disc":ev.target.disc.value,
      "imgUrl":this.state.currentMovie.imgUrl
    }
    //console.log(movieToAdd)
    let axConfig ={
      method:"post",
      url:"/addMovieManually",
      data:movieToAdd,
      headers:{
        'content-type':'application/json'
      }
    }
    axios(axConfig)
    .then((res)=>{
      console.log("Movie added to database")
      console.log(res.data)
    })
    .catch((err) =>{
      console.log(err)
    })
  }


  render() {
    return (
      <div className="App">
      <Router>
        <Navbar setSearchPage={this.setSearchPage}
                page={this.state.page}
                setAddPage={this.setAddPage}   />

        <Switch>
          <Route exact path="/" label="searchPage" render={(props) =>{
                              return <SearchPage {...props} titleSearchResults={this.state.titleSearchResults}
                                                            searchForTitle={this.searchForTitle} />
                            }} />

          <Route path="/addnew" label="addNew"  render={(props) =>{
                                          return <AddNew {...props} searchForUpc={this.searchForUpc}
                                                                    currentMovie={this.state.currentMovie}
                                                                    addToCollection={this.addToCollection} />
                                        }} />
        </Switch>
      </Router>
    </div>
    )
  }
}

export default App



//{
  // title:"Avengers Infinity War [blu-ray 4k] [2018] [region Free] Brand",
  // upc:"786936858112",
  // disc:"uhd",
  // imgUrl:"https://d29pz51ispcyrv.cloudfront.net/images/I/MWugu9byEoq35zVoY.MD256.JPEG"
//}