import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import styles from './index.module.scss'
const cancelSvg = require('../../../../assets/images/icons/cancel-white.svg'); 

const FAQItem = (props) => {
    //props
    const { title, description } = props;
    
    //state 
    const [hide, setHide] = useState(true)

    return (
        <>
        <div className="text-left bg-dark px-4 py-3 d-flex align-items-center">
            <span>{title}</span>
            <img className={`${styles.faqIcon} ${hide || styles.active} ml-auto`} src={cancelSvg} alt="" onClick={() => setHide(!hide)} />
        </div>
        <div className={`${styles.description} ${hide || styles.active} bg-dark`}>
            <p className="text-left">{description}</p>
        </div>
        </>
    )
}

FAQItem.defaultProps = {
    title: 'FAQ',
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto quae dolorum dicta laudantium nemo magnam accusantium repellendus error aut, fugiat voluptatibus quos. Mollitia vel ad quibusdam dolore tenetur consequuntur ea!"
  };
  
FAQItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
};

export default FAQItem;