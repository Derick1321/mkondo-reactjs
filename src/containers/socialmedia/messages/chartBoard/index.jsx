import React from "react";
import * as styles from './index.module.scss';


const ChartBoard = () => {
    return ( 
        <div className='position-relative '>
        <div className='chat-messages p-4'>

            <div className={`pb-4 ${styles.chatMessageRight}`} >
                <div>
                  <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
                  <div className="text-muted small text-nowrap mt-2">2:33 am</div>
                </div>
                <div className={`flex-shrink-1 rounded py-2 px-3 mr-3 border-1  border-secondary ${styles.chatText}`}>
                  <div className="font-weight-bold mb-1">You</div>
                  Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.
                </div>
            </div>

            <div className={`pb-4 ${styles.chatMessageLeft}`}>
              <div>
                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                <div className="text-muted small text-nowrap mt-2 mx-2">2:34 am</div>
              </div>
              <div className={`flex-shrink-1 rounded py-2 px-3 mr-3 border-1 border-secondary ${styles.chatText}`} >
                <div className="font-weight-bold mb-1">Derick Munisi</div>
                Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
              </div>
            </div>

            <div class="flex-grow-0 py-3 px-4 border-top">
				<div class="input-group">
					<input type="text" class="form-control" placeholder="Type your message" />
					<button class="btn btn-primary">Send</button>
				</div>
			</div>

        </div>
      </div>
     );
}
 
export default ChartBoard;