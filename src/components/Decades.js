import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../contexts/context';
import Loading from '../components/Loading';

export default function Decades() {
    const { data, actions } = useContext(Context);
    const [decades, setDecades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch genres data
    const fetchDecades = async () => {
        try {
            await actions.getDecades();
            setDecades(data.decades);
        } catch (err) {
            setError(err.message || 'Failed to fetch genres.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDecades();
    }, [actions]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

        if (decades.length < 1) {
            return (
                <div id='DecadesPage' className='container'>
                    <h1 className='my-5 pt-5'> Loading... </h1>
                    <div className="background_box decades_loader">
                    </div>
                </div>
            );
        } else {
            return (
                <div id='DecadesPage' className='container'>
                    <h1 className='my-5 pt-5'> Decades </h1>
                    <div className="card-group">
                        {
                            decades.map((item, i) => {
    
                                //function to fill in card data below
                                function fill_in() {
                                    return (
                                        <div className="card">
                                            <a href={`/decades/${item.decade_name}`}>
                                                <img src={`../../photos/decades/${item.decade_name}.jpg`} className="card-img-top" alt={`a description of ${item.name} horror`} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.decade_name}</h5>
                                                </div>
                                            </a>
                                        </div>
                                    );
                                }
    
                                //returning different widths based on screen size
                                if (window.innerWidth < 768) {
                                    return (
                                        <div key={i} className='w-100 p-3 m-auto'>
                                            {fill_in()}
                                        </div>
                                    );
                                }
                                if (window.innerWidth < 992) {
                                    return (
                                        <div key={i} className='w-75 p-3 m-auto'>
                                            {fill_in()}
                                        </div>
                                    );
                                }
                                else {
                                    return (
                                        <div key={i} className='w-25'>
                                            {fill_in()}
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                </div>
            )
        }
}