import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { useForm } from '../../../context/FormContext';
import { states } from '../../../utils/loadOptions';
import { InputControlled, SelectControlled, FormButtons, FormRow } from '../../FormControls';
import Button from '../../Button';
import getValidationErros from '../../../utils/getValidationErros';
import { Container } from './styles';

interface IOptionsData {
  id: string;
  name: string;
}

interface ICEP {
  bairro?: string;
  cep: string;
  complemento?: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}

interface INeighborhoodData {
  id: string;
  name: string;
  uf: string;
  active: boolean;
}

interface RealtyFormData {
  realty: {
    enterprise: string;
    unit: string;
    state: string;
    city: string;
    neighborhood: string;
    property: string;
    zipcode: string;
  };
  builder: string;
}

interface Props {
  nextStep: () => void;
}

const schema = Yup.object().shape({
  realty: Yup.object().shape({
    zipcode: Yup.string().required('CEP obrigatório'),
    enterprise: Yup.string().required('Nome do Imóvel Obrigatório'),
    state: Yup.string().required('Informe o Estado'),
    city: Yup.string().required('Informe a Cidade'),
    neighborhood: Yup.string().required('Informe o bairro'),
    property: Yup.string().required('Selecione o tipo do imóvel'),
    unit: Yup.string().required('Informe a unidade'),
  }),
  builder: Yup.string().required('Selecione uma construtora'),
});

