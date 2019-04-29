import React from 'react'

export default function searchResult(props) {
    let moviePoster = "placeholder.jpg"
    if(props.currentMovie.imgUrl){
        moviePoster = props.currentMovie.imgUrl
    } else{
        moviePoster = "placeholder.jpg"
    }
    //console.log(props.currentMovie.imgUrl)

    let ownStatus = true
    let ownButton
    if (ownStatus === true){
      ownButton = <button className="buttonOwned">Owned</button>
    } else {
      ownButton = <button className="buttonNotOwned">Not Owned</button>
    }

    return (
        <div className="searchUPCResults">
            <h3>{props.currentMovie.title}</h3>
            <form onSubmit={props.addToCollection}>
                <div className="discRadios">
                    <div><input type="radio" name="disc" value="dvd" /> DVD</div>
                    <div><input type="radio" name="disc" value="bd" checked /> Blu-Ray</div>
                    <div><input type="radio" name="disc" value="uhd" /> UHD</div>
                </div>
                <button type="submit" className="buttonOwned" >Add to Collection</button>
            </form>

            <img src={moviePoster} alt="movie poster"
            onError={(e)=>{
                e.target.onerror = null; 
                e.target.src="placeholder.jpg"}
            } />
        </div>
    )
}

