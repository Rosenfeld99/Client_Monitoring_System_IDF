import React from 'react'
import { appName } from '../../constant/constant'
import TransitionPage from '../../animation/TransitionPage'
import './splashPage.css'

const SplashPage = () => {
    return (
        <TransitionPage>
            <div dir='rtl' className='text-white bg-gradient-to-b from-cyan-500 to-blue-500  flex-1 flex items-center justify-center min-h-screen text-3xl font-bold'>
                <div className='animate-charcter w-fit '>
                    {appName}
                </div>
            </div>
        </TransitionPage>
    )
}

export default SplashPage