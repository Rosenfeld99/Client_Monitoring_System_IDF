import React from 'react'
import { motion } from 'framer-motion'

const TransitionPage = ({ children }) => {
    const widthAnimation = {
        initial: {
            width: 0
        },
        animate: {
            width: "100%"
        },
        exit: {
            width: "100%",
            x: window.innerWidth
        }
    }

    const opacityAnimation = {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        exit: {
            opacity: 0
        }
    }
    return (
        <motion.div
            transition={{ ease: "easeInOut", duration: 0.5 }}
            variants={opacityAnimation}
            initial="initial"
            animate="animate"
            exit="exit">
            {children}
        </motion.div>
    )
}

export default TransitionPage