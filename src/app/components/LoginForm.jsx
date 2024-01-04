'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";


const LoginForm = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [message, setMessage] = useState('');
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await signIn('credentials', {
            email, password, redirect:false,
        });

        if(res.error) {
            setMessage('User email or password incorrect')
            return;
        }
        router.push('/timeline')
    } catch (error) {
        console.log(error);
    }
  }

  return (

        
    <div className='flex w-full h-screen justify-center items-center'>
    
      <div className='flex flex-col bumpup'>
        <h1 className='text-2xl text-center mt-5'>Login</h1>
        <form className='mt-8 m-8 flex flex-col items-start justify-center' onSubmit={handleSubmit}>
          
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
            Login
          </button>
          {message && (
            <div className='text-xs p-2 text-red-600'>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>

  );
}

export default LoginForm