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

        </div>
        <MarketingPageFooterComponent />
    </div>
  )
}
