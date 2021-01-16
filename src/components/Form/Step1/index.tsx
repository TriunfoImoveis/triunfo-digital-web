import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { useForm } from '../../../context/FormContext';
import api from '../../../services/api';
import getValidationErros from '../../../utils/getValidationErros';

import Select from '../../Select';
import Button from '../../Button';

import { Container, InputGroup, ButtonGroup, InputForm } from './styles';
import Input from '../../Input';

interface IOptionsData {
  id: string;
  name: string;
}

interface ISaleNewData {
  nextStep: () => void;
  typeSale: 'new' | 'used';
}

interface IStep1FormData {
  realty: {
    enterprise: string;
    unity: string;
    state: string;
    city: string;
    neighborhood: string;
    property: string;
  };
  builder?: string;
}

const Step1: React.FC<ISaleNewData> = ({ nextStep, typeSale }) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState<IOptionsData[]>([]);
  const [builders, setBuilders] = useState<IOptionsData[]>([]);
  const [selectedUf, setSelectedUf] = useState('MA');
  const { updateFormData } = useForm();

  useEffect(() => {
    let mounted = true;

    const loadPropertyType = async () => {
      const response = await api.get('/property-type');
      setPropertyType(response.data);
    };

    if (mounted) {
      loadPropertyType();
    }

    return function cleanup() {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (typeSale === 'used') {
      return;
    }
    const loadBuilders = async () => {
      const response = await api.get('/builder', {
        params: {
          uf: selectedUf,
        },
      });
      setBuilders(response.data);
    };
    if (mounted) {
      loadBuilders();
    }
    return function cleanup() {
      mounted = false;
    };
  }, [typeSale, selectedUf]);
  const optionsUFs = [
    { label: 'Maranhão', value: 'MA' },
    { label: 'Ceará', value: 'CE' },
    { label: 'Piauí', value: 'PI' },
    { label: 'Paraíba', value: 'PB' },
    { label: 'São Paulo', value: 'SP' },
  ];

  const optionsTypeImobille = propertyType.map(property => ({
    value: property.id,
    label: property.name,
  }));

  const optionBuilder = builders.map(builder => ({
    label: builder.name,
    value: builder.id,
  }));

  const handleSelectedUF = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const uf = event.target.value;
      setSelectedUf(uf);
    },
    [],
  );

  const handleSubmit = useCallback(
    async (data: IStep1FormData) => {
      formRef.current?.setErrors({});
      try {
        setLoading(true);
        if (typeSale === 'new') {
          const schema = Yup.object().shape({
            realty: Yup.object().shape({
              enterprise: Yup.string().required('Nome do Imóvel Obrigatório'),
              state: Yup.string().required('Informe o Estado'),
              city: Yup.string().required('Informe o Cidade'),
              neighborhood: Yup.string().required('Informe o bairrro'),
              property: Yup.string().required('Selecione o tipo do imóvel'),
              unit: Yup.string().required('Infome a unidade'),
            }),
            builder: Yup.string().required('Selecione um construtora'),
          });

          await schema.validate(data, {
            abortEarly: false,
          });
        } else {
          const schema = Yup.object().shape({
            realty: Yup.object().shape({
              enterprise: Yup.string().required('Nome do Imóvel Obrigatório'),
              state: Yup.string().required('Informe o Estado'),
              city: Yup.string().required('Informe o Cidade'),
              neighborhood: Yup.string().required('Informe o bairrro'),
              property: Yup.string().required('Selecione o tipo do imóvel'),
              unit: Yup.string().required('Infome a unidade'),
            }),
          });

          await schema.validate(data, {
            abortEarly: false,
          });
        }

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
    [nextStep, updateFormData, typeSale],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputForm label="Empreendimento" name="realty.enterprise" />
        <InputGroup>
          <Select
            name="realty.state"
            options={optionsUFs}
            defaultValue={selectedUf}
            onChange={handleSelectedUF}
            nameLabel="Estado"
          />
          <Input name="realty.city" placeholder="Cidade" label="Cidade" />
        </InputGroup>
        <InputForm
          label="Bairro"
          name="realty.neighborhood"
          placeholder="Bairro"
        />
        <Select
          name="realty.property"
          placeholder="Tipo do Imovel"
          options={optionsTypeImobille}
          nameLabel="Tipo do Imóvel"
        />
        <InputForm label="Unidade" name="realty.unit" placeholder="Unidade" />
        {typeSale === 'new' && (
          <Select
            name="builder"
            options={optionBuilder}
            nameLabel="Contrutora"
          />
        )}
        <ButtonGroup>
          <Button type="reset" className="cancel">
            Cancelar
          </Button>
          <Button type="submit" className="next">
            {loading ? '...' : 'Próximo'}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default Step1;
