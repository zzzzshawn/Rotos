import React from 'react'

const   Layout = ({children}: {children: React.ReactNode}) => { 
// chilren in layout are the folders iinside auth i.e: sign-in & sign-up



  return (
    <main className='flex-center min-h-screen w-full'>
        {children}
    </main>
  )
}

export default  Layout