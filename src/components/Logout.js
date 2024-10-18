import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../contexts/context';

export default function Login(props) {

    /**************************************************************************************
        STATE AND ASYNC FUNCTIONS
    ***************************************************************************************/

    const navigate = useNavigate();
    const { data, actions } = useContext(Context);

    function logoutUser(e) {
        e.preventDefault();
        actions.signOut();
        navigate('/');
        window.location.reload();
    }

    function content_filler() {
        return (
            <div className='animate'>
                <h1 className='pb-5'>Logout</h1>
                <form action='/login' method='POST' onSubmit={logoutUser}>
                    <div className='m-auto'>
                        <h1>Are you sure?</h1>
                        <button type='' className='mt-4' onClick={logoutUser}>Logout</button>
                    </div>
                </form>

            </div>
        );
    }

    /**************************************************************************************
        RENDER
    ***************************************************************************************/
    if (window.innerWidth < 768) {
        return (
            <div id='Logout' className='container my-5 py-5 w-100 m-auto background_box_mini'>
                {content_filler()}
                <div className='py-3 my-5'>
                    <a href={'/'}>Home</a>
                </div>
            </div>
        );
    } else {
        return (
            <div id='Logout' className='container my-5 py-5 background_box w-50 m-auto'>
                {content_filler()}
                <div className='py-3 my-5'>
                    <a href={'/'}>Home</a>
                </div>
            </div>
        );
    }
}