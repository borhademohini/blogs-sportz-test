import React from 'react';
import Toast from 'react-bootstrap/Toast';

const ToastUtil = ({ toast, header, toastMessage }) => {
    console.log("toast :: ", toast);
    return (

        <Toast
            style={{
                position: 'absolute',
                top: 5,
                right: 5,
            }}
            show={toast} delay={1000} autohide
        >
            {header && (<Toast.Header>
                <strong className="mr-auto">{header}</strong>
            </Toast.Header>)}
            <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
    )
};

export default ToastUtil;

