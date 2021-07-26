import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getMediaUrl } from '../../../../common/utils';

export const ImageListImage = (props) => {
    //props
    const { item } = props;

    //state
    const [fileUrl, setFileUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    //store
    const token = useSelector((state) => state.authentication);

    useEffect(async () => {
        console.log("image list image effect", item);
        if (!item) return;
        setIsLoading(true);
        
        try {
            const res = JSON.parse(item);
            console.log(res);
            const { url, caption } = res;
            if (!url) return;

            const _url = await getMediaUrl(url, token);
            setIsLoading(false);
            setIsLoaded(true);
            setFileUrl(_url);
        } catch (e) {
            setIsLoading(false);
             setError(e);
            return;
        }
    }, [item])


    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error occured.</p>}
            {isLoaded && <img src={fileUrl} />}
        </div>
    )
}
