import React from 'react'
import { appName } from '../../constant/constant'
import TransitionPage from '../../animation/TransitionPage'
import './splashPage.css'
import '../../App.css'
import useTheme from '../../hooks/useTheme'


const SplashPage = () => {
    const [theme] = useTheme()
    return (
        <TransitionPage>
            <div dir='rtl' className={`text-white bg-gradient-to-t ${theme == "light" ? "from-light_secoundary to-light_accent" : "from-dark_accent to-dark_secoundary"} flex-1 flex items-center justify-center min-h-screen text-3xl font-bold`}>
                <div className='animate-charcter w-fit '>
                    {appName}
                </div>
            </div>
        </TransitionPage>
    )
}

export default SplashPage