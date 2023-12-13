
import React from 'react'

function Modal({isVisible, onClose, children}) {
    
    if(!isVisible) return null;
     
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
        <div className='w-[400px] bg-white p-2 rounded-md flex flex-col'>
            <div className='self-end'onClick={()=>{onClose()}} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
             <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </div>
        <div className='p-2'>
        {children}
        </div>
        </div>
        </div>
  )
}

export default Modal