import React from 'react'

const SearchMessages = () => {
  return (
    <div className="px-4 d-none d-md-block">
    <div className="d-flex align-items-center">
        <div className="flex-grow-1">
            <input type="text" className='form-control my-3' placeholder='search' />
        </div>
    </div>
  </div>
  )
}

export default SearchMessages
