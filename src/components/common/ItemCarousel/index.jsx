import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as styles from './index.module.scss';
import FeatureHome from '../FeatureHome';
import { nanoid } from '@reduxjs/toolkit';
import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';
import Button from '../Button';
import { useDispatch } from 'react-redux';
import { updatePlaylist } from '../../../redux/features/player';
import Button from '../Button/index';
import { useHistory } from 'react-router-dom';

const arrowLeftIcon = require('$assets/images/icons/arrow-left.svg');
const arrowRightIcon = require('$assets/images/icons/arrow-right.svg');

const ItemCarousel = (props) => {
    // props
    const { title, icon, items, component: Component, onMoreClicked } = props;

    // router
    const { push } = useHistory();

    // refs
    const scrollRef = useRef(0);

    // state
    const [addedToPlaylist, setAddedToPlaylist] = useState(false);

    // redux
    const dispatch = useDispatch();

    // constants
    const name = nanoid(5);
    const containerId = `${name}-container`;

    // effects
    useEffect(() => {
        setup();
        applyBoounds();
    }, [items]);

    // callbacks
    const applyBoounds = useCallback(() => {
        const container = document.getElementById(containerId);
        var minx = window.innerWidth - container.clientWidth - 450;
        var maxx = 0;
        Draggable.get(container).applyBounds({
            minX: minx,
            maxX: maxx
        });
    }, [items]);

    const setup = useCallback(() => {
        const container = document.getElementById(containerId);
        var left = items.length * 230;
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
    }, [items]);

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

    //hanlde
    const handleFeatureClicked = () => {
        console.log(`ITEM-CAROUSEL: ${title} Item has been clicked`);
    }

    const handleMoreClicked = () => {
        console.log(`ITEM-CAROUSEL: ${title} More has been clicked`);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.left} onClick={handleNavLeft}>
                <img src={arrowLeftIcon} alt="" />
            </div>
            <div className={styles.right} onClick={handleNavRight}>
                <img src={arrowRightIcon} alt="" />
            </div>
            <div className={`d-flex ${styles.header}`}>
                {icon && <div className="mr-2"><img src={icon} height="30px" width="30px" alt="" /></div>}
                <h3 className='text-light'>{title}</h3>
                <div className="ml-auto d-flex">
                    <div className="mr-2">
                        {onMoreClicked ? <Button onClick={() => handleMoreClicked()}>More</Button> : null}
                    </div>
                </div>
            </div>

            <div id={`outer${name}`} className={styles.body}>
                <div id={containerId} className={`d-flex mt-4`} onClick={handleFeatureClicked}>
                    {items.map((_item, i) => (
                        <div key={`${name}-NO${i}`} className='mr-3'>
                            <Component
                                key={`${title}-${name}-NO${i}`}
                                {..._item}
                            />
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default ItemCarousel;