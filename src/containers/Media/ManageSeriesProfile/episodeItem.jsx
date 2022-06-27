import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import FeatureHome from '../../../components/common/FeatureHome';
import { getMediaUrl } from '../../../common/utils';

export const EpisodeItem = ({ episode }) => {
      //state 
      const [url, setUrl] = useState('')

      //store
      const { token } = useSelector(state => state.authentication);
  
      //effect
      useEffect(async () => {
          console.log("On Episode Item Mount", episode)
          if (!episode.media_url) return;
          console.log("Debugging....");
          const _url = await getMediaUrl(episode.media_url, token);
          console.log("Effect HOC fetching media url");
          console.log(_url);
          setUrl(_url)
      }, []);
  
      return (
          <div>
              <FeatureHome
                  key={`${episode.media_id}`}
                  media={episode}
              />
          </div>
      )
}
