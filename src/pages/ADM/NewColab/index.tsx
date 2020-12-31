import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import AdmLayout from '../../Layouts/Adm';
import Input from '../../../components/Input';

import {
  Container,
  InfoLogin,
  Avatar,
  AdmissionsInfo,
  InputGroup,
  ButtonGroup,
} from './styles';
import { Sync, Garb } from '../../../assets/images';
import api from '../../../services/api';
import Select from '../../../components/Select';
import { unMaked, currency, DateYMD } from '../../../utils/unMasked';
import getValidationErros from '../../../utils/getValidationErros';

interface IRoteparams {
  id: string;
}

interface ISubsidiary {
  id: string;
  name: string;
}
interface IDepartament {
  id: string;
  name: string;
}
interface IOffice {
  id: string;
  name: string;
}

const NewColab: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [pageDetails, setPageDetails] = useState(false);
  const [subsidiary, setSubsidiary] = useState<ISubsidiary[]>([]);
  const [departament, setDepartament] = useState<IDepartament[]>([]);
  const [officies, setOfficies] = useState<IOffice[]>([]);
  const [selectedSubsidiary, setSelectedSubsidiary] = useState('');
  const [, setSelectedDepartament] = useState('');
  const token = localStorage.getItem('@TriunfoDigital:token');

  const { id } = useParams<IRoteparams>();

  useEffect(() => {
    if (id) {
      setPageDetails(true);
    }
  }, [id]);

  useEffect(() => {
    const loadSubsidiary = async () => {
      try {
        const response = await api.get('/subsidiary');
        setSubsidiary(response.data);
      } catch (error) {
        toast.error('falha na conexão do servidor!');
      }
    };
    const loadOfficies = async () => {
      try {
        const response = await api.get('/office');
        setOfficies(response.data);
      } catch (error) {
        toast.error('falha na conexão do servidor!');
      }
    };
    loadSubsidiary();
    loadOfficies();
  }, []);

  useEffect(() => {
    if (selectedSubsidiary === '0') {
      return;
    }
    api
      .get(`/departament`, {
        params: {
          subsidiary: selectedSubsidiary,
        },
      })
      .then(response => setDepartament(response.data));
  }, [selectedSubsidiary]);

  const handleSelectedSubsidiary = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setSelectedSubsidiary(value);
    },
    [],
  );
  const handleSelectedDepartament = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setSelectedDepartament(value);
    },
    [],
  );

  const optionsSubsidiary = subsidiary.map(sub => ({
    label: sub.name,
    value: sub.id,
  }));

  const optionsOffice = officies.map(office => ({
    label: office.name,
    value: office.id,
  }));
  const optionsDepartament = departament.map(departament => ({
    label: departament.name,
    value: departament.id,
  }));

  const unMasked = useCallback(() => {
    const fone = unMaked(formRef.current?.getFieldValue('phone'));
    formRef.current?.setFieldValue('phone', fone);
    const goal = currency(formRef.current?.getFieldValue('goal'));
    formRef.current?.setFieldValue('goal', goal);
    const admissionDate = DateYMD(
      formRef.current?.getFieldValue('admission_date'),
    );
    formRef.current?.setFieldValue('admission_date', admissionDate);
  }, []);

  const handleSubmit = useCallback(async () => {
    formRef.current?.setErrors({});
    unMasked();
    const data = formRef.current?.getData();
    try {
      setLoading(true);

      await api.post('/users', data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast.success('Novo Corretor Cadastrado');
      setLoading(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
      }

      toast.error('ERROR!, verifique as informações e tente novamente');
      setLoading(false);
    }
  }, [unMasked, token]);

  return (
    <AdmLayout>
      <Container>
        <h1>NOVO COLABORADOR</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <InfoLogin>
            <fieldset className="login">
              <legend>INFORMAÇÕES DE LOGIN</legend>
              <Input label="Nome Completo" name="name" />
              <Input label="E-mail" name="email" type="email" />
              <Input label="Senha" name="password" type="password" />
              <Input
                label="Confirmar Senha"
                name="password_confirmation"
                type="password"
              />
            </fieldset>
            <Avatar>
              <img src="https://imgur.com/I80W1Q0.png" alt="Corretor" />
            </Avatar>
          </InfoLogin>
          <AdmissionsInfo>
            <fieldset className="login">
              <legend>INFORMAÇÕES ADMISSIONAIS</legend>
              <InputGroup>
                <Input label="Telefone" name="phone" mask="fone" />
                <Input label="Meta de Venda" name="goal" mask="currency" />
              </InputGroup>
              <InputGroup>
                <Select
                  name="subsidiary"
                  nameLabel="Filial"
                  options={optionsSubsidiary}
                  onChange={handleSelectedSubsidiary}
                />

                <Select
                  name="departament"
                  nameLabel="Departamento"
                  options={optionsDepartament}
                  onChange={handleSelectedDepartament}
                />
              </InputGroup>
              <InputGroup>
                <Select
                  name="office"
                  nameLabel="Cargo"
                  options={optionsOffice}
                />
                <Input
                  mask="date"
                  label="Data de Admissão"
                  name="admission_date"
                />
              </InputGroup>
            </fieldset>
          </AdmissionsInfo>

          {pageDetails && (
            <ButtonGroup>
              <button type="button">
                <Sync />
                <span>Atualizar</span>
              </button>
              <button type="button">
                <Garb />
                <span>Remover</span>
              </button>
            </ButtonGroup>
          )}

          <button type="submit" className="submit">
            {loading ? 'Aguarde' : 'Cadastrar Colaborador'}
          </button>
        </Form>
      </Container>
    </AdmLayout>
  );
};

export default NewColab;
