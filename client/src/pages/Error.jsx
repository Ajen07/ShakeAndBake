import React from 'react'
import error from '../assets/error.svg'
const Error = () => {
  return (
    <main className='flex h-screen justify-center items-center'>
        <img src={error} alt="Error 404" />
    </main>
  )
}

export default Error