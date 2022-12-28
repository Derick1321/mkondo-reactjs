import React from 'react'
import SocialMediaMessages from './chartlist';
import * as styles from './index.module.scss';
import SearchMessages from './search';
import ChartBoard from './chartBoard';

const SocialMediaMessagesPage = () => {
  return (
    <div className='container my-3'>
   {/* <h1 className={`py-5 ${styles.heading}`}>Hello, World!</h1> */}

      <main className='content'>
        <div className="container p-0">

          <h1 className='h3 mb-3 text-white'>Messages</h1>

          <div className="card" style={{backgroundColor: "black"}}>
            <div className="row g-0">
               <div className="col-sm-12 col-md-4 border-right border-secondary">
                <SearchMessages />
                <SocialMediaMessages />
                <hr class="d-block d-lg-none mt-1 mb-0"></hr>
               </div>
               <div className='col-8 d-none d-sm-none d-md-block'>
                  <div className="py-2 px-4 border-bottom border-secondary d-none d-lg-block">
                        <div className="d-flex align-items-center py-1">
                          <div className="position-relative">
                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                          </div>
                          <div className="flex-grow-1 pl-3 text-white">
                            <strong>Derick Munisi</strong>
                            <div className="text-muted small"><em>Typing...</em></div>
                          </div>
                          {/* <div>
                            <button className="btn btn-primary btn-lg mr-1 px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-phone feather-lg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
                            <button className="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-video feather-lg"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                            </button>
                            <button className="btn btn-light border btn-lg px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-horizontal feather-lg"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
                          </div> */}
                        </div>
                  </div>

               <ChartBoard />
               </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SocialMediaMessagesPage;
