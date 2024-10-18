import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../contexts/context';
import Loading from '../components/Loading';

export default function Home() {
    const { data, actions } = useContext(Context);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let first, second, third, fourth, fifth, sixth;
    let season;
    const setter = new Date();
    const month = setter.getMonth() + 1;

    // Fetch movies data
    const fetchMovies = async () => {
        try {
            // Call the action to get movies
            await actions.getMoviesBySeason('Fall'); // This will fetch and update the movies in the context

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
    }, [actions, data.movies]); // Dependencies to re-run the effect if actions or data.movies change

    if (loading) {
        return <Loading />; // Render a loading state
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Render error state
    }

    if (month === 9 || month === 10 || month === 11) {

        first = {
            memo: 'An escaped mental patient stalks high school girls on Halloween night.',
            title: 'Halloween',
            url: 'halloween',
            id: 25
        };
        second = {
            memo: 'Two sisters suddenly have to learn to deal with some physical changes.',
            title: 'Ginger Snaps',
            url: 'ginger_snaps',
            id: 3
        };
        third = {
            memo: 'A scientist devotes his studies to raising the dead, regardless of consequences.',
            title: 'The Curse of Frankenstein',
            url: 'curse_of_frankenstein',
            id: 11
        };
        fourth = {
            memo: 'A woman is cursed to be followed by an entity until her death.',
            title: 'It Follows',
            url: 'it_follows',
            id: 2
        };
        fifth = {
            memo: 'In Colonial America, a baby is stolen from an outcast family and taken to the woods.',
            title: 'The VVitch',
            url: 'the_vvitch',
            id: 14
        };
        sixth = {
            memo: 'Herbert West has concocted a formula to bring the recently dead back to life.',
            title: 'Re-Animator',
            url: 're_animator',
            id: 28
        };
        season = 'Autumn';

    } else if (month === 12 || month === 1 || month === 2) {

        //first = 'black_christmas';
        first = {
            memo: 'It\'s Christmas, and people are celebrating; but a sorority house is receiving disturbing phone calls.',
            title: 'Black Christmas',
            url: 'black_christmas',
            id: 12
        };
        second = {
            memo: 'Following the Mexican-American War, a military regiment takes in a stranger on a snowy night.',
            title: 'Ravenous',
            url: 'ravenous',
            id: 10
        };
        third = {
            memo: 'A father buys his son a rare pet as a Christmas present from a mysterious shop in Chinatown.',
            title: 'Gremlins',
            url: 'gremlins',
            id: 30
        };
        fourth = {
            memo: 'Somewhere in Antarctica, American researchers rescue a dog and take it back to camp.',
            title: 'The Thing',
            url: 'the_thing',
            id: 26
        };
        fifth = {
            memo: 'A local Canadian radio host finds himself reporting on strange stories during a snowstorm.',
            title: 'Pontypool',
            url: 'pontypool',
            id: 4
        };
        sixth = {
            memo: 'A group of people record their life in an abandoned hotel while converting it into a haunted house attraction.',
            title: 'Hell House LLC',
            url: 'hell_house_llc',
            id: 31
        };
        season = 'Winter';
    } else if (month === 3 || month === 4 || month === 5) {
        first = {
            memo: 'Something\'s in the mist that\'s descended upon a small town in Maine.',
            title: 'The Mist',
            url: 'the_mist',
            id: 8
        };
        second = {
            memo: 'In a cabin in the woods, someone reads from an ancient book and causes the Deadites to rise.',
            title: 'Evil Dead',
            url: 'evil_dead',
            id: 22
        };
        third = {
            memo: 'Things become strange between two lighthouse keepers while alone on an island.',
            title: 'The Lighthouse',
            url: 'the_lighthouse',
            id: 15
        };
        fourth = {
            memo: 'A grandmother\'s death causes problems to surface in her daughter\'s family.',
            title: 'Hereditary',
            url: 'hereditary',
            id: 16
        };
        fifth = {
            memo: 'A woman yearns for fame while working on a farm, waiting for her husband to return from war.',
            title: 'Pearl',
            url: 'pearl',
            id: 20
        };
        sixth = {
            memo: 'Boys around town are being kidnapped by a man with a black van.',
            title: 'Black Phone',
            url: 'black_phone',
            id: 19
        };
        season = 'Spring';
    } else {
        first = {
            memo: 'A teenage babysitter receives disturbing phone calls while watching some children.',
            title: 'The Sitter',
            url: 'the_sitter',
            id: 1
        };
        second = {
            memo: 'Two criminal brothers take a family hostage in order to find safety over the Mexican border.',
            title: 'From Dusk Till Dawn',
            url: 'dusk_till_dawn',
            id: 9
        };
        third = {
            memo: 'A man calls on a vengeful creature to punish those that wronged him.',
            title: 'Pumpkinhead',
            url: 'pumpkinhead',
            id: 5
        };
        fourth = {
            memo: 'High school students are being murdered by a killer who loves horror movies.',
            title: 'Scream',
            url: 'scream',
            id: 27
        };
        fifth = {
            memo: 'A group of people band together as a virus causes everyone else to mutate and attack.',
            title: 'Planet Terror',
            url: 'planet_terror',
            id: 29
        };
        sixth = {
            memo: 'Local graves are being desecrated, and a van full of people has just stumbled onto the wrong property.',
            title: 'The Texas Chainsaw Massacre',
            url: 'texas_chainsaw_massacre',
            id: 21
        };
        season = 'Summer';
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
                    <a href={`/titles/${number.id}`}>
                        <img id={number.url} className='smaller_img' src={`/photos/titles/${number.url}_mini.jpg`} alt={`a movie poster for ${number.title}`} />
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
                    <a href={`/titles/${number.id}`} className='col'>
                        <img id={number.url} className='smaller_img' src={`/photos/titles/${number.url}_mini.jpg`} alt={`a movie poster for ${number.title}`} />
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
                    <a href={`/titles/${number.id}`} className='col'>
                        <img id={number.url} className='smaller_img' src={`/photos/titles/${number.url}_mini.jpg`} alt={`a movie poster for ${number.title}`} />
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
                                <a href={`/titles/${first.id}`}>
                                    <img id={first.url} className='smaller_img' src={`/photos/titles/${first.url}_mini.jpg`} alt={`a movie poster for ${first.title}`} />
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

                            <a href={`/titles/${first.id}`} className='col'>
                                <img id={first.url} className='smaller_img animate' src={`/photos/titles/${first.url}_mini.jpg`} alt={`a movie poster for ${first.title}`} />
                            </a>
                            <p className='col m-auto animate main_text'>{first.memo}</p>
                        </div>
                    </div>
                    <div className='py-3'>
                        <div className='container row align-items-start background_box p-5 mb-5'>
                            <p className='col m-auto animate main_text'>{second.memo}</p>
                            <a href={`/titles/${second.id}`} className='col'>
                                <img id={second.url} className='smaller_img animate' src={`/photos/titles/${second.url}_mini.jpg`} alt={`a movie poster for ${second.title}`} />
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