import React, {
  useRef,
  useCallback,
  useState,
  useEffect,
  ChangeEvent,
} from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { CgSync } from 'react-icons/cg';
import Modal from '..';

import Button from '../../Button';
import getValidationErros from '../../../utils/getValidationErros';

import { Container, Header } from './styles';
import Select from '../../Select';
import api from '../../../services/api';
import TextArea from '../../TextArea';

interface Motive {
  motive: string;
  another_motive?: string;
}

interface Motives {
  id: string;
  description: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleFallSale: (data: Motive) => void;
}

const FallSale: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleFallSale,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [motivies, setMotivies] = useState<Motives[]>([]);
  const [isOtherMotive, setIsOtherMotive] = useState(false);

  useEffect(() => {
    const loadMotivies = async () => {
      try {
        const response = await api.get('/motive');
        setMotivies(response.data);
      } catch (error) {
        toast.error('Falha na conexão com o servidor contate o suporte');
      }
    };
    loadMotivies();
  }, []);
  const optionsMotive = motivies.map(motive => ({
    label: motive.description,
    value: motive.id,
  }));

  const handleSubmit = useCallback(
    async (data: Motive) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object({
          motive: Yup.string().required('Selecione um Motivo'),
        });
        await schema.validate(data, { abortEarly: false });
        handleFallSale(data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err);
          formRef.current?.setErrors(erros);
        }

        toast.error('ERROR ao validar os motivos da queda!');
      }
    },
    [handleFallSale],
  );

  const handleSelectAnotherMotive = useCallback(
    async (e: ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      const response = await api.get('/motive');
      const motives = response.data;
      const outherMotive: Motives[] = motives.filter(
        motive => motive.description === 'Outro Motivo',
      );
      outherMotive.map(otherMotive =>
        otherMotive.id === value
          ? setIsOtherMotive(true)
          : setIsOtherMotive(false),
      );
      return;
    },
    [],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Header>
            <h3>A venda caíu ?</h3>
          </Header>
          <Select
            nameLabel="Motivo da perda"
            name="motive"
            options={optionsMotive}
            onChange={handleSelectAnotherMotive}
          />
          {isOtherMotive ? (
            <TextArea
              name="another_motive"
              label="Outro motivo"
              placeholder="Adicone outro motivo"
            />
          ) : null}
        </Form>
        <Button
          className="add-button"
          colorsText='#FFF'
          onClick={() => formRef.current?.submitForm()}
        >
          <CgSync />
          Atualizar
        </Button>
      </Container>
    </Modal>
  );
};

export default FallSale;
