import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { handleFetch } from '$common/requestUtils';

const Avatar = styled.div`
  background-image: url(${props => props.source});
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: #727C7C;
`;

const CommentRow = (props) => {
  // props
  const {
    name,
    date,
    value,
    avatarUrl,
  } = props;

  // store
  const token = useSelector((store) => store.authentication.token);

  // state
  const [url, setUrl] = useState(null);

  // effects
  useEffect(() => {
    if (!avatarUrl) {
      return;
    }

    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${avatarUrl}`, null, token);
    setUrl(res.response);
  }, [avatarUrl]);

  // render
  return (
    <div className="d-flex">
      <Avatar
        source={url}
      />
      <div class="d-flex flex-column">
         <p>{name} <span>{date}</span></p>
         <p>{value}</p>
      </div>
    </div>
  )
} 

export default CommentRow;
