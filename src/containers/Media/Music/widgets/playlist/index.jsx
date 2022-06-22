import React, { useCallback, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import FeatureHome from '../../../../../components/common/FeatureHome';
import { nanoid } from '@reduxjs/toolkit';
import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';
import Button from '../../../../../components/common/Button';

const arrowLeftIcon = require('$assets/images/icons/arrow-left.svg');
const arrowRightIcon = require('$assets/images/icons/arrow-right.svg');

export const MusicPlaylistComponent = (props) => {
    //props
    const { title, icon, media } = props;

    const name = nanoid(5);
    const containerId = `${name}-container`;

    useEffect(() => {
        setup();
        applyBoounds();
    }, [media]);

    // refs
    const scrollRef = useRef(0);

    // callbacks
    const applyBoounds = useCallback(() => {
        const container = document.getElementById(containerId);
        var minx = window.innerWidth - container.clientWidth - 450;
        var maxx = 0;
        Draggable.get(container).applyBounds({
            minX: minx,
            maxX: maxx
        });
    }, [media]);

    const setup = useCallback(() => {
        const container = document.getElementById(containerId);
        var left = media.length * 230;
        gsap.set(container, {
            width: left,
        });

        Draggable.create(container, {
            type: 'x',
            throwProps: true,
            edgeResistance: 0.95,
            allowNativeTouchScrolling: false,
            onDragStart: (elem) => scrollRef.current = elem.x,
            onDragEnd: (elem) => scrollRef.current = Math.abs(scrollRef.current - elem.x),
        })[0];
    }, [media]);

    //handlers
    const handleNavRight = () => {
        scrollRef.current += 400;
        gsap.to(`#outer${name}`, {
        duration: 1,
        scrollTo: {
            x: scrollRef.current,
        },
        ease: gsap.Power2,
        });
    }

    const handleNavLeft = () => {
        console.log('scrollRef.current ', scrollRef.current);
        scrollRef.current -= 400;
        console.log('scrollRef.current left ', scrollRef.current);
        gsap.to(`#outer${name}`, {
        duration: 1,
        scrollTo: {
            x: scrollRef.current,
        },
        ease: gsap.Power2,
        });
    }

    return (
        <div>
            <div className={`d-flex ${styles.header}`}>
                {icon && <div className="mr-2"><img src={icon} height="30px" width="30px" alt="" /></div>}
                <h3 className='text-light'>{title}</h3>
                <div className="ml-auto d-flex">
                    <div onClick={handleNavLeft}>
                        <img src={arrowLeftIcon} alt="" />
                    </div>
                    <div className="mr-2"></div>
                    <div onClick={handleNavRight}>
                        <img src={arrowRightIcon} alt="" />
                    </div>
                </div>
            </div>

            <div id={`outer${name}`} className={styles.body}>
                <div id={containerId} className={`d-flex mt-4`}>
                    {media.map(music => (
                        <div key={music.media_id} className='mr-3'>
                            <FeatureHome 
                                key={`${title}-${music.media_id}`}
                                media={music}
                            />
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}
