import React from 'react'

const Modal = ({ children, title, footer, visible, onCancel, width, className }) => {
    return visible ? (
        <div className={'modal ' + (className ? className : '')} style={{ display: 'block', top: '20px', overflow: 'auto' }}>
            <div className='modal-back'></div>
            <div className='modal-dialog' style={width ? { maxWidth: width } : {}}>
                <div className='modal-content'>
                    <div className='modal-header' style={{ padding: '12px' }}>
                        <h4 className='modal-title' style={{ fontSize: '16px' }}>
                            {title}
                        </h4>
                        <button type='button' className='close' onClick={onCancel}>
                            &times;
                        </button>
                    </div>
                    <div className='modal-body' style={{ color: 'initial' }}>
                        {children}
                    </div>
                    <div className='modal-footer' style={{ padding: '2px' }}>
                        {footer}
                    </div>
                </div>
            </div>
        </div>
    ) : null
}

export default Modal
