import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import auth from '../utils/auth';
import placeholder from '../assets/placeholder.png';

export default function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/signup');
    }

    useEffect(() => {
        if(auth.loggedIn()) {
            navigate('/notes');
        }
    }, []);

    return (
        <main className='h-screen flex justify-center items-center'>
            <div className='flex flex-col md:flex-row gap-8 items-center mx-4'>
                <div className='flex-1 flex flex-col items-center gap-8'>
                    <h1 className='text-5xl font-bold text-center'>
                        <span className='text-lg block'>Welcome to</span>
                        Tag-it Notes
                    </h1>
                    <p className=''>A note-taking app with tagging and filtering for organization and productivity.</p>
                    <button className='btn'
                        onClick={handleClick}
                    >
                        Get started
                    </button>
                </div>
                <div className='flex-1 flex items-center flex-col gap-8'>
                    <img src={placeholder}
                        className='max-w-100 w-full'
                    />
                </div>
            </div>
        </main>
    )
}