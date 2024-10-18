import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../contexts/context';
import Loading from '../components/Loading';

export default function Home() {
    const { data, actions } = useContext(Context);
    const [movies, setMovies] = useState([]);
    const [season, setSeason] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let first = { movie_id: null, movie_url: '', movie_title: '', memo: '' };
    let second = { movie_id: null, movie_url: '', movie_title: '', memo: '' };
    let third = { movie_id: null, movie_url: '', movie_title: '', memo: '' };
    let fourth = { movie_id: null, movie_url: '', movie_title: '', memo: '' };
    let fifth = { movie_id: null, movie_url: '', movie_title: '', memo: '' };
    let sixth = { movie_id: null, movie_url: '', movie_title: '', memo: '' };

    useEffect(() => {
        const setter = new Date();
        const month = setter.getMonth() + 1;

        // Determine the current season
        if (month >= 9 && month <= 11) {
            setSeason('Fall');
        } else if (month >= 12 || month <= 2) {
            setSeason('Winter');
        } else if (month >= 3 && month <= 5) {
            setSeason('Spring');
        } else {
            setSeason('Summer');
        }
    }, []);

    // Fetch movies data
    const fetchMovies = async () => {
        if (season) {
        try {
            // Call the action to get movies
            await actions.getMoviesBySeason(season); // This will fetch and update the movies in the context
            // Access the updated movies from context
            setMovies(data.movies);
        } catch (err) {
            // Handle errors
            setError(err);
        } finally {
            // Set loading to false regardless of success or failure
            setLoading(false);
        }
    }
    };

    useEffect(() => {
        if (movies.length < 1) {
            fetchMovies();
        }
    }, [actions, data.movies]); // Dependencies to re-run the effect if actions or data.movies change

    if (loading) {
        return <Loading />; // Render a loading state
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Render error state
    }

    if (movies && movies.length > 0) {
        if (season === 'Fall') {
            movies.map((movie, i) => {
                if (movie.movie_id === 25) {
                    first = movie;
                    first.memo = 'An escaped mental patient stalks high school girls on Halloween night.';
                }
                if (movie.movie_id === 3) {
                    second = movie;
                    second.memo = 'Two sisters suddenly have to learn to deal with some physical changes.';
                }
                if (movie.movie_id === 11) {
                    third = movie;
                    third.memo = 'A scientist devotes his studies to raising the dead, regardless of consequences.';
                }
                if (movie.movie_id === 2) {
                    fourth = movie;
                    fourth.memo = 'A woman is cursed to be followed by an entity until her death.';
                }
                if (movie.movie_id === 14) {
                    fifth = movie;
                    fifth.memo = 'In Colonial America, a baby is stolen from an outcast family and taken to the woods.';
                }
                if (movie.movie_id === 28) {
                    sixth = movie;
                    sixth.memo = 'Herbert West has concocted a formula to bring the recently dead back to life.';
                }
            });
        }
        if (season === 'Winter') {
            movies.map((movie, i) => {
                if (movie.movie_id === 12) {
                    first = movie;
                    first.memo = 'It\'s Christmas, and people are celebrating; but a sorority house is receiving disturbing phone calls.';
                }
                if (movie.movie_id === 10) {
                    second = movie;
                    second.memo = 'Following the Mexican-American War, a military regiment takes in a stranger on a snowy night.';
                }
                if (movie.movie_id === 30) {
                    third = movie;
                    third.memo = 'A father buys his son a rare pet as a Christmas present from a mysterious shop in Chinatown.';
                }
                if (movie.movie_id === 26) {
                    fourth = movie;
                    fourth.memo = 'Somewhere in Antarctica, American researchers rescue a dog and take it back to camp.';
                }
                if (movie.movie_id === 4) {
                    fifth = movie;
                    fifth.memo = 'A local Canadian radio host finds himself reporting on strange stories during a snowstorm.';
                }
                if (movie.movie_id === 31) {
                    sixth = movie;
                    sixth.memo = 'A group of people record their life in an abandoned hotel while converting it into a haunted house attraction.';
                }
            })
        }
        if (season === 'Spring') {
            movies.map((movie, i) => {
                if (movie.movie_id === 8) {
                    first = movie;
                    first.memo = 'Something\'s in the mist that\'s descended upon a small town in Maine.';
                }
                if (movie.movie_id === 22) {
                    second = movie;
                    second.memo = 'In a cabin in the woods, someone reads from an ancient book and causes the Deadites to rise.';
                }
                if (movie.movie_id === 15) {
                    third = movie;
                    third.memo = 'Things become strange between two lighthouse keepers while alone on an island.';
                }
                if (movie.movie_id === 16) {
                    fourth = movie;
                    fourth.memo = 'A grandmother\'s death causes problems to surface in her daughter\'s family.';
                }
                if (movie.movie_id === 20) {
                    fifth = movie;
                    fifth.memo = 'A woman yearns for fame while working on a farm, waiting for her husband to return from war.';
                }
                if (movie.movie_id === 19) {
                    sixth = movie;
                    sixth.memo = 'Boys around town are being kidnapped by a man with a black van.';
                }
            })
        }
        if (season === 'Summer') {
            movies.map((movie, i) => {
                if (movie.movie_id === 1) {
                    first = movie;
                    first.memo = 'A teenage babysitter receives disturbing phone calls while watching some children.';
                }
                if (movie.movie_id === 9) {
                    second = movie;
                    second.memo = 'Two criminal brothers take a family hostage in order to find safety over the Mexican border.';
                }
                if (movie.movie_id === 5) {
                    third = movie;
                    third.memo = 'A man calls on a vengeful creature to punish those that wronged him.';
                }
                if (movie.movie_id === 27) {
                    fourth = movie;
                    fourth.memo = 'High school students are being murdered by a killer who loves horror movies.';
                }
                if (movie.movie_id === 29) {
                    fifth = movie;
                    fifth.memo = 'A group of people band together as a virus causes everyone else to mutate and attack.';
                }
                if (movie.movie_id === 21) {
                    sixth = movie;
                    sixth.memo = 'Local graves are being desecrated, and a van full of people has just stumbled onto the wrong property.';
                }
            })
        }
    }

    /**************************************************************************************
    FUNCTIONS
***************************************************************************************/
    //function to fill out cards with the flashcard class on smaller screens
    //number parameter is to be entered as 'first' 'second' 'third' 'fourth', etc.
    function card_filler_mobile(number) {
        return (
            <div className='py-3'>
                <div className='container background_box_mini p-5 mb-5'>
                    <a href={`/titles/${number.movie_id}`}>
                        <img id={number.movie_url} className='smaller_img' src={`/photos/titles/${number.movie_url}_mini.jpg`} alt={`a movie poster for ${number.movie_title}`} />
                    </a>
                    <p className='main_text py-3 pt-5 m-0'>{`${number.memo}`}</p>
                </div>
            </div>
        );
    }


    //function to fill out cards with the flashcard class and the picture on the right side
    //number parameter is to be entered as 'first' 'second' 'third' 'fourth', etc.
    function card_filler_1(number) {
        return (
            <div className='py-3'>
                <div className='container row align-items-start background_box p-5 mb-5'>
                    <a href={`/titles/${number.movie_id}`} className='col'>
                        <img id={number.movie_url} className='smaller_img' src={`/photos/titles/${number.movie_url}_mini.jpg`} alt={`a movie poster for ${number.movie_title}`} />
                    </a>
                    <p className='col m-auto main_text'>{number.memo}</p>
                </div>
            </div>
        );
    }

    //function to fill out cards with the flashcard class and the picture on the left side
    //number parameter is to be entered as 'first' 'second' 'third' 'fourth', etc.
    function card_filler_2(number) {
        return (
            <div className='py-3'>
                <div className='container row align-items-start background_box p-5 mb-5'>
                    <p className='col m-auto main_text'>{number.memo}</p>
                    <a href={`/titles/${number.movie_id}`} className='col'>
                        <img id={number.movie_url} className='smaller_img' src={`/photos/titles/${number.movie_url}_mini.jpg`} alt={`a movie poster for ${number.movie_title}`} />
                    </a>
                </div>
            </div>
        );
    }

    if (window.innerWidth < 768) {
        return (
            <div id='Main' className='animate'>
                <div className='container d-block'>
                    <h2 className='m-2 pt-5'> {season} Recommendations </h2>

                    {/* the first card doesn't use the card_filler function because it is supposed to be visible on pageload */}
                    <div className='py-3'>
                        <div className='container background_box_mini p-5 mb-5'>
                            <div>
                                <a href={`/titles/${first.movie_id}`}>
                                    <img id={first.movie_url} className='smaller_img' src={`/photos/titles/${first.movie_url}_mini.jpg`} alt={`a movie poster for ${first.movie_title}`} />
                                </a>
                                <p className='main_text py-3 pt-5 m-0'>{first.memo}</p>

                            </div>
                        </div>
                    </div>
                    {card_filler_mobile(second)}
                    {card_filler_mobile(third)}
                    {card_filler_mobile(fourth)}
                    {card_filler_mobile(fifth)}
                    {card_filler_mobile(sixth)}
                </div>
            </div>
        );
    } else {
        return (
            <div id='Main' className='animate'>
                <div className='container d-block w-75 py-2'>
                    <h1 className='fs-1 py-2 mb-5'>Horror Movie Catalogue</h1>
                    <h3 className='m-2'> {season} Recommendations </h3>

                    {/* the first two cards don't use the card_filler functions because they are supposed to be visible on pageload */}
                    <div className='pt-4 pb-3'>
                        <div className='container row align-items-start background_box p-5 mb-5'>

                            <a href={`/titles/${first.movie_id}`} className='col'>
                                <img id={first.movie_url} className='smaller_img animate' src={`/photos/titles/${first.movie_url}_mini.jpg`} alt={`a movie poster for ${first.movie_title}`} />
                            </a>
                            <p className='col m-auto animate main_text'>{first.memo}</p>
                        </div>
                    </div>
                    <div className='py-3'>
                        <div className='container row align-items-start background_box p-5 mb-5'>
                            <p className='col m-auto animate main_text'>{second.memo}</p>
                            <a href={`/titles/${second.movie_id}`} className='col'>
                                <img id={second.movie_url} className='smaller_img animate' src={`/photos/titles/${second.movie_url}_mini.jpg`} alt={`a movie poster for ${second.movie_title}`} />
                            </a>
                        </div>
                    </div>
                    {card_filler_1(third)}
                    {card_filler_2(fourth)}
                    {card_filler_1(fifth)}
                    {card_filler_2(sixth)}
                </div>
            </div>
        );
    }
}