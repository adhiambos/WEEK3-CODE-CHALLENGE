// Your code here
let URL = 'http://localhost:3000/films'


const listHolder = document.getElementById('films')
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementsByClassName('film item')[0].remove()
    fetchMovies(URL)
})

//Create fetch function to get the data from the db.json
function fetchMovies(URL){
    fetch(URL)
    .then(resp => resp.json())
    .then(movies => {
        movies.forEach(movie => {
            displayMovie(movie)
        });
    })
}
//function to display the titles of the movies as a list
function displayMovie(movie){
   
    const list = document.createElement('li')
    list.style.cursor="cell"
    list.textContent= (movie.title)
    listHolder.appendChild(list)
    addClickEvent()
}