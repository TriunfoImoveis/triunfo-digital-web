import React, {
  useRef,
  useCallback,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { AxiosError } from 'axios';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import AdmLayout from '../../Layouts/Adm';
import Input from '../../../components/Input';

import { Container, InfoLogin } from './styles';
import api from '../../../services/api';
import getValidationErros from '../../../utils/getValidationErros';

const NewProfession: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = useCallback(async () => {
    formRef.current?.setErrors({});
    const data = formRef.current?.getData();
    try {
      setLoading(true);

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome da Profissão obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const paylaod = {
        ...data,
      }
      await api.post('/professions', paylaod);

      toast.success('Profissão criada com sucesso');
      history.push('/adm/config/profissoes');

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
      }
      const errors = err as AxiosError
      if (errors.response?.status === 400) {
        toast.error(errors.response?.data.message);
      } else if (errors.response?.status === 500) {
        toast.error('Erro no servidor! contate o suporte');
      } else {
        toast.error('ERROR!, verifique as informações e tente novamente');
      }

      setLoading(false);
    }
  }, [history]);

  return (
    <AdmLayout>
      <Container>
        <h1>Nova Profissão</h1>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <InfoLogin>
            <fieldset className="login">
              <legend>INFORMAÇÕES DA PROFISSÃO</legend>
              <Input
                label="Nome"
                name="name"
                placeholder="Nome da profissão"
              />
            </fieldset>
          </InfoLogin>
          <button type="submit" className="submit">
            {loading ? 'Aguarde' : 'Cadastrar nova profissão'}
          </button>
        </Form>
      </Container>
    </AdmLayout>
  );
};

export default NewProfession;
