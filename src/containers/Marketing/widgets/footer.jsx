import React from 'react'
// import * as styles from '../index.module.scss';


export const MarketingPageFooterComponent = () => {
  return (
    <div className="bg-dark mt-5">
        <div className="container py-0 my-0">
        <div className="row py-0 my-0 text-light">
            <div className="text-center py-0 my-0">
            <a href="/about">About Us</a> | <a href="/contact">Contact Us</a> | <a href="/privacy">Privacy</a> | <a href="/desclaimer">Desclaimer</a> | <a href="/dmny">DMNY</a>
            </div>
          </div>
          <div className="row py-0 my-0 text-light">
            <div className="text-center py-0 my-0">
              <p className='py-0 my-0'>Copyright &copy; Mkondo {Date.now().getFullYear}, All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
  )
}
