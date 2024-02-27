import React, { useState } from 'react'
import Login from '../../components/auth/Login';

const LoginButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
    <Login open={open} setOpen={setOpen}/>
     <button
                className="m-2 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
                // hover:from-green-400 hover:to-blue-500
                type="button"
                data-te-ripple-init=""
                data-te-ripple-color="light"
                onClick={() => setOpen(true)}
              >
                Login
              </button> 
    </>
  )
}

export default LoginButton
