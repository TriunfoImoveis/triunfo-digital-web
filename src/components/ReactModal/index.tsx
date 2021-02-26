import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import './modal.css';

interface IModalProps {
  children: any;
  isOpen: boolean;
  setIsOpen: () => void;
}

const ReactModal: React.FC<IModalProps> = ({ children, isOpen, setIsOpen }) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <Modal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      className="my-modal"
      overlayClassName="my-overlay"
    >
      {children}
    </Modal>
  );
};

export default ReactModal;
