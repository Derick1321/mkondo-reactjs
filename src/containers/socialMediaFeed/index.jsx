import React from 'react'
import styles from './index.module.scss';
import styled from 'styled-components'
import { SocialMediaCreatePost } from '../../components/social/post/createPost';
import { SocialMediaStoryList } from '../../components/social/post/storyList';
import { CompleteProfile } from '../../components/social/completeProfile';

const DateBox = styled.div`
    background: rgba(255,255,255,0.7);
    box-shadow: 0 0 5px rgba(0,0,0,0.95);
    border: solid 2px rgba(255,255,255,0.9);
    border-radius: 10px;
    color: rgba(0,0,0,0.8)
`;

export const SocialMediaFeed = () => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    const days = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
      ]

    const date = new Date();
    return (
        <div className={`container mt-5`}>
            <div className="row">
                <div className="col-lg-3 mb-3 mb-lg-0">
                    <DateBox className="d-flex flex-column justify-content-center align-items-center p-5">
                            <h1>{date.getHours()}:{date.getMinutes()}</h1>
                            <h3 className="mt-3">{days[date.getDay()]}, {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</h3>
                    </DateBox>
                    <div className="mt-3"></div>
                    <CompleteProfile />
                </div>
                <div className="col-lg-6 mb-3 mb-lg-0">
                    <SocialMediaCreatePost />
                    <div className="mt-4">
                        <SocialMediaStoryList />
                    </div>
                </div>
                <div className="col-lg-3">
                    
                </div>
            </div>
        </div>
    )
}
