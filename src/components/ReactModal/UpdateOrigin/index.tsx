import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from '../../Input';

import React, { useRef, useCallback } from 'react';
import Modal from '..';
import { BiCheck } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { Sync, Garb } from '../../../assets/images';
import api from '../../../services/api';
import { Container, ButtonGroup } from './styles';

interface IOriginsData {
  id: string;
  name: string;
  active: boolean;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  originData: IOriginsData;
}

const UpdateOrigins: React.FC<ModalProps> = ({isOpen, originData, setIsOpen}) => {

  const formRef = useRef<FormHandles>(null);

  const { id, active } = originData;

  const updateOrigin = useCallback(async () => {
    const data = formRef.current?.getData();
    try {
      await api.put(`/origin-sale/update/${id}`, data);
      toast.success('Origem Atualizadaos');
      window.location.reload();
    } catch (error) {
      toast.error('ERRO!');
    }
  }, [id]);
  const deleteOrigin = useCallback(async () => {
    try {
      await api.put(`/origin-sale/deactivate/${id}`);
      toast.success('Origem desativado');
       window.location.reload();
    } catch (error) {
      toast.error('ERROR! Contate o suporte');
    }
  }, [id]);
  const activateOrigin = useCallback(async () => {
    try {
      await api.put(`/origin-sale/active/${id}`);
      toast.success('Origem Ativado');
       window.location.reload();
    } catch (error) {
      toast.error('ERROR! Contate o suporte');
    }
  }, [id]);


  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <Form ref={formRef} onSubmit={updateOrigin} initialData={{ name: originData.name}}>
        
        <div style={{ marginTop: "16px",  marginBottom: "16px" }}>
          <Input label="Nome" name="name" width="100%" />
        </div>
         

          <ButtonGroup>
            <button type="submit">
              <Sync />
              <span>Atualizar</span>
            </button>
            {active ? (
              <button type="button" onClick={deleteOrigin}>
              <Garb />
              <span>Desativar</span>
            </button>
            ) : (
              <button type="button" onClick={activateOrigin}>
              <BiCheck size={50} />
              <span>Ativar</span>
            </button>
            )}
            
          </ButtonGroup>
        </Form>
      </Container>
    </Modal>
  );
};

export default UpdateOrigins;