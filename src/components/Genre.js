import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../contexts/context';
import Loading from '../components/Loading';

export default function Genre() {
    const { data, actions } = useContext(Context);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { genre } = useParams();

    // Fetch movies data
    const fetchMovies = async () => {
        let newGenre = actions.capitalizeFirstLetter(genre);
        try {
            // Call the action to get movies
            await actions.getMoviesByGenre(newGenre); // This will fetch and update the movies in the context

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

    let fill_array = [];

    //function to loop thru state & map films corresponding to the decade
    function fill_in() {
        for (let f = 0; f < movies.length; f++) {
            fill_array.push(movies[f]);
        }
        //
        return (
            fill_array.map((film, i) => {
                if (i > 12) {
                    return (
                        <li className='list-group-item pt-3 mb-3' key={i}><a href={`/titles/${film.movie_id}`}>{film.title}</a></li>
                    );
                }
                return (
                    <li className='list-group-item pt-3 mb-3 animate' key={i}><a href={`/titles/${film.movie_id}`}>{film.title}</a></li>
                );
            })
        );
    }

    if (window.innerWidth < 768) {
        return (
            <div id='Genre' className='container p-1 m-auto my-5 pb-2 background_box_mini'>
                <h1 className='my-4 mx-1'>
                    Genre: {genre}
                </h1>
                <div className='container p-1 pb-4 mb-4 w-75'>
                    <ul className="list-group list-group-flush">
                        {fill_in()}
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div id='Genre' className='container p-1 m-auto mt-5 w-50 background_box'>
            <h1 className='m-5'>
                Genre: {genre}
            </h1>
            <div className='container pb-4 mb-4 w-75'>
                <ul className="list-group list-group-flush">
                    {fill_in()}
                </ul>
            </div>
        </div>
    );
}