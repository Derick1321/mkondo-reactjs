import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createManageUserRequest } from '../../../../../redux/features/artist';

export const ArtistListActions = (props) => {
    //props
    const { artist } = props;

    //state
    const [manageRequest, setManageRequest] = useState(null);
    const [isRequesting, setIsRequesting] = useState(false);

    //redux
    const { user } = useSelector(state => state.authentication);
    const dispatch = useDispatch();
    const manageUserRequests = useSelector(state => state.artist.manageUserRequests);
    const requesting = useSelector(state => state.artist.createManageUserRequestPendingQueue); 

    //effects
    useEffect(() => {
        if (!manageUserRequests.length) return;
        const index = manageUserRequests.findIndex(req => req.requested_user_id == artist.user_id);
        if (index > -1) {
            let request = manageUserRequests[index];
            setManageRequest(request);
        }
    }, [manageUserRequests]);

    useEffect(() => {
        if (!requesting.length) return;
        const index = requesting.findIndex(item => (item.requesting_user_id == user.user_id && item.requested_user_id == artist.id));
        if (index > -1) {
            setIsRequesting(true);
        } else {
            setIsRequesting(false);
        }
    }, [requesting])

    //handlers
    const handleRequestToManage = () => {
        const payload = {
            "requesting_user_id": user.user_id,
            "requested_user_id": artist.user_id,
            "status": "CREATED",
            "remarks": "",
        }
        dispatch(createManageUserRequest(payload))
    }

    return (
        <div>
            {manageRequest ? <span>{manageRequest.status}</span> : <button disabled={isRequesting} onClick={handleRequestToManage} className="btn btn-primary">Send Request {isRequesting ? <span className='spinner-border text-light'></span> : null}</button>}
        </div>
    );
}
