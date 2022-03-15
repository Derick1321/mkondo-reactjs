import React from 'react'
import Tile from './tile';


export const List = () => {
    return (
        <div>
            <Tile title="Slider Settings" link="/sliders" />
            <Tile title="Subscription Settings" link="/subscriptions" />
        </div>
    )
}
