import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from "axios";
import {useEffect, useState} from "react";

export default function Home() {

    const [word, setWord] = useState('');
    const SERVER_HOST = 'http://localhost:3001';

    useEffect(() => {
        const fetchWord = async () => {
            const { data } = await axios.get(`${SERVER_HOST}/word`);
            setWord(data.word);
        }
        fetchWord();
    }, [])


    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Word of the day application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to Word Of The Day { word }
                </h1>
            </main>
        </div>
  )
}
