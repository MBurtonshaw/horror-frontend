import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../contexts/context';
import Loading from '../components/Loading';

export default function Titles() {
    const { data, actions } = useContext(Context);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch movies data
    const fetchMovies = async () => {
        try {
            // Call the action to get movies
            await actions.getMovies(); // This will fetch and update the movies in the context

            // Access the updated movies from context
            setMovies(data.movies);
        } catch (err) {
            // Handle errors
            setError(err);
        } finally {
            // Set loading to false regardless of success or failure
            setLoading(false);
        }
    };

    useEffect(() => {
        if (movies.length < 1) {
            fetchMovies();
        }
    }, [actions]); // Dependencies to re-run the effect if actions or data.movies change

    if (loading) {
        return <Loading />; // Render a loading state
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Render error state
    }

    if (movies.length < 1) {
        return null;
    } else {

        for (let i = 0; i < movies.length; i++) {

            if (window.innerWidth < 768) {
                return (
                    <div id='TitlePage' className='container p-1 m-auto pb-2 my-5 w-100 background_box_mini'>
                        <h1 className='m-5'>
                            Titles
                        </h1>
                        <div className='container w-75'>
                            <ul className="list-group list-group-flush">
                                {
                                    movies.map((movie, i) => {
                                        if (movie.id < 7) {
                                            return (
                                                <li key={i} className='list-group-item pt-3 mb-3 animate'>
                                                    <a href={`/titles/${movie.movie_id}`}>
                                                        {movie.title}
                                                    </a>
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li key={i} className='list-group-item pt-3 mb-3'>
                                                    <a href={`/titles/${movie.movie_id}`}>
                                                        {movie.title}
                                                    </a>
                                                </li>
                                            );
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div id='TitlePage' className='container p-1 m-auto pb-2 my-5 w-50 background_box'>
                        <h1 className='m-5'>
                            Titles
                        </h1>
                        <div className='container w-75'>
                            <ul className="list-group list-group-flush">
                                {
                                    movies.map((movie, i) => {
                                        if (movie.movie_id < 12) {
                                            return (
                                                <li key={i} className='list-group-item pt-3 mb-3 animate'>
                                                    <a href={`/titles/${movie.movie_id}`}>
                                                        {movie.title}
                                                    </a>
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li key={i} className='list-group-item pt-3 mb-3'>
                                                    <a href={`/titles/${movie.movie_id}`}>
                                                        {movie.title}
                                                    </a>
                                                </li>
                                            );
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                );
            }
        }
    }
}