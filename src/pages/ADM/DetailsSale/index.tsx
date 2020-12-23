import React, {
  ChangeEvent,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';

import * as Yup from 'yup';

import { FormHandles } from '@unform/core';

import { BiEditAlt } from 'react-icons/bi';
import axios from 'axios';
import { Form } from '@unform/web';
import { BsCheckBox } from 'react-icons/bs';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { VscEdit } from 'react-icons/vsc';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdmLayout from '../../Layouts/Adm';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Modal from '../../../components/Modal';
import { Sync, Garb } from '../../../assets/images';
import { CPFMask, FoneMask } from '../../../utils/masked';
import { DateBRL, formatPrice } from '../../../utils/format';
import {
  Container,
  Content,
  SaleData,
  InputGroup,
  ButtonGroup,
  Legend,
  PaymentInstallments,
  Plot,
  AddButton,
  ButtonModal,
} from './styles';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import getValidationErros from '../../../utils/getValidationErros';

interface IBGECityResponse {
  nome: string;
}

interface IOptionsData {
  id: string;
  name: string;
}

interface IParamsData {
  id: string;
}

interface ISallers {
  name: string;
}
interface ISaleData {
  id: string;
  bonus?: string;
  builder: {
    id: string;
    name: string;
  };
  client_buyer: {
    civil_status: string;
    cpf: string;
    date_birth: string;
    email: string;
    gender: string;
    id: string;
    name: string;
    number_children: number;
    occupation: string;
    phone: string;
    whatsapp: string;
  };
  client_seller?: {
    civil_status: string;
    cpf: string;
    date_birth: string;
    email: string;
    gender: string;
    id: string;
    name: string;
    number_children: number;
    occupation: string;
    phone: string;
    whatsapp: string;
  };
  commission: string;
  company?: {
    id: string;
    name: string;
    percentage: number;
  };
  origin: {
    id: string;
    name: string;
  };
  payment_type: {
    id: string;
    name: string;
  };
  percentage_company: number;
  percentage_sale: number;
  realty: {
    city: string;
    enterprise: string;
    id: string;
    neighborhood: string;
    property: {
      id: string;
      name: string;
    };
    state: string;
    unit: string;
  };
  realty_ammount: string;
  sale_date: string;
  sale_has_captivators: Array<ISallers>;
  sale_has_sellers: Array<ISallers>;
  sale_type: string;
  status: string;
  user_coordinator?: {
    id: string;
    name: string;
  };

  users_directors: {
    id: string;
    name: string;
  }[];
}

interface IPlots {
  numberPlots: number;
  valuePlots: string;
  datePayment: string;
}

const DetailsSale: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const formModalRef = useRef<FormHandles>(null);
  const [token] = useState(localStorage.getItem('@TriunfoDigital:token'));
  const [uf] = useState(['MA', 'CE', 'PI']);
  const [edits, setEdits] = useState({
    property: true,
    buyer: true,
    builder: true,
    realtos: true,
    saller: true,
  });
  const [propertyType, setPropertyType] = useState<IOptionsData[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('MA');
  const [, setSelectedCity] = useState('0');
  const [sale, setSale] = useState<ISaleData>({} as ISaleData);
  const [sallers, setSallers] = useState<ISallers[]>([]);
  const [realtos, setRealtors] = useState<IOptionsData[]>([]);
  const [coordinator, setCoordinator] = useState<ISallers>({} as ISallers);
  const [captvators, setcaptavators] = useState<ISallers[] | null>(null);
  const [directors, setDirectors] = useState<ISallers[]>([]);
  const [plots, setPlots] = useState<IPlots[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const history = useHistory();
  const { userAuth } = useAuth();
  const { id } = useParams<IParamsData>();

  const { city } = userAuth.subsidiary;
  useEffect(() => {
    const plot = [{ numberPlots: 1, valuePlots: '', datePayment: '' }];
    setPlots(plot);
  }, []);
  useEffect(() => {
    const loadSale = async () => {
      try {
        const response = await api.get(`/sale/${id}`, {
          headers: {
            auhorization: `Bearer ${token}`,
          },
        });
        const sale = response.data;
        const sallers = sale.sale_has_sellers;
        const coordinator = sale.user_coordinator;
        const captavators = sale.sale_has_captivators;
        const directors = sale.users_directors;
        const cpfFormatted = CPFMask(sale.client_buyer.cpf);
        const dataFormatted = DateBRL(sale.client_buyer.date_birth);
        const foneFormatted = FoneMask(sale.client_buyer.phone);
        const realtyAmmount = formatPrice(sale.realty_ammount);
        const commission = formatPrice(sale.commission);
        const saleDate = DateBRL(sale.sale_date);
        const saleFormatted = Object.assign(
          sale,
          (sale.client_buyer.cpf = cpfFormatted),
          (sale.client_buyer.date_birth = dataFormatted),
          (sale.client_buyer.phone = foneFormatted),
          (sale.realty_ammount = realtyAmmount),
          (sale.commission = commission),
          (sale.sale_date = saleDate),
        );
        setSale(saleFormatted);
        setSallers(sallers);
        setCoordinator(coordinator);
        setcaptavators(captavators);
        setDirectors(directors);
        console.log(saleFormatted);
      } catch (error) {
        toast.error(
          'Conexão do servidor falhou ! entre em contato com o suporte',
        );
      }
    };
    const loadPropertyType = async () => {
      const response = await api.get('/property-type');
      setPropertyType(response.data);
    };
    const loadRealtos = async () => {
      const response = await api.get(`/users?city=${city}&office=Corretor`);
      setRealtors(response.data);
    };
    loadSale();
    loadRealtos();
    loadPropertyType();
  }, [token, id, sale.sale_type, city]);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
      )
      .then(response => {
        const cityNames = response.data.map(city => city.nome);
        setCities(cityNames);
      });
  }, [selectedUf]);

  useEffect(() => {
    formRef.current?.setData(sale);
  }, [sale]);

  const addPlots = useCallback(() => {
    const listPlots = plots.slice();
    const numberPlot = Number(formRef.current?.getFieldValue('number'));
    const valuePlot: string = formRef.current?.getFieldValue('value_plot');
    const datePlot: string = formRef.current?.getFieldValue('date_plot');

    if (listPlots[0].numberPlots === numberPlot) {
      listPlots[0].datePayment = datePlot;
      listPlots[0].valuePlots = valuePlot;
      listPlots.push({
        numberPlots: numberPlot + 1,
        datePayment: '',
        valuePlots: '',
      });
    } else {
      listPlots.push({
        numberPlots: numberPlot + 1,
        datePayment: '',
        valuePlots: '',
      });
    }
    setPlots(listPlots);
  }, [plots]);
  const removePlots = useCallback(() => {
    const listPlots = plots.slice();
    listPlots.pop();

    setPlots(listPlots);
  }, [plots]);

  const handleEdit = useCallback(
    (stepForm: string): void => {
      switch (stepForm) {
        case 'property':
          setEdits({ ...edits, property: !edits.property });
          break;
        case 'buyer':
          setEdits({ ...edits, buyer: !edits.buyer });
          break;
        case 'realtors':
          setEdits({ ...edits, realtos: !edits.realtos });
          break;
        default:
          break;
      }
    },
    [edits],
  );
  const handleSelectedUF = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const state = event.target.value;
      setSelectedUf(state);
    },
    [],
  );

  const handleSelectCity = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const city = event.target.value;
      setSelectedCity(city);
    },
    [],
  );

  const handleFall = useCallback(
    async (id: string) => {
      try {
        await api.patch(`/sale/not-valid/${id}`);
        toast.success('Atualização Realizada');
        history.push('/adm/lista-vendas');
      } catch (err) {
        console.log(err);
      }
    },
    [history],
  );

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onClose = () => {
    setIsModalVisible(false);
  };

  const handleModalSubmit = async () => {
    const data = formModalRef.current?.getData();
    try {
      formModalRef.current?.setErrors({});

      const schema = Yup.object({
        installment: Yup.array().of(
          Yup.object().shape({
            value: Yup.string().required('Informe o valor da parcela'),
            due_date: Yup.string().required('Informe a data de vencimento'),
          }),
        ),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      await api.patch(`sale/valid/${id}`, data);
      toast.success('Parcelas adicionadas!');
      onClose();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formModalRef.current?.setErrors(erros);
      }

      toast.error('ERROR ao adicionar as parcela!');
    }
  };
  const optionsState = uf.map(u => ({
    label: u,
    value: u,
  }));
  const optionsCity = cities.map(city => ({
    label: city,
    value: city,
  }));
  const optionsTypeImobille = propertyType.map(property => ({
    value: property.id,
    label: property.name,
  }));

  const optionsRealtors = realtos.map(realtor => ({
    label: realtor.name,
    value: realtor.id,
  }));

  const optionsEstadoCivil = [
    { label: 'Casado(a)', value: 'CASADO(A)' },
    { label: 'Solteiro(a)', value: 'SOLTEIRO(A)' },
    { label: 'Divorciado(a)', value: 'DIVORCIADO(A)' },
    { label: 'Viúvo(a)', value: 'VIUVO(A)' },
  ];

  const optionsGenero = [
    { label: 'Masculino', value: 'MASCULINO' },
    { label: 'Femenino', value: 'FEMENINO' },
  ];

  return (
    <AdmLayout>
      <Container>
        <h1>DETALHES DA VENDA</h1>
        <Content>
          <Form ref={formRef} onSubmit={() => console.log('ok')}>
            <SaleData>
              <fieldset className="login">
                <Legend>
                  <legend>IMÓVEL</legend>
                  <button type="button" onClick={() => handleEdit('property')}>
                    <BiEditAlt size={20} color="#C32925" />
                    <span>editar</span>
                  </button>
                </Legend>

                <Input
                  label="Empreendimento"
                  name="realty.enterprise"
                  placeholder="Empreendimento"
                  readOnly={edits.property}
                />
                <InputGroup>
                  <Select
                    name="realty.state"
                    nameLabel="Estado"
                    options={optionsState}
                    onChange={handleSelectedUF}
                    disabled={edits.property}
                  />
                  <Select
                    name="realty.city"
                    nameLabel="Cidade"
                    options={optionsCity}
                    onChange={handleSelectCity}
                    disabled={edits.property}
                  />
                </InputGroup>
                <Input
                  label="Bairro"
                  name="realty.neighborhood"
                  placeholder="Bairro"
                  readOnly={edits.property}
                />
                <InputGroup>
                  <Select
                    name="realty.property.id"
                    nameLabel="Tipo de Imóvel"
                    options={optionsTypeImobille}
                    disabled={edits.property}
                  />

                  <Input
                    label="Unidade"
                    name="realty.unit"
                    placeholder="Unidade"
                    readOnly={edits.property}
                  />
                </InputGroup>
              </fieldset>
            </SaleData>
            <SaleData>
              <fieldset className="login">
                <Legend>
                  <legend>COMPRADOR</legend>
                  <button type="button" onClick={() => handleEdit('buyer')}>
                    <BiEditAlt size={20} color="#C32925" />
                    <span>editar</span>
                  </button>
                </Legend>
                <Input
                  label="Nome Completo"
                  name="client_buyer.name"
                  placeholder="Nome Completo"
                  readOnly={edits.buyer}
                />
                <InputGroup>
                  <Input
                    label="CPF"
                    name="client_buyer.cpf"
                    placeholder="CPF"
                    readOnly={edits.buyer}
                  />
                  <Input
                    label="Data de Nascimento"
                    name="client_buyer.date_birth"
                    placeholder="Data de Nascimento"
                    readOnly={edits.buyer}
                  />
                </InputGroup>
                <InputGroup>
                  <Input
                    label="Telefone"
                    name="client_buyer.phone"
                    placeholder="Telefone"
                    readOnly={edits.buyer}
                  />
                  <Input
                    label="E-mail"
                    name="client_buyer.email"
                    type="email"
                    placeholder="E-mail"
                    readOnly={edits.buyer}
                  />
                </InputGroup>
                <InputGroup>
                  <Select
                    nameLabel="Estado Civíl"
                    name="client_buyer.civil_status"
                    options={optionsEstadoCivil}
                    disabled={edits.buyer}
                  />
                  <Select
                    nameLabel="Gênero"
                    name="client_buyer.gender"
                    options={optionsGenero}
                    disabled={edits.buyer}
                  />
                  <Input
                    label="Numero de Filhos"
                    name="client_buyer.number_children"
                    placeholder="Número de filhos"
                    readOnly={edits.buyer}
                  />
                </InputGroup>
              </fieldset>
            </SaleData>
            {sale.sale_type === 'NOVO' && (
              <SaleData>
                <fieldset className="login">
                  <Legend>
                    <legend>CONSTRUTORA</legend>
                  </Legend>
                  <Input name="builder.name" readOnly />
                </fieldset>
              </SaleData>
            )}
            {sale.sale_type === 'USADO' && (
              <SaleData>
                <fieldset className="login">
                  <Legend>
                    <legend>VENDEDORES</legend>
                    <button type="button" onClick={() => handleEdit('buyer')}>
                      <BiEditAlt size={20} color="#C32925" />
                      <span>editar</span>
                    </button>
                  </Legend>
                  <Input
                    label="Nome Completo"
                    name="client_saller.name"
                    placeholder="Nome Completo"
                  />
                  <InputGroup>
                    <Input
                      label="CPF"
                      name="client_saller.cpf"
                      placeholder="CPF"
                    />
                    <Input
                      label="Data de Nascimento"
                      name="client_saller.date_birth"
                      placeholder="Data de Nascimento"
                    />
                  </InputGroup>
                  <InputGroup>
                    <Input
                      label="Telefone"
                      name="client_saller.phone"
                      placeholder="Telefone"
                    />
                    <Input
                      label="E-mail"
                      name="client_saller.email"
                      type="email"
                      placeholder="E-mail"
                    />
                  </InputGroup>
                  <InputGroup>
                    <Select
                      nameLabel="Estado Civíl"
                      name="client_buyer.civil_status"
                      options={optionsEstadoCivil}
                      disabled={edits.buyer}
                    />
                    <Select
                      nameLabel="Gênero"
                      name="client_buyer.gender"
                      options={optionsGenero}
                      disabled={edits.buyer}
                    />
                    <Input
                      label="Numero de Filhos"
                      name="client_saller.number_children"
                      placeholder="Número de filhos"
                    />
                  </InputGroup>
                </fieldset>
              </SaleData>
            )}

            <SaleData>
              <fieldset className="login">
                <Legend>
                  <legend>CORRETOES</legend>
                  <button type="button" onClick={() => handleEdit('realtors')}>
                    <BiEditAlt size={20} color="#C32925" />
                    <span>editar</span>
                  </button>
                </Legend>
                {sallers.map((saller, index) => (
                  <Select
                    key={saller.name}
                    nameLabel={
                      sallers.length === 1
                        ? 'Corretor Vendedor'
                        : `Vendedor ${index + 1}`
                    }
                    name={`sale_has_sellers[${index}].id`}
                    options={optionsRealtors}
                    disabled={edits.realtos}
                  />
                ))}
                {sale.sale_type === 'USADO' &&
                  captvators &&
                  captvators?.map((cap, index) => (
                    <Input
                      key={cap.name}
                      label={
                        captvators.length === 1
                          ? 'Corretor Captador'
                          : `Captador ${index + 1}`
                      }
                      name={`sale_has_captivators[${index}].name`}
                      placeholder="Corretor Vendedor"
                      readOnly={edits.realtos}
                    />
                  ))}
                {coordinator && (
                  <Input name="user_coordinator.name" label="Coordenador" />
                )}
                {directors.map((director, index) => (
                  <Input
                    key={director.name}
                    label="Diretor"
                    name={`users_directors[${index}].name`}
                    placeholder="Diretor"
                    readOnly
                  />
                ))}
              </fieldset>
            </SaleData>
            <SaleData>
              <fieldset className="login">
                <Legend>
                  <legend>FINANÇAS</legend>
                  <button type="button" onClick={() => handleEdit('realtors')}>
                    <BiEditAlt size={20} color="#C32925" />
                    <span>editar</span>
                  </button>
                </Legend>
                <InputGroup>
                  <Input
                    mask="currency"
                    name="realty_ammount"
                    label="Valor da Venda"
                  />
                  <Input mask="date" name="sale_date" label="Data da Venda" />
                </InputGroup>
                <InputGroup>
                  <Input
                    mask="porcent"
                    name="percentage_sale"
                    label="(%) da Venda"
                  />
                  <Input mask="currency" name="commission" label="Comissão" />
                </InputGroup>
                <InputGroup className="paymment_form_container">
                  <Input
                    name="payment_type.name"
                    label="Forma de Pagamento"
                    className="paymment_form"
                  />
                  <div>
                    <ButtonModal type="button" onClick={showModal}>
                      <VscEdit size={20} color="#C32925" />
                      <span>Detalhes de pagamento</span>
                    </ButtonModal>
                  </div>
                </InputGroup>
                {isModalVisible ? (
                  <Modal
                    onSubmit={handleModalSubmit}
                    title="Detalhes de Pagamento"
                    onClose={onClose}
                  >
                    <Form ref={formModalRef} onSubmit={handleModalSubmit}>
                      <PaymentInstallments>
                        {plots.map((plot, index) =>
                          index === 0 ? (
                            <Plot key={plot.numberPlots}>
                              <Input
                                type="number"
                                name={`installments[${index}].installment_number`}
                                label="Parcela"
                                min={1}
                                readOnly
                                defaultValue={index + 1}
                              />
                              <Input
                                mask="currency"
                                name={`installments[${index}].value`}
                                label="Valor da Parcela"
                                placeholder="R$ 0,00"
                              />
                              <Input
                                mask="date"
                                name={`installments[${index}].due_date`}
                                label="Data de Vencimento"
                                placeholder="07/01/2021"
                              />
                              <AddButton type="button" onClick={addPlots}>
                                <FaPlus size={20} color="#C32925" />
                              </AddButton>
                            </Plot>
                          ) : (
                            <Plot key={plot.numberPlots}>
                              <Input
                                type="number"
                                name={`installments[${index}].installment_number`}
                                label="Parcela"
                                min={1}
                                readOnly
                                defaultValue={index + 1}
                              />
                              <Input
                                mask="currency"
                                name={`installments[${index}].value`}
                                label="Valor da Parcela"
                                placeholder="R$ 0,00"
                              />
                              <Input
                                mask="date"
                                name={`installments[${index}].due_date`}
                                label="Data de Pagamento"
                                placeholder="07/01/2021"
                              />

                              <AddButton type="button" onClick={removePlots}>
                                <FaMinus size={20} color="#C32925" />
                              </AddButton>
                            </Plot>
                          ),
                        )}
                      </PaymentInstallments>
                    </Form>
                  </Modal>
                ) : null}
              </fieldset>
            </SaleData>

            <ButtonGroup>
              <button type="button">
                <Sync />
                <span>Atualizar</span>
              </button>
              <button type="button" onClick={() => handleFall(sale.id)}>
                <Garb />
                <span>Caiu</span>
              </button>
            </ButtonGroup>

            <button type="submit" className="submit">
              <BsCheckBox size={25} />
              <span>Validar Venda</span>
            </button>
          </Form>
        </Content>
      </Container>
    </AdmLayout>
  );
};

export default DetailsSale;
