import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../contexts/context';
import Loading from '../components/Loading';
import Cookies from 'js-cookie';
import pic_1 from '../photos/the_sitter.jpg';
import pic_2 from '../photos/it_follows.jpg';
import pic_3 from '../photos/ginger_snaps.jpg';
import pic_4 from '../photos/pontypool.jpg';
import pic_5 from '../photos/pumpkinhead.jpg';
import pic_6 from '../photos/shivers.jpg';
import pic_7 from '../photos/prince_of_darkness.jpg';
import pic_8 from '../photos/the_mist.jpg';
import pic_9 from '../photos/dusk_till_dawn.jpg';
import pic_10 from '../photos/ravenous.jpg';
import pic_11 from '../photos/curse_of_frankenstein.jpg';
import pic_12 from '../photos/black_christmas.jpg';
import pic_13 from '../photos/funny_games.jpg';
import pic_14 from '../photos/the_vvitch.jpg';
import pic_15 from '../photos/the_lighthouse.jpg';
import pic_16 from '../photos/hereditary.jpg';
import pic_17 from '../photos/get_out.jpg';
import pic_18 from '../photos/vhs.jpg';
import pic_19 from '../photos/black_phone.jpg';
import pic_20 from '../photos/pearl.jpg';
import pic_21 from '../photos/texas_chainsaw_massacre.jpg';
import pic_22 from '../photos/evil_dead.jpg';
import pic_23 from '../photos/evil_dead_2.jpg';
import pic_24 from '../photos/creep.jpg';
import pic_25 from '../photos/halloween.jpg';
import pic_26 from '../photos/the_thing.jpg';
import pic_27 from '../photos/scream.jpg';
import pic_28 from '../photos/re_animator.jpg';
import pic_29 from '../photos/planet_terror.jpg';
import pic_30 from '../photos/gremlins.jpg';
import pic_31 from '../photos/hell_house_llc.jpg';
import pic_32 from '../photos/childs_play.jpg';
import pic_33 from '../photos/christine.jpg';
import pic_34 from '../photos/death_proof.jpg';
import pic_35 from '../photos/rosemarys_baby.jpg';
import pic_36 from '../photos/night_of_the_living_dead.jpg';

