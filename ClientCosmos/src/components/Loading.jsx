import React from 'react'

function Loading() {
  return (
    <div className='w-screen h-screen bg-black grid justify-center items-center'>  
      <div class="loading-container">
        <div class="loader">
          <div class="spinner"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading;