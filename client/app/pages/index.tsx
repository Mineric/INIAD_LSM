import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Hello from '../comps/Hello'
import Navbar from '../comps/Navbar'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import CourseCard from '../comps/CourseCard';
import CourseContainter from '../comps/CourseContainer'

const Home: NextPage = () => {
  return (

    <>
       <h1 className={styles.head}>Welcome From INIAD LMS</h1>
       <div className={styles.text}>
         Welcome from our service
       </div>
    </>
    
  )
}

export default Home
