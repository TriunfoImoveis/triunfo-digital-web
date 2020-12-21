import React from 'react';

import { ModalProps } from 'antd/lib/modal/Modal';
import { ModalContainer } from './styles';

type ModalComponent = ModalProps;
const Modal: React.FC<ModalComponent> = ({
  title,
  visible,
  onOk,
  onCancel,
}) => {
  return (
    <ModalContainer
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    />
  );
};

export default Modal;
