import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'

export const Carousel = ({ items }) => {
    const [count, setCount] = useState(1)
    const [playing, setPlaying] = useState(false)

    const play = () => {
        if (!playing) {
            setPlaying(true)
        }
        return setInterval(() => {
            console.log("step")
            if (count === items.length) {
                setCount(1)
            } else {
                setCount(count + 1)
            }
        }, 5000)
    }

    const next = () => {
        if (count === items.length) {
            setCount(1)
        } else {
            setCount(count + 1)
        }
    }

    const prev = () => {
        if (count === 1) {
            setCount(items.length)
        } else {
            setCount(count - 1)
        }
    }

    useEffect(() => {
        const interval = play()
        return () => {
            clearInterval(interval)
        }
    }, [play, playing])


    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                {items.map((item, index) => (
                    <li key={item} data-target="#carouselExampleIndicators" onClick={() => setCount(index + 1)} data-slide-to={index} className={`${index + 1 === count && 'active'}`}></li>
                ))}
            </ol>
            <div className="carousel-inner">
                {items.map((item, index) => (
                    <div key={item} className={`carousel-item ${styles.transitions} ${index + 1 === count && 'active'} ${index + 1 < count && styles.previous} ${index + 1 > count && styles.next}`}>
                        <div className={`${styles.wrapper}`} style={{ backgroundImage: `url('${item}')` }}>
                        </div>
                    </div>
                ))}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" onClick={prev}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" onClick={next}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}
