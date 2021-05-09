import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setLanguage } from '$redux/features/user'

const LangBar = props => {

    const dispatch = useDispatch();
    const lang = useSelector(store => store.user.language);

    const onLanguageChange = (e) => {
        dispatch(setLanguage(e.target.value));
    }

    return (
        <div>
            <select value={lang} onChange={onLanguageChange} className="form-control">
                <option value="en">English</option>
                <option value="es">Español</option>
            </select>
        </div>
    )

}

export default LangBar;