import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Error from './Error';
import { Context } from '../contexts/context';

export default function List() {
    const { data, actions } = useContext(Context);
    const [filmList, setFilmList] = useState([]);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Function to retrieve and parse the cookie
    const getUserFromCookie = () => {
        const cookie = Cookies.get('signedIn?');
        if (cookie) {
            try {
                const userData = JSON.parse(decodeURIComponent(cookie));
                setUser(userData);
                setFilmList(userData.user_movies || []);
            } catch (e) {
                console.error('Error parsing user cookie:', e);
                setError('Error parsing user data');
            }
        } else {
            setUser(null);
        }
    };

    // Remove movie function
    const removeMovie = async (userId, movieId) => {
        if (!userId || !movieId) {
            setError('Invalid user ID or movie ID');
            return;
        }
        
     
            await actions.removeMovie(userId, movieId); // We assume it doesn't return a body but a status
    
            // Fetch the updated user data to reflect changes
            const updatedUser = await actions.getUser(userId);
            
            let newMovies = [];
            for (let i = 0; i < filmList.length; i++) {
                if (filmList[i].movie_id !== movieId) {
                    newMovies.push(filmList[i]);
                }
            }
            setFilmList(newMovies);
            Cookies.remove(`myList-${data.currentUser.email}-${movieId}`)
    }

    useEffect(() => {
        // Fetch user data from cookie and update state
        getUserFromCookie();
        setIsLoading(false); // Ensure loading state is updated after cookie check
    }, []);

    const mapper = () => {
        if (filmList.length === 0) {
            return <li>No films available</li>;
        } else {
            if (window.innerWidth < 768) {
                return (
                    filmList.map((item, i) =>
                        <li key={i} className='p-2' >
                            <div className='w-100 p-2'>
                            <a href={`/titles/${item.movie_id}`}>{item.title}</a>
                            </div>
                            <div className='w-100'>
                                <button onClick={() => removeMovie(data.currentUser.user_id, item.movie_id)}>remove</button>
                            </div>
                        </li>
                    )
                );
            }
            return filmList.map((item, i) => (
                <li key={i} className='p-2' >
                            <div className='w-100 row align-items-start'>
                                <div className='col mx-2'></div>
                                <div className='col'>
                        <a href={`/titles/${item.movie_id}`}>{item.title}</a>
                    </div>
                    <div className='col'>
                        <button onClick={() => removeMovie(data.currentUser.user_id, item.movie_id)}>Remove</button>
                    </div>
                    </div>
                </li>
            ));
        }
    };

    if (error) {
        return (
            <div className='py-5 my-5 mx-auto'>
                <Error message={error} />
            </div>
        );
    }

    if (isLoading) {
        return (
            <div id='List' className={`container ${window.innerWidth < 768 ? 'w-100' : 'w-50'} p-5 mt-5 background_box`}>
                <div>
                    <h1>Loading...</h1>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div id='List' className={`container ${window.innerWidth < 768 ? 'w-100' : 'w-50'} p-5 mt-5 background_box`}>
                <div className='animate'>
                    <h1>My List</h1>
                    <div className='py-5'>
                        <h2>Please login first</h2>
                        <div className='py-5'>
                            <a href='/login'>Login</a>
                        </div>
                        <div>
                            <a href='/'>Home</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (window.innerWidth < 768) {
        return (
            <div id='List' className='container w-100 p-5 mt-5 background_box_mini'>
                <div className='animate'>
                    <h1> My List </h1>
                    <ul className='p-0 pt-3'>
                        {mapper()}
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            <div id='List' className='container w-50 p-5 mt-5 background_box'>
                <div className='animate'>
                    <h1> My List </h1>
                    <ul className='p-0 pt-3'>
                        {mapper()}
                    </ul>
                </div>
            </div>
        );
    }
}