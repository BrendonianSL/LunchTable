'use client';
import LoginForm from './_blocks/LoginForm';


const Login = () => {
    return (
        <div className='flex h-screen w-full'>
            <div className='w-full h-full bg-white flex items-center justify-center'>
                <LoginForm />
            </div>
            <div className='w-full h-full bg-black'>

            </div>
        </div>
    )
}

export default Login;