import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles, Scope } from '@unform/core';
import { IoMdArrowDropdown } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useForm } from '../../../context/FormContext';
import getValidationErros from '../../../utils/getValidationErros';

import Select from '../../Select';
import Button from '../../Button';

import { Container, InputGroup, ButtonGroup } from './styles';

interface ISaleNewData {
  nextStep: () => void;
  prevStep: () => void;
  typeSale: 'new' | 'used';
}

interface formData {
  realtor_sell: string;
  coordenador: string;
  director: string;
}

const Step3: React.FC<ISaleNewData> = ({ nextStep, prevStep, typeSale }) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const { updateFormData } = useForm();

  const optionsRealtors = [
    { label: 'Rafael Serejo', value: 'Rafael Serejo' },
    { label: 'Alberto Madeira', value: 'Alberto' },
    { label: 'Robson', value: 'Robson Fernandes' },
    { label: 'Rosana', value: 'Rosana Porto' },
  ];

  const optionsCoordenador = [
    { label: 'Gregory Mike', value: 'Gregory Mike' },
    { label: 'Rossilene Sampaio', value: 'Rossilene Sampaio' },
  ];

  const optionsDirector = [
    { label: 'Raunin/Cristiane', value: 'Raunin/Cristiane' },
  ];

  const handleSubmit = useCallback(
    async (data: formData) => {
      formRef.current?.setErrors({});
      try {
        setLoading(true);
        const schema = Yup.object().shape({
          users_sellers: Yup.array().required('Corretor Vendedor Obrigatório'),
          user_coordinator: Yup.string().required('Coordenador Obrigatório'),
          user_director: Yup.string().required('Diretor Obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        updateFormData(data);
        nextStep();
        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err);
          formRef.current?.setErrors(erros);
        }

        toast.error('ERROR!, verifique as informações e tente novamente');
        setLoading(false);
      }
    },
    [updateFormData, nextStep],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        {typeSale === 'new' && (
          <>
            <Scope path="users_sellers[0]">
              <Select
                name="id"
                options={optionsRealtors}
                icon={IoMdArrowDropdown}
                nameLabel="o Corretor Vendedor"
                add
              />
            </Scope>
            <InputGroup>
              <Select
                name="user_coordinator"
                options={optionsCoordenador}
                icon={IoMdArrowDropdown}
                nameLabel="o Coordenador"
              />
              <Select
                name="user_director"
                options={optionsDirector}
                icon={IoMdArrowDropdown}
                nameLabel="o diretor"
              />
            </InputGroup>
          </>
        )}
        {typeSale === 'used' && (
          <>
            <InputGroup>
              <Scope path="users_sellers[0]">
                <Select
                  name="id"
                  options={optionsRealtors}
                  icon={IoMdArrowDropdown}
                  nameLabel="o Corretor Vendedor"
                  add
                />
              </Scope>
              <Scope path="users_captivators">
                <Select
                  name="id"
                  options={optionsRealtors}
                  icon={IoMdArrowDropdown}
                  nameLabel="o Corretor Captador"
                  add
                />
              </Scope>
            </InputGroup>
            <Select
              name="user_director"
              options={optionsDirector}
              icon={IoMdArrowDropdown}
              nameLabel="o diretor"
            />
          </>
        )}

        <ButtonGroup>
          <Button type="button" className="cancel" onClick={() => prevStep()}>
            Voltar
          </Button>
          <Button type="submit" className="next">
            {loading ? '...' : 'Próximo'}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default Step3;
