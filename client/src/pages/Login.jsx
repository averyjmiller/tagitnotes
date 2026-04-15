import axios from 'axios';
import { useState } from 'react';
import auth from '../utils/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleShowPass = (e) => {
        if(e.target.checked) {
            setShowPass(true);
        } else {
            setShowPass(false);
        }
    }

    function displayErrors(message) {
        if(!message instanceof Array) {
            return message;
        }
        
        return message
            .split(', ')
            .map(err => 
                <div key={err} className='block'>{err}</div>
            );
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        }

        try {
            const res = await axios.post(`${__API_URL__}/user/login`, data);

            if(res.data.success) {
                auth.login(res.data.token);
                navigate('/notes');
            }
        } catch(err) {
            if(err.response) {
                setError(displayErrors(err.response.data.error));
            } else {
                setError(err.message);
            }
        }
    }

    return (
        <main className='flex flex-col justify-center items-center h-full userForm'>
            <form onSubmit={handleFormSubmit}>
                <h1 className='text-2xl font-bold justify-self-center'>Welcome back!</h1>
                <div className='error'>{error}</div>
                <label>Email:</label>
                <input type='email' name='email' />
                <label htmlFor='password'>Password:</label>
                <input type={showPass ? ('text') : ('password')} id='password' name='password' />
                <input type='checkbox' id='showPass' onChange={handleShowPass} />
                <label htmlFor='showPass'>&nbsp;Show</label>
                <input className='btn' type='submit' value='Log in' />
                <p className='justify-self-center'>
                    Don't have an account?&nbsp;
                    <Link 
                        className='underline'
                        to='/signup'
                    > 
                        Signup
                    </Link>
                </p>
            </form>
        </main>
    )
}