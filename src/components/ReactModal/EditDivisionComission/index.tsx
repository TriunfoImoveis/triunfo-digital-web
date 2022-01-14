import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { BsCheck } from 'react-icons/bs';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Modal from '..';
import Input from '../../Input';
import CreatableSelect from '../../ReactSelect/Creatable';

import { Container, InputGroup } from './styles';
import Button from '../../Button';
import { useCalculator } from '../../../context/CalculatorContext';
import api from '../../../services/api';

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
  const [isLoadingGroup, setIsLoadingGroup] = useState(false);
  const [optionsDivision, setOptionsDivision] = useState([]);

  const { divisionData, handleSetDivision } = useCalculator();

  useEffect(() => {
    setNewPartDivision(divisionData);
  }, [divisionData]);
  useEffect(() => {
    const loading = async () => {
      const response = await api.get('/calculator/division_types');
      const newOptions = response.data.map(op => {
        return {
          label: op.name,
          value: `${op.id}#${op.name}`,
        };
      });
      setOptionsDivision(newOptions);
    };
    loading();
  }, []);
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

  const handleCreateNewDivision = async (division: string) => {
    await api.post('/calculator/division_types', {
      name: division,
    });
    const response = await api.get('/calculator/division_types');
    const newOptions = response.data.map(op => {
      return {
        label: op.name,
        value: `${op.id}#${op.name}`,
      };
    });
    return newOptions;
  };
  const handleCreateDivision = async (newValue: any) => {
    setIsLoadingGroup(true);
    const options = await handleCreateNewDivision(newValue);
    setIsLoadingGroup(false);
    setOptionsDivision(options);
  };

  const handleSubmit = useCallback(
    async (data: FormData) => {
      const newData = data.division;
      const division = newData.map(data => {
        const [id, name] = data.name.split('#');
        return {
          id,
          name,
          porcent: data.porcent,
        };
      });

      handleSetDivision(division);
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
                    <CreatableSelect
                      label="Nome"
                      name={`division[${index}].name`}
                      isClearable
                      allowCreateWhileLoading={isLoadingGroup}
                      isDisabled={isLoadingGroup}
                      isLoading={isLoadingGroup}
                      onCreateOption={handleCreateDivision}
                      options={optionsDivision}
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
                    <CreatableSelect
                      label="Nome"
                      name={`division[${index}].name`}
                      isClearable
                      allowCreateWhileLoading={isLoadingGroup}
                      isDisabled={isLoadingGroup}
                      isLoading={isLoadingGroup}
                      onCreateOption={handleCreateDivision}
                      options={optionsDivision}
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
          <BsCheck />
          Confirmar Divisão
        </Button>
      </Container>
    </Modal>
  );
};

export default EditComissionDivision;
