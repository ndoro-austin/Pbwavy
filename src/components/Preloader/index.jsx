'use client';
import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import { usePreloader } from './PreloaderContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { opacity, slideUp } from './anim';



const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Jambo", "Guten tag", "Wozzah"]

export default function Index() {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({width: 0, height:0});
    const { hasShownPreloader, setHasShownPreloader } = usePreloader();
    const router = useRouter();
    

    useEffect( () => {
        setDimension({width: window.innerWidth, height: window.innerHeight})
        // Check if preloader has been shown before
        if (typeof window !== 'undefined') {
            const shown = window.sessionStorage.getItem('hasShownPreloader');
            if (shown) {
                // If not on homepage, redirect to homepage
                if (window.location.pathname !== '/') {
                    router.replace('/');
                }
            }
        }
    }, [])

    useEffect( () => {
        if(index == words.length - 1) {
            // Mark preloader as shown
            setHasShownPreloader(true);
            if (typeof window !== 'undefined') {
                window.sessionStorage.setItem('hasShownPreloader', 'true');
            }

            return;
        }
        setTimeout( () => {
            setIndex(index + 1)
        }, index == 0 ? 1000 : 150)
    }, [index, setHasShownPreloader])

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height} 0 ${dimension.height}  L0 0`

    const curve = {
        initial: {
            d: initialPath,
            transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1]}
        },
        exit: {
            d: targetPath,
            transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3}
        }
    }

    return (
        <motion.div variants={slideUp} initial="initial" exit="exit" className={styles.introduction}>
            {dimension.width > 0 && 
            <>
                <motion.p variants={opacity} initial="initial" animate="enter"><span></span>{words[index]}</motion.p>
                <svg>
                    <motion.path variants={curve} initial="initial"  exit="exit"></motion.path>
                </svg>
            </>
            }
        </motion.div>
    )
}
