import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from './Error';
import { Context } from '../contexts/context';

export default function Register() {
    const { data, actions } = useContext(Context);
    const [info, setInfo] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Function to handle user registration
    const registerUser = async (e) => {
        e.preventDefault();
        
        // Validate input fields
        if (!info.first_name || !info.last_name || !info.email || !info.password) {
            setError('All fields are required.');
            return;
        }
        
        try {
            // Call registerUser action
            await actions.registerUser(info.first_name, info.last_name, info.email, info.password);
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    // Render error message if exists
    if (error) {
        return (
            <div className='py-5 my-5 mx-auto'>
                <Error message={error} />
                <div className={`background_box${window.innerWidth < 768 ? '_mini' : ''} w-100 m-auto`}>
                    <div><a href='/register'>Back</a></div>
                    <div><a href='/login'>Login</a></div>
                    <div><a href='/'>Home</a></div>
                </div>
            </div>
        );
    }

    // Render registration form
    return (
        <div id='Register' className={`container my-5 py-5${window.innerWidth < 768 ? ' w-100 m-auto background_box_mini' : ' background_box w-50 m-auto'}`}>
            <h1 className='pb-5'>Register</h1>
            <form onSubmit={registerUser}>
                <div className='m-auto'>
                    <div className='p-2'>
                        <label htmlFor='first_name' className='w-100'>First Name</label>
                        <input
                            type='text'
                            id='first_name'
                            name='first_name'
                            value={info.first_name}
                            onChange={(e) => setInfo({ ...info, first_name: e.target.value })}
                        />
                    </div>
                    <div className='p-2'>
                        <label htmlFor='last_name' className='w-100'>Last Name</label>
                        <input
                            type='text'
                            id='last_name'
                            name='last_name'
                            value={info.last_name}
                            onChange={(e) => setInfo({ ...info, last_name: e.target.value })}
                        />
                    </div>
                    <div className='p-2'>
                        <label htmlFor='email' className='w-100'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={info.email}
                            onChange={(e) => setInfo({ ...info, email: e.target.value.toLowerCase() })}
                        />
                    </div>
                    <div className='p-2'>
                        <label htmlFor='password' className='w-100'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={info.password}
                            onChange={(e) => setInfo({ ...info, password: e.target.value })}
                        />
                    </div>
                    <button type='submit'>Register</button>
                </div>
            </form>
            <div className='py-3 my-5'>
                <p className='w-100'>Already have an account?</p>
                <a href='/login'>Login</a>
            </div>
        </div>
    );
}