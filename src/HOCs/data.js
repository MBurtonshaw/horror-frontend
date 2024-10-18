import config from '../config';

export default class Data {
  // Method to make API calls
  async api(path, method = 'GET', body = null) {
    const url = `${config.apiBaseUrl}${path}`;
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      
      if (response.ok) { // Check if the response status is in the range 200-299
        if (response.status === 204) {
          return; // No content response, return nothing
        }
        return response.json(); // Return parsed JSON data
      } else {
        // Handle non-200 responses
        const errorData = await response.json().catch(() => ({})); // Handle JSON parsing error
        throw new Error(`Error ${response.status}: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('API call failed:', error); // Log error to console or handle it appropriately
      throw error; // Re-throw the error for further handling
    }
  }

  // Function to GET and return the message posted at '/'
  async getMessage() {
    return this.api('/');
  }

  // Function to GET and return movies from '/api/movies'
  async getMovies() {
    return this.api('/api/movies');
  }

  async getMovie(id) {
    return this.api(`/api/movies/${id}`);
  }

  async getGenres() {
    return this.api('/api/movies/genres');
  }

  async getDecades() {
    return this.api('/api/movies/decades');
  }

  async getMoviesBySeason(season) {
    return this.api(`/api/movies/seasons/${season}`);
  }

  async getMoviesByGenre(genre) {
    return this.api(`/api/movies/genres/${genre}`);
  }

  async getMoviesByDecade(decade) {
    return this.api(`/api/movies/decades/${decade}`);
  }

  async loginUser(user) {
    return this.api(`/api/users/login`, 'POST', user);
  }

  async registerUser(user) {
    return this.api(`/api/users/new`, 'POST', user);
  }

  async removeMovieFromUser(userId, movieId) {
    return this.api(`/api/users/${userId}/removeMovie`, 'DELETE', movieId);
  }

  async addMovieToUser(userId, movieId) {
    return this.api(`/api/users/${userId}/addMovie`, 'POST', movieId);
  }

  async getUser(userId) {
    return this.api(`/api/users/${userId}`, 'GET');
  }
}