import React from 'react'
import styles from './index.module.scss'

const SubscriptionsListContainer = () => {
  return (
    <div className={styles.container}>
     <h1 className={styles.title}>Subscription</h1>

     <div className={styles.cardWrapper}>
       <div className={styles.card}>
         <h1>Weekly Package</h1>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat modi est, quam tenetur nam maxime laborum animi quos sunt harum consequatur, dolor veritatis, consequuntur quae assumenda ex. Voluptatum, a deleniti.</p>
         <div className={styles.price}>
           <h2>1.2k</h2>
        </div>
         <div className={styles.spacer}></div>
         <button>Subscribe</button>
       </div>
       
       <div className={styles.card}>
         <h1>Monthly Package</h1>
         <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat eaque quaerat dolor, accusantium fugit, ab impedit nemo aperiam, expedita quibusdam corrupti sequi consequuntur. Quas nobis natus molestiae ex enim aliquid!</p>
         <div className={styles.price}>
           <h2>1.2k</h2>
           <h3>TZS</h3>
           <h5>/week</h5>
        </div>
         <div className={styles.spacer}></div>
         <button>Subscribe</button>
       </div>
     </div>
    </div>
  )
}

export default SubscriptionsListContainer;
