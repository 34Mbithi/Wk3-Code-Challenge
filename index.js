document.addEventListener('DOMContentLoaded', () => {
    const filmsUrl = 'http://localhost:3000/films'; // Replace with your JSON server URL

    // Function to fetch movie data from the server
    const fetchFilms = async () => {
        try {
            const response = await fetch(filmsUrl);
            const data = await response.json();
            return data.films; // Assuming films is the key containing movie data in the JSON
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to initialize the application
    const initApp = async () => {
        const films = await fetchFilms();
        if (films.length > 0) {
            displayMovieDetails(films[0]);
            populateMovieList(films);
            setupBuyTicketButton(films[0]);
        }
    };

    // Function to display movie details
    const displayMovieDetails = (movie) => {
        const movieInfoElement = document.getElementById('movie-info');
        const ticketsAvailable = movie.capacity - movie.tickets_sold;

        movieInfoElement.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" />
            <div>
                <h3>${movie.title}</h3>
                <p><strong>Runtime:</strong> ${movie.runtime} mins</p>
                <p><strong>Showtime:</strong> ${movie.showtime}</p>
                <p><strong>Tickets Available:</strong> ${ticketsAvailable}</p>
                <p>${movie.description}</p>
            </div>
        `;
    };

    // Function to populate the movie list
    const populateMovieList = (films) => {
        const filmsListElement = document.getElementById('films');

        films.forEach(film => {
            const li = document.createElement('li');
            li.textContent = film.title;
            li.classList.add('film', 'item');
            li.addEventListener('click', () => {
                displayMovieDetails(film);
                setupBuyTicketButton(film);
            });
            filmsListElement.appendChild(li);
        });
    };

    // Function to setup Buy Ticket button functionality
    const setupBuyTicketButton = (movie) => {
        const buyTicketButton = document.getElementById('buy-ticket');
        buyTicketButton.addEventListener('click', () => {
            if (movie.tickets_sold < movie.capacity) {
                movie.tickets_sold++;
                const ticketsAvailable = movie.capacity - movie.tickets_sold;
                displayMovieDetails(movie);
                if (ticketsAvailable === 0) {
                    buyTicketButton.disabled = true;
                    buyTicketButton.textContent = 'Sold Out';
                }
            } else {
                alert('Sorry, this showing is sold out!');
            }
        });
    };

    // Initialize the application
    initApp();
});