export default function Title() {
    const { data, actions } = useContext(Context);
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [genres, setGenres] = useState([]);
    const [writers, setWriters] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [links, setLinks] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [imgSrc, setImgSrc] = useState(null);

    const imageMap = {
        1: pic_1,
        2: pic_2,
        3: pic_3,
        4: pic_4,
        5: pic_5,
        6: pic_6,
        7: pic_7,
        8: pic_8,
        9: pic_9,
        10: pic_10,
        11: pic_11,
        12: pic_12,
        13: pic_13,
        14: pic_14,
        15: pic_15,
        16: pic_16,
        17: pic_17,
        18: pic_18,
        19: pic_19,
        20: pic_20,
        21: pic_21,
        22: pic_22,
        23: pic_23,
        24: pic_24,
        25: pic_25,
        26: pic_26,
        27: pic_27,
        28: pic_28,
        29: pic_29,
        30: pic_30,
        31: pic_31,
        32: pic_32,
        33: pic_33,
        34: pic_34,
        35: pic_35,
        36: pic_36
    };

    // Fetch movies data
    const fetchMovie = async () => {
        try {
            await actions.getMovie(id); // Fetch movie data
            // Find the movie by ID in the context data
            setMovie(data.movies);

        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        fetchMovie();
    }, [id, actions, data.movies]);

    useEffect(() => {
        if (movie && imageMap[movie.movie_id]) {
            setImgSrc(imageMap[movie.movie_id]);
        }
    }, [movie]);


    function genreSetter() {
        if (movie) {
            if (genres.length === 0) {
                const types = movie.genreList || [];
                setGenres(types);
            }
        }
    }

    function writerSetter() {
        if (movie) {
            if (writers.length === 0) {
                const types = movie.writerList || [];
                setWriters(types);
            }
        }
    }

    function directorSetter() {
        if (movie) {
            if (directors.length === 0) {
                const types = movie.directorList || [];
                setDirectors(types);
            }
        }
    }

    function linkSetter() {
        if (movie) {
            if (links.length === 0) {
                const types = movie.linkList || [];
                setLinks(types);
            }
        }
    }

    useEffect(() => { genreSetter() }, [id, data.movies]);
    useEffect(() => { writerSetter() }, [id, data.movies]);
    useEffect(() => { directorSetter() }, [id, data.movies]);
    useEffect(() => { linkSetter() }, [id, data.movies]);

    function genre_fill() {
        if (movie) {
            if (genres) {
                return genres.map((genre, i) => <a key={i} href={`/genres/${genre.genre_name}`}><p>{genre.genre_name}</p></a>);
            }
        }
    }

    function writer_fill() {
        if (movie) {
            if (writers) {
                return writers.map((writer, i) => <p key={i} >{writer.writer_name}</p>);
            }
        }
    }

    function director_fill() {
        if (movie) {
            if (directors) {
                return directors.map((director, i) => <p key={i}>{director.director_name}</p>);
            }
        }
    }

    function link_fill() {
        if (movie) {
            if (links) {
                return links.map((link, i) => {
                    if (link.youtube_link && link.prime_link) {
                        return (
                            <div key={i}>
                                <a target='_blank' href={link.prime_link}>
                                    <img className='px-5 xl_socials' src={'/photos/prime_icon.jpg'} />
                                </a>
                                <a target='_blank' href={link.youtube_link}>
                                    <img className='px-5 xl_socials' src={'/photos/youtube_icon.jpg'} />
                                </a>
                            </div>
                        );
                    } else if (link.youtube_link && !link.prime_link) {
                        return (
                            <div key={i}>
                                <a target='_blank' href={link.youtube_link}>
                                    <img className='px-5 xl_socials' src={'/photos/youtube_icon.jpg'} />
                                </a>
                            </div>
                        );
                    } else {
                        return (
                            <div key={i}>
                                <a target='_blank' href={link.prime_link}>
                                    <img className='px-5 xl_socials' src={'/photos/prime_icon.jpg'} />
                                </a>
                            </div>
                        );
                    }
                }
                );

            }
        }
    }

    function accordion_fill() {
        if (movie) {

            return (
                <div className="accordion col w-25 fly_up">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Writer(s)
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                {writer_fill()}
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Director(s)
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                {director_fill()}
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Release Date
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <a href={`/decades/${movie.decade}`}>{movie.year_released}</a>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                Genres
                            </button>
                        </h2>
                        <div id="collapseFour" className="accordion-collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                {genre_fill()}
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                Links
                            </button>
                        </h2>
                        <div id="collapseFive" className="accordion-collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <div className='w-100 m-auto'>
                                    {link_fill()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

        }
    }

    function cookie_handler() {
        if (data.currentUser === '' || data.currentUser === undefined) {
            return (
                <div>
                    <h1 className='mt-5 mb-5 pt-4 center'><a href='/titles' className='nonChalant'>{movie.title}</a></h1>
                </div>
            );
        } else {
            if (isChecked === true ||
                Cookies.get(`myList-${data.currentUser.email}-${movie.movie_id}`)
            ) {
                return (
                    <div>
                        <h1 className='mt-5 mb-2 pt-4 center'><a href='/titles' className='nonChalant'>{movie.title}</a></h1>
                        <p className='mb-5 p-2 animate'>added to list</p>
                    </div>
                );
            } else {
                return (
                    <div>
                        <h1 className='mt-5 mb-2 pt-4 center'><a href='/titles' className='nonChalant'>{movie.title}</a></h1>
                        <button className='mb-5 px-4' onClick={() => {
                            //needs logic to determine what to do when cookie doesn't exist yet
                            Cookies.set(`myList-${data.currentUser.email}-${movie.movie_id}`, `${movie.title}`, { expires: 7 });
                            actions.addMovie(data.currentUser.user_id, movie.movie_id);
                            setIsChecked(true);
                        }}>Add to My List</button>
                    </div>
                );
            }
        }
    }

    if (loading) {
        return <Loading />; // Render a loading state
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Render error state
    }

    if (movie !== null && !loading) {

        if (window.innerWidth < 992) {
            if (window.innerWidth < 576) {
                return (
                    <div id='title_div' className='container mt-5'>
                        {cookie_handler()}
                        <div id='title_photo' className='container w-100'>
                            <a href='/titles'><img src={`/photos/titles/${movie.movie_url}_mini.jpg`} alt={`Film art for ${movie.title}`} className='w-75'></img></a>
                        </div>
                        <div className='row align-items-start pt-3 pb-5'>
                            {accordion_fill()}
                        </div>
                    </div>
                );
            }
            return (
                <div id='title_div' className='container mt-5'>
                    {cookie_handler()}
                    <div id='title_photo' className='container w-100'>
                        <a href='/titles'><img src={`/photos/titles/${movie.movie_url}.jpg`} alt={`Film art for ${movie.title}`} className='w-50'></img></a>
                    </div>
                    <div className='row align-items-start pt-3 pb-5'>
                        {accordion_fill()}
                    </div>
                </div>
            );
        }
        return (
            <div id='title_div' className='container'>
                {cookie_handler()}
                <div className='row align-items-start container'>
                    {accordion_fill()}
                    <div id='title_photo' className='container w-50 fly_left'>
                        <a href='/titles'><img src={imgSrc} alt={`Film art for ${movie.title}`} className='w-75 transparent'></img></a>
                    </div>
                </div>
            </div>
        );
    }

}