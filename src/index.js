// Your code here
let URL = 'http://localhost:3000/films'


const listHolder = document.getElementById('films')
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementsByClassName('film item')[0].remove()
    fetchMovies(URL)
})