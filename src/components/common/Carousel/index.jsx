import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import logo from './logo.png'

export const Carousel = ({ items }) => {
    const [count, setCount] = useState(1)
    const [playing, setPlaying] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [itemsLoaded, setItemsLoaded] = useState(0)
    const [tik, setTik] = useState(0)
    
    const itemLoaded = () => {
        setItemsLoaded(itemsLoaded + 1)
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
        if (loaded) {
            const interval = setInterval(() => {
                setCount(prev => {
                    if (prev === items.length) {
                        return 1
                    } else {
                        return prev + 1
                    }
                })
            }, 5000)
            return () => {
                clearInterval(interval)
            }
        }
    }, [loaded])


    useEffect(() => {
        if (itemsLoaded !== 0 && itemsLoaded === items.length) {
            setLoaded(true)
        }
    }, [itemsLoaded])

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.indicators}`}>
                {items.map((item, index) => (
                    <div key={item} onClick={() => setCount(index + 1)} data-slide-to={index} className={`${index + 1 === count && styles.solid }`}></div>
                ))}
            </div>
            <div className="d-flex">
                {items.map((item, index) => (
                    <div key={item} className={`${styles.item} ${index + 1 === count && styles.active} ${index + 1 < count && styles.previous} ${index + 1 > count && styles.next}`}>
                        <div className={`${styles.wrapper}`} style={{ backgroundImage: `url('${item}')` }}>
                        </div>
                    </div>
                ))}
            </div>
            <div className={`${styles.prevButton}`} onClick={prev}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </div>
            <div className={`${styles.nextButton}`} onClick={next}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </div>
            {!loaded ? (
              <div className={`${styles.loader}`}>
                <div>
                    <span>Loading...</span>
                </div>
            </div>  
            ) : ""}
            <div className={`${styles.brand}`}>
                <img src={logo} alt="Mkondo Logo" height={50} />
            </div>
            {items.map((item) => <img src={item} alt="" style={{ display: "none" }} onLoad={itemLoaded} />)}
        </div>
        // <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        //     <ol className="carousel-indicators">
        //         {items.map((item, index) => (
        //             <li key={item} data-target="#carouselExampleIndicators" onClick={() => setCount(index + 1)} data-slide-to={index} className={`${index + 1 === count && 'active'}`}></li>
        //         ))}
        //     </ol>
        //     <div className="carousel-inner">
                
        //     </div>
        //     <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" onClick={prev}>
        //         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        //         <span className="sr-only">Previous</span>
        //     </a>
        //     <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" onClick={next}>
        //         <span className="carousel-control-next-icon" aria-hidden="true"></span>
        //         <span className="sr-only">Next</span>
        //     </a>
        // </div>
    )
}
