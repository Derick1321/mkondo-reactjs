import React from 'react'
import * as styles from '../index.module.scss';
import { PropTypes } from 'prop-types';

const InsightComponent = ({ name, value}) => {
  return (
    <div className={`d-flex flex-column text-center ${styles.bubbleWrapper}`}>
      <p className={styles.bubbleTitle}>{name}</p>
      <div className={`d-flex justify-content-center align-items-center ${styles.bubble}`}>
        <span>{value}</span>
      </div>
    </div>
  )
}

InsightComponent.defaultProps = {
    name: "Insight",
    value: "8"
}

InsightComponent.protoType = {
    name: PropTypes.string,
    value: PropTypes.number
}

export default InsightComponent;