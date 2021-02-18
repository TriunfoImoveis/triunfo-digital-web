import React, { useState } from 'react';

import { Plot } from '../../assets/images';
import Modal from '../Modal';
import {
  Container,
  AlertMessage,
  DetaisButton,
  DetailsNotificationContainer,
  Realtor,
  Info,
  Button,
} from './styles';

const Notifications: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container>
      <Plot />
      <AlertMessage>Você tem 1 notificação</AlertMessage>
      <DetaisButton onClick={() => setIsOpen(true)}>
        <span>Detalhes</span>
      </DetaisButton>
      {isOpen && (
        <Modal title="Fichas enviadas" onClose={() => setIsOpen(false)}>
          <DetailsNotificationContainer>
            <Realtor>
              <img
                src="https://imgur.com/I80W1Q0.png"
                alt="Corretor"
                className="avatar-realtor"
              />
              <Info>
                <span className="name-realtor">Rafael Serejo</span>
                <p>
                  <strong>Imóvel:</strong>
                  <span>Altos do Calhau</span>
                </p>
              </Info>
            </Realtor>
            <p className="date-sale">DATA: 04/02/2021</p>
            <Button>
              <span>Acessar a venda</span>
            </Button>
          </DetailsNotificationContainer>
        </Modal>
      )}
    </Container>
  );
};

export default Notifications;
