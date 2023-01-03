import React from 'react'
import * as styles from './index.module.scss';
import { MarketingPageHeaderComponent } from '../Marketing/widgets/header';
import { MarketingPageFooterComponent } from '../Marketing/widgets/footer';
import mic from '$assets/images/marketing/mic.jpeg';

export const ContactPage = () => {
  return (
    <div>
        <MarketingPageHeaderComponent />

        <div className={styles.hero} style={{ backgroundImage: `url(${mic})` }} >
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <h1 className='text-light text-center'>Contact Us</h1>
                {/* <p className='text-center text-light'>The HeartBeat of African Entertainment, Watch Everywear, Anywear and Any time. Mkondo gives you access to premium content. Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the world.</p> */}
            </div>
        </div>

        <div className="container py-5">
            <div className="row">
                <div className="col-md-12 text-light">
                    <h1>We are Available 24/7</h1>
                    <p className='lead text-light'>For any enquiries, please contact us on the following:</p>
                    <p className='text-light'>Phone: +255 659 702 633</p>
                    <p className='text-light'>Email: info@mkondo.co</p>
                </div>
            </div>
        </div>
        <MarketingPageFooterComponent />
    </div>
  )
}
