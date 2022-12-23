import React from 'react'
import * as styles from './index.module.scss';
const SocialMediaMessages = () => {
  return (
  <div>
      <a href="#" className="list-group-item list-group-item-action text-secondary bg-dark">
        <div className="badge bg-success float-right">5</div>
        <div className="d-flex align-items-start">
          <img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle mr-1" alt="Vanessa Tucker" width="40" height="40" />
          <div className="flex-grow-1 ml-3">
            Derick Munisi
            <div className="small"><span className={`fas fa-circle ${styles.chatOnline}`}></span> Online</div>
          </div>
        </div>
      </a>
      <a href="#" className="list-group-item list-group-item-action text-secondary" style={{backgroundColor: "black"}}>
        <div className="badge bg-success float-right">7</div>
        <div className="d-flex align-items-start">
          <img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="rounded-circle mr-1" alt="William Harris" width="40" height="40" />
          <div className="flex-grow-1 ml-3">
            Mark Mayalla
            <div className="small"><span className={`fas fa-circle ${styles.chatOffline}`}></span> Offline</div>
          </div>
        </div>
      </a>
      <a href="#" className="list-group-item list-group-item-action text-secondary" style={{backgroundColor: "black"}}>
        <div className="d-flex align-items-start">
          <img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="rounded-circle mr-1" alt="William Harris" width="40" height="40" />
          <div className="flex-grow-1 ml-3">
            Yona ChafuTz
            <div className="small"><span className="fas fa-circle chat-online"></span> Online</div>
          </div>
        </div>
      </a>
      <a href="#" className="list-group-item list-group-item-action text-secondary" style={{backgroundColor: "black"}}>
        <div className="d-flex align-items-start">
          <img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="rounded-circle mr-1" alt="William Harris" width="40" height="40" />
          <div className="flex-grow-1 ml-3">
            William Harris
            <div className="small"><span className="fas fa-circle chat-offline"></span> Offline</div>
          </div>
        </div>
      </a>

  </div>

  )
}

export default SocialMediaMessages
