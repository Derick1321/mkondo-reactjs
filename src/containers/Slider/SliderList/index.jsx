import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../components/common/Button'
import styles from './index.module.scss'

export const SliderList = () => {
    const sliders = [
        { id: 1, name: "Home Slider" },
        { id: 2, name: "Artists Slider" }
    ]

    return (
        <div className={`${styles.container}`}>
            <div className="row">
                <div className="col-lg-auto"><h1 className="heading-2">Sliders</h1></div>
                <div className="col-auto ml-auto">
                    <Button>Add Slider</Button>
                </div>
            </div>

            <div className="row">
                {sliders.map(slider => (
                    <div className="col-lg-4">
                        <div className={`${styles.card}`}>
                            <div>
                                <h5 className="text-center">{slider.name}</h5>
                                <div className={`${styles.actions}`}>
                                    <a href="">View</a>
                                    <a href="">Edit</a>
                                    <a href="">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