const RealtyFormNew: React.FC<Props> = ({ nextStep }) => {
  const { formData, updateFormData } = useForm();

  const [form, setForm] = useState<RealtyFormData>(() => ({
    realty: {
      enterprise: formData.realty?.enterprise || '',
      zipcode: formData.realty?.zipcode || '',
      state: formData.realty?.state || '',
      city: formData.realty?.city || '',
      neighborhood: formData.realty?.neighborhood || '',
      property: formData.realty?.property || '',
      unit: formData.realty?.unit || '',
    },
    builder: formData.builder || '',
  }));

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [builders, setBuilders] = useState<IOptionsData[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<IOptionsData[]>([]);
  const [optionsNeighborhood, setOptionsNeighborhood] = useState<
    { label: string; value: string }[]
  >([]);
  const [isFindingNeighborhood, setIsFindingNeighborhood] = useState(true);
  const [selectedUf, setSelectedUf] = useState(formData.realty?.state || '');

  useEffect(() => {
    const loadPropertyType = async () => {
      const response = await api.get('/property-type');
      setPropertyTypes(response.data);
    };
    loadPropertyType();
  }, []);

  useEffect(() => {
    const loadBuilders = async () => {
      if (!selectedUf) return;
      const response = await api.get('/builder', {
        params: { uf: selectedUf },
      });
      setBuilders(response.data);
    };
    loadBuilders();
  }, [selectedUf]);

  const optionBuilder = useMemo(
    () => builders.map(builder => ({ label: builder.name, value: builder.id })),
    [builders],
  );
  const optionsPropertyType = useMemo(
    () => propertyTypes.map(property => ({ label: property.name, value: property.id })),
    [propertyTypes],
  );

  const createOptionsneighborhood = (neighborhood: Array<{ name: string }>) =>
    neighborhood.map(item => ({
      label: item.name,
      value: item.name,
    }));

  const handleZipCode = async (event: ChangeEvent<HTMLInputElement>) => {
    const zipCode = event.target.value;
    setErrors(prev => ({ ...prev, 'realty.zipcode': '' }));
    if (zipCode.length === 9) {
      const response = await axios.get<ICEP>(`https://viacep.com.br/ws/${zipCode}/json/`);
      const { uf, localidade, bairro } = response.data;

      if (!bairro) {
        const neighborhoodResponse = await api.get<INeighborhoodData[]>('/neighborhood', {
          params: { uf, city: localidade },
        });
        setOptionsNeighborhood(createOptionsneighborhood(neighborhoodResponse.data));
        setIsFindingNeighborhood(false);
      } else {
        setIsFindingNeighborhood(true);
      }

      setForm(prev => ({
        ...prev,
        realty: {
          ...prev.realty,
          state: states[uf],
          city: localidade,
          neighborhood: bairro || '',
          zipcode: zipCode,
        },
      }));
      setSelectedUf(uf);
    } else {
      setIsFindingNeighborhood(true);
    }
  };

  const handleChange = (path: string) => (value: string) => {
    const [group, field] = path.split('.');
    if (group === 'realty') {
      setForm(prev => ({
        ...prev,
        realty: { ...prev.realty, [field]: value },
      }));
      return;
    }
    // para campos de nível raiz (ex.: builder)
    if (!field) {
      setForm(prev => ({ ...prev, [group]: value } as RealtyFormData));
      return;
    }
    setForm(prev => ({ ...prev, [field]: value } as RealtyFormData));
  };

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setErrors({});
      try {
        await schema.validate(form, { abortEarly: false });
        const { zipcode, ...restRealty } = form.realty;
        updateFormData({
          realty: {
            ...restRealty,
            state: selectedUf,
          },
          builder: form.builder,
        });
        nextStep();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const fieldErrors = getValidationErros(err);
          setErrors(fieldErrors);
        }
        toast.error('ERROR!, verifique as informações e tente novamente');
      }
    },
    [form, nextStep, selectedUf, updateFormData],
  );

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputControlled
          label="Empreendimento"
          name="enterprise"
          value={form.realty.enterprise}
          onChange={handleChange('realty.enterprise')}
          error={errors['realty.enterprise']}
        />
        <InputControlled
          name="zipcode"
          mask="zipcode"
          label="CEP"
          placeholder="00000-000"
          maxLength={9}
          value={form.realty.zipcode}
          onChange={value => {
            handleChange('realty.zipcode')(value);
            handleZipCode({ target: { value } } as any);
          }}
          error={errors['realty.zipcode']}
        />
        <FormRow>
          <InputControlled
            name="state"
            placeholder="Informe o estado"
            label="Estado"
            value={form.realty.state}
            readOnly
            error={errors['realty.state']}
          />
          <InputControlled
            name="city"
            label="Cidade"
            placeholder="Digite a cidade"
            value={form.realty.city}
            readOnly
            error={errors['realty.city']}
          />
        </FormRow>
        {isFindingNeighborhood ? (
          <InputControlled
            label="Bairro"
            name="neighborhood"
            placeholder="Bairro"
            value={form.realty.neighborhood}
            readOnly
            disabled={isFindingNeighborhood}
            error={errors['realty.neighborhood']}
          />
        ) : (
          <SelectControlled
            name="neighborhood"
            label="Bairro"
            placeholder="Informe o bairro"
            options={optionsNeighborhood}
            value={optionsNeighborhood.find(
              option => option.value === form.realty.neighborhood,
            )}
            onChange={option =>
              handleChange('realty.neighborhood')((option as any)?.value || '')
            }
            error={errors['realty.neighborhood']}
          />
        )}
        <SelectControlled
          name="property"
          label="Tipo de Imóvel"
          placeholder="Selecione o tipo do imóvel"
          options={optionsPropertyType}
          value={optionsPropertyType.find(option => option.value === form.realty.property)}
          onChange={option =>
            handleChange('realty.property')((option as any)?.value || '')
          }
          error={errors['realty.property']}
        />
        <InputControlled
          label="Unidade"
          name="unit"
          placeholder="Unidade"
          value={form.realty.unit}
          onChange={handleChange('realty.unit')}
          error={errors['realty.unit']}
        />
        <SelectControlled
          placeholder="Selecione a construtora"
          name="builder"
          options={optionBuilder}
          label="Construtora"
          value={optionBuilder.find(option => option.value === form.builder)}
          onChange={option => handleChange('builder')((option as any)?.value || '')}
          error={errors.builder}
        />
        <FormButtons>
          <Button type="reset" className="cancel">
            Cancelar
          </Button>
          <Button type="submit" className="next">
            Próximo
          </Button>
        </FormButtons>
      </form>
    </Container>
  );
};

export default RealtyFormNew;
