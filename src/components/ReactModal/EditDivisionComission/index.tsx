import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { BsCheckBox } from 'react-icons/bs';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Modal from '..';
import Input from '../../Input';

import { Container, InputGroup } from './styles';
import Button from '../../Button';
import { useDivision } from '../../../context/DivisionComissionContext';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

interface PartDivision {
  id: string;
  name: string;
  porcent: string;
}

interface FormData {
  division: PartDivision[];
}

const EditComissionDivision: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [newPartDivision, setNewPartDivision] = useState<PartDivision[]>([]);
  const { divisionData, handleSetDivision } = useDivision();

  useEffect(() => {
    setNewPartDivision(divisionData);
  }, [divisionData]);
  const addPartDivision = useCallback(() => {
    const listDivision = newPartDivision.slice();
    const numberPlot = Math.random().toString(16);

    listDivision.push({
      id: numberPlot,
      name: '',
      porcent: '0',
    });
    setNewPartDivision(listDivision);
  }, [newPartDivision]);
  const removeDivision = useCallback(() => {
    const listDivision = newPartDivision.slice();
    listDivision.pop();

    setNewPartDivision(listDivision);
  }, [newPartDivision]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      handleSetDivision(data.division);
      setIsOpen();
    },
    [setIsOpen, handleSetDivision],
  );
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h3>Editar a divisão</h3>
          {newPartDivision ? (
            <>
              {newPartDivision.map((partDivision, index) =>
                index === 0 ? (
                  <InputGroup key={partDivision.id}>
                    <Input
                      label="Nome"
                      name={`division[${index}].name`}
                      defaultValue={partDivision.name}
                    />
                    <Input
                      label="Porcentagem"
                      name={`division[${index}].porcent`}
                      defaultValue={partDivision.porcent}
                    />
                    <Button type="button" onClick={addPartDivision}>
                      <FaPlus />
                    </Button>
                  </InputGroup>
                ) : (
                  <InputGroup key={partDivision.id}>
                    <Input
                      label="Nome"
                      name={`division[${index}].name`}
                      defaultValue={partDivision.name}
                    />
                    <Input
                      label="Porcentagem"
                      name={`division[${index}].porcent`}
                      defaultValue={partDivision.porcent}
                    />
                    <Button type="button" onClick={removeDivision}>
                      <FaMinus />
                    </Button>
                  </InputGroup>
                ),
              )}
            </>
          ) : null}
        </Form>
        <Button
          className="add-button"
          onClick={() => formRef.current?.submitForm()}
        >
          <BsCheckBox />
          Adicionar conta
        </Button>
      </Container>
    </Modal>
  );
};

export default EditComissionDivision;
