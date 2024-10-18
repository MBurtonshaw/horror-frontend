import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../contexts/context';
import Loading from '../components/Loading';

// Function to get the width class based on the window size
const getWidthClass = (width) => {
    if (width < 768) return 'w-100 p-3 m-auto';
    if (width < 992) return 'w-75 p-3 m-auto';
    return 'w-25';
};

export default function Genres() {
    const { data, actions } = useContext(Context);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Fetch genres data
    const fetchGenres = async () => {
        if (genres.length < 1) {
            try {
                await actions.getGenres();
                // Assuming data.genres is an array of objects with a genre_name property
                setGenres(data.genres || []);
            } catch (err) {
                setError(err.message || 'Failed to fetch genres.');
            } finally {
                setLoading(false);
            }
        }

    };

    // Handle window resize event
    useEffect(() => {
        fetchGenres();

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [actions]);

    // Render loading or error states
    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Function to generate card content
    const renderCard = (genre, i) => {
        const genreName = genre.genre_name; // Access the genre name

        return (
            <div key={i} className={getWidthClass(windowWidth)}>
                <div className="card animate">
                    <a href={`/genres/${genreName}`}>
                        <img
                            src={`../../photos/genres/${genreName}.jpg`}
                            className="card-img-top"
                            alt={genreName}
                            onError={(e) => e.target.src = '../../photos/genres/placeholder.jpg'} // Handle missing images
                        />
                        <div className="card-body">
                            <h5 className="card-title">{genreName}</h5>
                        </div>
                    </a>
                </div>
            </div>
        );
    };

    return (
        <div id='GenrePage' className='container'>
            <h1 className='my-5 pt-5'> Genres </h1>
            <div className="card-group">
                {genres.map((genre, i) => renderCard(genre, i))}
            </div>
        </div>
    );
}