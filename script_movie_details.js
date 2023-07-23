// Get the URL parameters to retrieve the movie ID (imdbID) from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');

// Elements for displaying movie details
const movieImage = document.querySelector('.movie-image img');
const movieTitle = document.querySelector('.movie-title');
const movieYear = document.querySelector('.movie-year');
const movieGenre = document.querySelector('.movie-genre');
const moviePlot = document.querySelector('.movie-plot');

// Elements for the rating and comment form
const ratingForm = document.getElementById('rating-form');
const ratingInput = document.getElementById('rating');
const commentInput = document.getElementById('comment');

// Function to fetch movie details based on the imdbID
async function fetchMovieDetails(imdbID) {
    const API_KEY = '624c3f71';
    const URL = `https://omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`;
    try {
        const response = await fetch(URL);
        const movieDetailsData = await response.json();
        displayMovieDetails(movieDetailsData);
    } catch (error) {
        console.error(error);
    }
}

// Function to display movie details
function displayMovieDetails(details) {
    movieImage.src = details.Poster !== 'N/A' ? details.Poster : 'image_not_found.png';
    movieTitle.textContent = details.Title;
    movieYear.textContent = `Year: ${details.Year}`;
    movieGenre.textContent = `Genre: ${details.Genre}`;
    moviePlot.textContent = `Plot: ${details.Plot}`;
}

// Event listener for form submission
ratingForm.addEventListener('submit', handleFormSubmission);

// Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault();

    const rating = ratingInput.value;
    const comment = commentInput.value;

    // Store the rating and comment data in local storage
    const movieData = {
        imdbID,
        rating,
        comment,
    };

    // Retrieve existing movie data from local storage, if any
    const existingData = JSON.parse(localStorage.getItem('movieData')) || [];

    // Check if the movie data already exists in the local storage
    const movieIndex = existingData.findIndex((data) => data.imdbID === imdbID);

    if (movieIndex !== -1) {
        // If the movie data exists, update the rating and comment
        existingData[movieIndex].rating = rating;
        existingData[movieIndex].comment = comment;
    } else {
        // If the movie data does not exist, add it to the existing data
        existingData.push(movieData);
    }

    // Store the updated data back to local storage
    localStorage.setItem('movieData', JSON.stringify(existingData));

    // Show a confirmation message or perform any other action as needed
    alert('Rating and comment have been submitted successfully!');
}

// Fetch and display movie details when the page loads
fetchMovieDetails(imdbID);
