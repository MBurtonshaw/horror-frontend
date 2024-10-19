import React, { createContext, useState, useEffect } from 'react';
import Data from '../HOCs/data';
import Cookies from 'js-cookie';
const bcrypt = require('bcryptjs');

export const Context = createContext('');

export function Provider({ children }) {
  const [error, setError] = useState(null);
  //   const [message, setMessage] = useState(null);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [decades, setDecades] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const data = new Data(); // Initialize Data instance

  // Function to remove duplicate elements from an array
  const removeDuplicates = (arr) => {
    let unique = [];
    arr.forEach(element => {
      if (!unique.includes(element)) {
        unique.push(element);
      }
    });
    return unique;
  };

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  //   // Function to fetch and set the message
  //   const getMessage = async () => {
  //     try {
  //       let note = await data.getMessage();
  //       setMessage(note);
  //     } catch (error) {
  //       setError(error);
  //     }
  //   };

  // Function to fetch and set movies
  const getMovies = async () => {
    try {
      let response = await data.getMovies();
      setMovies(response);
    } catch (error) {
      setError(error);
    }
  };

  const getMovie = async (id) => {
    try {
      let response = await data.getMovie(id);
      setMovies(response);
      console.log('worked')
    } catch (error) {
      setError(error);
    }
  };

  const getUser = async (userId) => {
    try {
      let response = await data.getUser(userId);
      setCurrentUser(response);
    } catch (error) {
      setError(error);
    }
  };

  const getGenres = async () => {
    try {
      let response = await data.getGenres();
      setGenres(response);
    } catch (error) {
      setError(error);
    }
  };

  const getDecades = async () => {
    try {
      let response = await data.getDecades();
      setDecades(response);
    } catch (error) {
      setError(error);
    }
  };

  const getMoviesBySeason = async (season) => {
    console.log(season)
    try {
      let response = await data.getMoviesBySeason(season);
      setMovies(response);
    } catch (error) {
      setError(error);
    }
  }

  const getMoviesByGenre = async (genre) => {
    try {
      let response = await data.getMoviesByGenre(genre);
      setMovies(response);
    } catch (error) {
      setError(error);
    }
  }

  const getMoviesByDecade = async (decade) => {
    try {
      let response = await data.getMoviesByDecade(decade);
      setMovies(response);
    } catch (error) {
      setError(error);
    }
  }

  const registerUser = async (firstName, lastName, emailAddress, passphrase) => {
    //Set user credentials and save to a cookie
    let user = {
      first_name: firstName,
      last_name: lastName,
      email: emailAddress,
      password: passphrase
    }
    let response = await data.registerUser(user);
    setCurrentUser(response);
    if (currentUser !== undefined) {
      Cookies.set(`user: ${emailAddress}`, JSON.stringify(user), { expires: 10 });
    } else {
      return ('User does not exist');
    }
    //}
  }

  const signIn = async (emailAddress, passphrase) => {
    //insert logic here to dao.login and return a user
    //use user to fill in the logic below
    let user = { 'email': emailAddress, 'password': passphrase };
    let response = await data.loginUser(user);
    setCurrentUser(response);
    if (currentUser !== undefined) {
      Cookies.set('signedIn?', JSON.stringify(currentUser), { expires: 7 });
    }
    else {
      return ('User does not exist');
    }
  }

  const removeMovie = async (userId, movieId) => {
    try {
      // Remove the movie from the user's collection
      await data.removeMovieFromUser(userId, movieId);
      
      // Fetch the updated user data
      const updatedUser = await data.getUser(userId);
      
      // Update the currentUser state with the updated user data
      setCurrentUser(updatedUser);
      
      // Ensure that the updated user data includes the correct movie list
      if (updatedUser && updatedUser.user_movies) {
        setMovies(updatedUser.user_movies);
      } else {
        // Handle case where user_movies might not be in the updatedUser
        console.error('User data does not contain user_movies');
      }
    } catch (error) {
      // Log or handle the error appropriately
      console.error('Error removing movie:', error);
      setError(error);
    }
  };

  const addMovie = async (userId, movieId) => {
    try {
      // Remove the movie from the user's collection
      await data.addMovieToUser(userId, movieId);
      
      // Fetch the updated user data
      const updatedUser = await data.getUser(userId);
      
      // Update the currentUser state with the updated user data
      setCurrentUser(updatedUser);
      
      // Ensure that the updated user data includes the correct movie list
      if (updatedUser && updatedUser.user_movies) {
        setMovies(updatedUser.user_movies);
      } else {
        // Handle case where user_movies might not be in the updatedUser
        console.error('User data does not contain user_movies');
      }
    } catch (error) {
      // Log or handle the error appropriately
      console.error('Error removing movie:', error);
      setError(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      Cookies.set('signedIn?', JSON.stringify(currentUser), { expires: 7 });
    }
  }, [currentUser]);



  const signOut = async () => {
    Cookies.set('signedIn?', JSON.stringify(''), { expires: 7 });
    //}
  }

  useEffect(() => {
    // Check if a user is already signed in
    const encodedCookieUser = Cookies.get('signedIn?');
    if (encodedCookieUser) {
      try {
        // Decode URL-encoded string
        const decodedCookieUser = decodeURIComponent(encodedCookieUser);
        // Parse JSON
        const user = JSON.parse(decodedCookieUser);
        setCurrentUser(user);
      } catch (error) {
        console.error('Failed to parse user from cookies:', error);
      }
    }
  }, []);

  // Effect to fetch the message when the component mounts
  useEffect(() => {
    // getMessage();
    // getMovies();
  }, []);

  // Context value provided to children
  const value = {
    error,
    data: {
      //   message,
      movies,
      genres,
      decades,
      currentUser
    },
    actions: {
      removeDuplicates,
      capitalizeFirstLetter,
      //   getMessage,
      getMovies,
      getMovie,
      getGenres,
      getDecades,
      getMoviesBySeason,
      getMoviesByGenre,
      getMoviesByDecade,
      signIn,
      registerUser,
      signOut,
      removeMovie,
      getUser,
      addMovie
    }
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}