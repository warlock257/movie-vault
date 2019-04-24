import React from 'react'

export default function searchResult(props) {
    let moviePoster = "placeholder.jpg"


    console.log(props.currentMovie.imgUrl)
    return (
        <div>
            <h3>{props.currentMovie.title}</h3>
            <img src={moviePoster} alt="movie poster"/>      
        </div>
    )
 
}
