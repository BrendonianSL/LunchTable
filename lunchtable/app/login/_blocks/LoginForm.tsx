'use client';

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


const LoginForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [headingMessage, setHeadingMessage] = useState('');
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        // Check The Request Is Already In Flight.
        if (loading) return; else setLoading(true);

        // Prevents default page reload behavior.
        e.preventDefault();

        // Creates a form data object.
        const formData = new FormData(e.currentTarget);

        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        // Send the username and password to the API endpoint.
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
            })
        });

        if (!response.ok) {
            // Handle error response.
            console.error('Failed to login');
            setLoading(false);
            return;
        } else {
            router.push('/dashboard');
        }
    }

    // Generates a random heading message.
    useEffect(() => {
        const messages = [
            'Welcome Back!',
            'Looking Good!',
            'Hello Again!',
            'Come Sit With Us!',
            'Kept Us Waiting!',
            'Brendan Says Hi!',
        ]

        setHeadingMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, []);

    return (
        <div className='max-w-[450px] w-full flex flex-col gap-8'>
            <div>
                <h1 aria-label="Heading Message" className='text-[36px] font-medium text-[#363636]'>{headingMessage}</h1>
                <h2 aria-label="Subheading Message" className='text-[#777]'>Welcome back! Please enter your details to continue.</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <FieldSet className='gap-5'>
                    <FieldGroup className='gap-4'>
                        <Field>
                            <FieldLabel aria-required={true} className='font-heading text-[16px] text-[#363636] font-medium gap-0'>Username<span className='text-error'>*</span></FieldLabel>
                            <Input required={true} type='text' placeholder='Enter your username' name='username' className='rounded-lg border-gray-300 text-[#777] py-3 text-[14px]! h-fit bg-white' />
                        </Field>
                        <Field>
                            <FieldLabel aria-required={true} className='font-heading text-[16px] text-[#363636] font-medium gap-0'>Password<span className='text-error'>*</span></FieldLabel>
                            <Input required={true} type='password' placeholder='••••••••••••' name='password' className='rounded-lg border-gray-300 text-[#777] py-3 text-[14px]! h-fit bg-white' />
                        </Field>
                    </FieldGroup>
                    <Button type='submit' className='font-medium w-full bg-brand text-white rounded-lg py-3 px-4 lg:cursor-pointer text-[14px] h-fit mt-4'>Login</Button>
                </FieldSet>
            </form>
            <span className='text-center text-[14px] text-[#363636]'>
                Are you apart of Crystal and not a member? Contact an admin to get access.
            </span>
        </div>
    )
}

export default LoginForm;