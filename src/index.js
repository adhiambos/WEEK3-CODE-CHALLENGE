// URL for the films API
const URL = 'http://localhost:3000/films';

// Reference to the list holder in the DOM
const listHolder = document.getElementById('films');

// Function to fetch movies from the server and display them
function fetchMovies(URL) {
    fetch(URL)
        .then(resp => resp.json())
        .then(movies => {
            // Clear the list before adding new items
            while (listHolder.firstChild) {
                listHolder.removeChild(listHolder.firstChild);
            }
            movies.forEach(movie => {
                displayMovie(movie);
            });
            addClickEvent(); 
        });
}

// Function to display a single movie
function displayMovie(movie) {
    const list = document.createElement('li');
    list.style.cursor = "cell";
    list.textContent = movie.title;

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteMovie(movie.id)); // Assuming each movie has a unique id

    list.appendChild(deleteButton); // Append the delete button to the list item
    listHolder.appendChild(list);
}

// Function to handle the delete action
function deleteMovie(movieId) {
    // Send a DELETE request to the server
    fetch(`${URL}/${movieId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Remove the film from the list
        const listItems = listHolder.children;
        for (let i = 0; i < listItems.length; i++) {
            if (listItems[i].textContent.includes(movieId)) {
                listHolder.removeChild(listItems[i]);
                break;
            }
        }
        // Re-fetch the list to ensure it's up-to-date
        fetchMovies(URL);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

// Function to add click event to each film
function addClickEvent() {
    let children = listHolder.children;

    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        child.addEventListener('click', () => {
            fetch(`${URL}/${i + 1}`)
                .then(res => res.json())
                .then(movie => {
                    document.getElementById('buy-ticket').textContent = 'Buy Ticket';
                    setUpMovieDetails(movie);
                });
        });
    }
}

// Function to set up movie details
function setUpMovieDetails(funMovie) {
    const preview = document.getElementById('poster');
    preview.src = funMovie.poster;
    const movieTitle = document.querySelector('#title');
    movieTitle.textContent = funMovie.title;
    const movieTime = document.querySelector('#runtime');
    movieTime.textContent = `${funMovie.runtime} minutes`;
    const movieDescription = document.querySelector('#film-info');
    movieDescription.textContent = funMovie.description;
    const showTime = document.querySelector('#showtime');
    showTime.textContent = funMovie.showtime;
    const tickets = document.querySelector('#ticket-num'); // Corrected ID
    tickets.textContent = funMovie.capacity - funMovie.tickets_sold;
}

// Event listener for DOMContentLoaded to initialize the application
document.addEventListener('DOMContentLoaded', () => {
    fetchMovies(URL);

    const btn = document.getElementById('buy-ticket');
    btn.addEventListener('click', function (event) {
        let remainingTickets = document.querySelector('#ticket-num').textContent; // Corrected ID
        event.preventDefault();
        if (remainingTickets > 0) {
            document.querySelector('#ticket-num').textContent = remainingTickets - 1; // Corrected ID
        } else if (parseInt(remainingTickets, 10) === 0) {
            btn.textContent = 'Sold Out';
        }
    });
});
