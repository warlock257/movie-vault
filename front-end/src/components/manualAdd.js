import React, { Component } from 'react'
import axios from 'axios'

export default class manualAdd extends Component {
    state={
        manualPicUrl:""
    }

    ManualAddToCollection = (ev) =>{
        ev.preventDefault();
        let mockUpc = ev.target.movieTitle.value + "-" + Date.now()
        let movieToAdd = {
          "title":ev.target.movieTitle.value,
          "upc": mockUpc,
          "disc":ev.target.disc.value,
          "imgUrl":ev.target.imgUrl.value
        }
        console.log(movieToAdd)

        if(movieToAdd.title === ""){
            alert("Movie title is required")
        } else {
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
              alert("movie added")
            })
            .catch((err) =>{
              console.log(err)
            })
        }
      }

      previewPic = (ev) =>{
        ev.preventDefault();
        this.setState({
            manualPicUrl:ev.target.value
        })
      }
      addDefaultSrc(ev){
        ev.target.src = 'placeholder.jpg'
      }

  render() {
    return (
      <div className="manualAdd">
        <h1>Manually Add New Movie</h1>
        <form onSubmit={this.ManualAddToCollection}>
            <input type="text" placeholder="Movie Title" name="movieTitle"/>
            <div className="discRadios">
                <div><input type="radio" name="disc" value="dvd" /> DVD</div>
                <div><input type="radio" name="disc" value="bd" defaultChecked /> Blu-Ray</div>
                <div><input type="radio" name="disc" value="uhd" />UHD</div>
                <div><input type="radio" name="disc" value="digital" />Digital</div>
            </div>
            <input type="text" placeholder="Image Url" name="imgUrl" onChange={this.previewPic}/>
            <h3>Image Should show below, if valid</h3>
            <button type="submit" className="buttonOwned" >Add to Collection</button>
        </form>

        <div className="previewPic">
            <img src={this.state.manualPicUrl} onError={this.addDefaultSrc} alt="preview pic"/>
        </div>

      </div>
    )
  }
}
