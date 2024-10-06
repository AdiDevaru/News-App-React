import React from 'react'
import spinner from './spinner.gif'

const Loading = () => {

    return (
      <div className='text-center my-3'>
        <img src={spinner} alt={spinner} />
      </div>
    )
}

export default Loading
