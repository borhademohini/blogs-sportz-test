import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Alert = ({showAlert, proceed, customMessage, closeAlertModal}) => {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={showAlert} onHide={closeAlertModal}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{ customMessage ? customMessage : "Do you really want to perform this action?" }</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeAlertModal}>Discard</Button>
          <Button variant="primary" onClick={proceed}>Proceed</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Alert;