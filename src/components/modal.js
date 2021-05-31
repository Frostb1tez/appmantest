import React from 'react'

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'd-block' : 'd-none'
  return (
    <div className={`modal ${showHideClassName}`} onClick={handleClose}>
      <div className={`modal-main`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
