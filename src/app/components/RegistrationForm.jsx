'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) { 
        router.push('/'); 
      } else {
        setMessage(data.message || 'Error during registration');
      }
    } catch (error) {
      console.error('Registration error', error);
      setMessage('Server error.');
    }
  };
  
  

  return (
    <div className='flex w-full h-screen justify-center items-center'>
      <div className='flex flex-col bumpup'>
        <h1 className='text-2xl text-center mt-5'>Register</h1>
        <form className='mt-8 m-8 flex flex-col items-start justify-center' onSubmit={handleSubmit}>
          <label className='flex flex-col items-start mb-4'>
            Username:
            <input
              className='input'
              type="text"
              name="name"
              value={username}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className='flex flex-col items-start mb-4'>
            Email:
            <input
              className='input'
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className='flex flex-col items-start mb-8'>
            Password:
            <input
              className='input'
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className='bn13 self-center' type="submit">
            Register
          </button>
          {message && (
            <div className='text-xs p-2 text-red-600'>
              {message}
            </div>
          )}
        </form>
        <div className="text-center mb-2">
          Already an account? 
          <Link 
            className="underline"
            href='/'>
              Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
