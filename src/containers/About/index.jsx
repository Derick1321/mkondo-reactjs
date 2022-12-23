import React from 'react'
import { MarketingPageHeaderComponent } from '../Marketing/widgets/header';
import { MarketingPageFooterComponent } from '../Marketing/widgets/footer';
import * as styles from './index.module.scss';
import dj from '$assets/images/marketing/dj.jpg';


export const AboutPage = () => {
  return (
    <div>
        <MarketingPageHeaderComponent />
        <div className={styles.hero} style={{ backgroundImage: `url(${dj})` }} >
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <h1 className='text-light text-center'>About Mkondo</h1>
                <p className='text-center text-light'>The HeartBeat of African Entertainment, Watch Everywear, Anywear and Any time. Mkondo gives you access to premium content. Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the world.</p>
            </div>
        </div>

        <div className='container py-5'>
            <div className='row'>
                <div className='col-md-10 mx-auto text-light'>
                    {/* <h2 className='text-center'>Our Mission</h2> */}
                    {/* Video and Audio streaming website mission statement */}
                    <p className='text-center text-light'>Mkondo is a video and audio streaming website that allows users to watch and listen to their favorite music and videos. The website is a platform for artists to showcase their work and for users to discover new music and videos.</p> 
                    <p className='text-center text-light'>Mkondo is a platform for users to share their favorite music and videos with their friends and family. Mkondo is a platform for users to discover new music and videos. Mkondo is a platform for users to share their favorite music and videos with their friends and family. Mkondo is a platform for users to discover new music and videos. Mkondo is a platform for users to share their favorite music and videos with their friends and family. Mkondo is a platform for users to discover new music and videos. </p> 
                    <p className='text-center text-light'>Mkondo is a platform for users to share their favorite music and videos with their friends and family. Mkondo is a platform for users to discover new music and videos. Mkondo is a platform for users to share their favorite music and videos with their friends and family. Mkondo is a platform for users to discover new music and videos. Mkondo is a platform for users to share their favorite music and videos with their friends and family. Mkondo is a platform for users to discover new music and videos. Mkondo is a platform for users to share their favorite music and videos with their friends and family. Mkondo is a platform for users to discover new music and videos. Mkondo is a platform for users to share their favorite music and videos with their friends and family. Mkondo is a platform for users to discover new music and videos.</p> 
                    <p className='text-center text-light'>Mkondo is a platform for users to share their favorite music and videos with their friends and family. Mkondo is a platform for users to discover new music and videos. Mkondo is a platform for users to share their favorite music and videos with their friends and family. Mkondo is a platform for users to discover new music and videos. Mkondo is a platform for users to share their favorite music and videos with their friends and family. Mkondo is a platform for users to discover new music and videos. Mkondo is a platform for users to share their favorite music and videos with their friends and family. Mkondo is a platform for users to discover new music and videos. Mkondo is a platform for users to share their favorite music and videos with their friends and family. Mkondo is a platform for users to discover new music and videos.</p>

                </div>
            </div>
        </div>
        <MarketingPageFooterComponent />
    </div>
  )
}
