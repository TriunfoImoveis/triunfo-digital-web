import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useForm } from '../../../context/FormContext';
import getValidationErros from '../../../utils/getValidationErros';
import Select from '../../FormControls/SelectControlled';
import Button from '../../Button';
import {
  Container,
  InputGroup,
  ButtonGroup,
  UserSallersContainer,
  UserCaptivators,
  Directors,
  Coordinator,
} from './styles';
import api from '../../../services/api';
import InputDisabled from '../../InputDisabled';

interface ISaleNewData {
  nextStep: () => void;
  prevStep: () => void;
  typeSale: 'new' | 'used';
}

interface IOptions {
  id: string;
  name: string;
}

interface ISubsidiaries {
  id: string;
  name: string;
}

const Step3: React.FC<ISaleNewData> = ({ nextStep, prevStep, typeSale }) => {
  const { updateFormData, formData } = useForm();
  const [loading, setLoading] = useState(false);
  const [allRealtors, setAllRealtors] = useState<IOptions[]>([]);
  const [cordinators, setCoordinators] = useState<IOptions[]>([]);
  const [directors, setDirectors] = useState<IOptions[]>([]);
  const [subsidiaries, setSubsidiaries] = useState<ISubsidiaries[]>([]);
  const [isCoordinatorExist, setIsCoordinatorExist] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState(() => ({
    subsidiary: formData.subsidiary || '',
    users_sellers: formData.users_sellers?.map((u: any) => u.id) || [],
    users_captivators: formData.users_captivators?.map((u: any) => u.id) || [],
    users_directors: formData.users_directors?.map((u: any) => u.id) || [],
    user_coordinator: formData.user_coordinator || '',
  }));

  useEffect(() => {
    const loadAllOptions = async () => {
      const [
        responseRealtors,
        responseCoordinators,
        responseDirectors,
        responseSubsidiary,
      ] = await Promise.all([
        api.get(`/users?departament=Comercial`),
        api.get(`/users?office=Coordenador`),
        api.get(`/users?office=Diretor`),
        api.get(`/subsidiary`),
      ]);
      setAllRealtors(responseRealtors.data);
      setCoordinators(responseCoordinators.data);
      setDirectors(responseDirectors.data);
      setSubsidiaries(responseSubsidiary.data);
    };
    loadAllOptions();
  }, []);

  const optionsCoordenador = useMemo(
    () =>
      cordinators.map(coordinator => ({
        label: coordinator.name,
        value: coordinator.id,
      })),
    [cordinators],
  );

  const optionsCaptvators = useMemo(
    () => allRealtors.map(cap => ({ label: cap.name, value: cap.id })),
    [allRealtors],
  );
  const optionsAllRealtors = useMemo(
    () => allRealtors.map(all => ({ label: all.name, value: all.id })),
    [allRealtors],
  );

  const optionsAllDirectores = useMemo(
    () =>
      directors.map(director => ({ label: director.name, value: director.id })),
    [directors],
  );

  const optionsSubsidiaries = useMemo(
    () =>
      subsidiaries.map(subsidiary => ({
        label: subsidiary.name,
        value: subsidiary.id,
      })),
    [subsidiaries],
  );

  const clearError = useCallback((field: string) => {
    setErrors(prev => ({ ...prev, [field]: '' }));
  }, []);

  const handleNotCoordinator = () => {
    setIsCoordinatorExist(prev => !prev);
    if (isCoordinatorExist) {
      setForm(prev => ({ ...prev, user_coordinator: '' }));
    }
  };

  const handleChange = (field: string) => (value: any) => {
    clearError(field);
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = useCallback(
    async (data: typeof form) => {
      const payload = {
        ...data,
      };

      const validationSchema =
        typeSale === 'new'
          ? Yup.object().shape({
              subsidiary: Yup.string().required('Filial obrigatória'),
              users_sellers: Yup.array()
                .of(Yup.string().required())
                .min(1, 'Vendedor(es) Obrigatório'),
              user_coordinator: Yup.string().nullable(),
              users_directors: Yup.array()
                .of(Yup.string().required())
                .min(1, 'Diretor obrigatório')
                .max(2, 'No máximo dois diretores'),
            })
          : Yup.object().shape({
              subsidiary: Yup.string().required('Filial obrigatória'),
              users_sellers: Yup.array()
                .of(Yup.string().required())
                .min(1, 'Vendedor Obrigatório'),
              users_captivators: Yup.array()
                .of(Yup.string().required())
                .min(1, 'Captador Obrigatório'),
              user_coordinator: Yup.string().nullable(),
              users_directors: Yup.array()
                .of(Yup.string().required())
                .min(1, 'Diretor obrigatório')
                .max(2, 'No máximo dois diretores'),
            });

      try {
        setLoading(true);
        await validationSchema.validate(payload, { abortEarly: false });
        const formatted: any = {
          subsidiary: payload.subsidiary,
          users_sellers: payload.users_sellers.map((id: string) => ({ id })),
          users_directors: payload.users_directors.map((id: string) => ({
            id,
          })),
          user_coordinator:
            payload.user_coordinator !== '' ? payload.user_coordinator : null,
        };
        if (typeSale === 'used' && Array.isArray(payload.users_captivators)) {
          formatted.users_captivators = payload.users_captivators.map(
            (id: string) => ({ id }),
          );
        }
        updateFormData(formatted);
        nextStep();
        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err);
          setErrors(erros);
        }
        toast.error('ERROR!, verifique as informações e tente novamente');
        setLoading(false);
      }
    },
    [form, nextStep, typeSale, updateFormData],
  );

  return (
    <Container>
      <form
        onSubmit={event => {
          event.preventDefault();
          handleSubmit(form);
        }}
      >
        <Select
          name="subsidiary"
          options={optionsSubsidiaries}
          label="Filial da Venda"
          placeholder="Filial Maranhão"
          value={optionsSubsidiaries.find(opt => opt.value === form.subsidiary)}
          onChange={option =>
            handleChange('subsidiary')((option as any)?.value || '')
          }
          error={errors.subsidiary}
        />
        {typeSale === 'new' && (
          <>
            <Select
              name="users_sellers"
              options={optionsAllRealtors}
              label="Corretor Vendedor"
              placeholder="Informe o(s) corretor(es)"
              isMulti
              value={optionsAllRealtors.filter(opt =>
                Array.isArray(form.users_sellers)
                  ? form.users_sellers.includes(opt.value)
                  : false,
              )}
              onChange={option =>
                handleChange('users_sellers')(
                  Array.isArray(option)
                    ? option.map(o => (o as any).value)
                    : [],
                )
              }
              error={errors.users_sellers}
            />
            <Coordinator>
              {isCoordinatorExist ? (
                <Select
                  name="user_coordinator"
                  placeholder="Selecione o coordenador"
                  options={optionsCoordenador}
                  label="Coordenador"
                  value={optionsCoordenador.find(
                    opt => opt.value === form.user_coordinator,
                  )}
                  onChange={option =>
                    handleChange('user_coordinator')(
                      (option as any)?.value || '',
                    )
                  }
                  error={errors.user_coordinator}
                />
              ) : (
                <InputDisabled label="Coordenador" data="Nenhum" />
              )}

              <div className="not-coordinator">
                <input
                  type="checkbox"
                  name="not-coordinators"
                  id="not-coordinators"
                  onChange={handleNotCoordinator}
                  checked={!isCoordinatorExist}
                />
                <label htmlFor="not-coordinators">Não Possui Coordenação</label>
              </div>
            </Coordinator>
            <Directors>
              <Select
                name="users_directors"
                placeholder="Selecione os diretores"
                options={optionsAllDirectores}
                label="Diretor(es)"
                isMulti
                value={optionsAllDirectores.filter(opt =>
                  Array.isArray(form.users_directors)
                    ? form.users_directors.includes(opt.value)
                    : false,
                )}
                onChange={option =>
                  handleChange('users_directors')(
                    Array.isArray(option)
                      ? option.map(o => (o as any).value)
                      : [],
                  )
                }
                error={errors.users_directors}
              />
            </Directors>
          </>
        )}
        {typeSale === 'used' && (
          <>
            <InputGroup>
              <UserSallersContainer>
                <Select
                  name="users_sellers"
                  options={optionsAllRealtors}
                  label="Corretor Vendedor"
                  placeholder="Informe o corretor(es)"
                  isMulti
                  value={optionsAllRealtors.filter(opt =>
                    Array.isArray(form.users_sellers)
                      ? form.users_sellers.includes(opt.value)
                      : false,
                  )}
                  onChange={option =>
                    handleChange('users_sellers')(
                      Array.isArray(option)
                        ? option.map(o => (o as any).value)
                        : [],
                    )
                  }
                  error={errors.users_sellers}
                />
              </UserSallersContainer>

              <UserCaptivators>
                <Select
                  name="users_captivators"
                  options={optionsCaptvators}
                  label="Corretor Captador"
                  isMulti
                  placeholder="Informe o(s) Captador(es)"
                  value={optionsCaptvators.filter(opt =>
                    Array.isArray(form.users_captivators)
                      ? form.users_captivators.includes(opt.value)
                      : false,
                  )}
                  onChange={option =>
                    handleChange('users_captivators')(
                      Array.isArray(option)
                        ? option.map(o => (o as any).value)
                        : [],
                    )
                  }
                  error={errors.users_captivators}
                />
              </UserCaptivators>
            </InputGroup>
            <>
              <Coordinator>
                {isCoordinatorExist ? (
                  <Select
                    name="user_coordinator"
                    placeholder="Selecione o coordenador"
                    options={optionsCoordenador}
                    label="Coordenador"
                    value={optionsCoordenador.find(
                      opt => opt.value === form.user_coordinator,
                    )}
                    onChange={option =>
                      handleChange('user_coordinator')(
                        (option as any)?.value || '',
                      )
                    }
                    error={errors.user_coordinator}
                  />
                ) : (
                  <InputDisabled label="Coordenador" data="Nenhum" />
                )}

                <div className="not-coordinator">
                  <input
                    type="checkbox"
                    name="not-coordinators"
                    id="not-coordinators"
                    onChange={handleNotCoordinator}
                    checked={!isCoordinatorExist}
                  />
                  <label htmlFor="not-coordinators">
                    Não Possui Coordenação
                  </label>
                </div>
              </Coordinator>
            </>
            <Directors>
              <Select
                name="users_directors"
                placeholder="Selecione os diretores"
                options={optionsAllDirectores}
                label="Diretores"
                isMulti
                value={optionsAllDirectores.filter(opt =>
                  Array.isArray(form.users_directors)
                    ? form.users_directors.includes(opt.value)
                    : false,
                )}
                onChange={option =>
                  handleChange('users_directors')(
                    Array.isArray(option)
                      ? option.map(o => (o as any).value)
                      : [],
                  )
                }
                error={errors.users_directors}
              />
            </Directors>
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
      </form>
    </Container>
  );
};

export default Step3;
