import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../components/common/Button'
import { fetchSliders, selectAllSliders } from '../../../redux/features/slider'
import styles from './index.module.scss'

export const SliderList = () => {

    const sliders = useSelector(selectAllSliders)
    const status = useSelector(store => store.slider.status)
    const dispatch = useDispatch()

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchSliders())
        }
    }, [dispatch, status])

    return (
        <div className={`${styles.container}`}>
            <div className="row">
                <div className="col-lg-auto"><h1 className="heading-2">Sliders</h1></div>
                <div className="col-auto ml-auto">
                    <Button>Add Slider</Button>
                </div>
            </div>

            <div className="row mt-5">
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
