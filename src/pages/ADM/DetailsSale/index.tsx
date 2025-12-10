/* eslint-disable array-callback-return */
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
import { Form } from '@unform/web';
import { BsCheck } from 'react-icons/bs';
import { FaCheck, FaMinus, FaPlus } from 'react-icons/fa';
import { VscEdit } from 'react-icons/vsc';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdmLayout from '../../Layouts/Adm';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Modal from '../../../components/Modal';
import { Sync, Garb } from '../../../assets/images';
import { CPFMask, FoneMask, money } from '../../../utils/masked';
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
  ModalFooter,
  ContentFallForm,
  BonusConatainer,
} from './styles';
import api from '../../../services/api';
import getValidationErros from '../../../utils/getValidationErros';
import { DateYMD, unMaked, currency } from '../../../utils/unMasked';
import TextArea from '../../../components/TextArea';
import CheckboxInput from '../../../components/CheckBox';
import InputDisable from '../../../components/InputDisabled';
import { useAuth } from '../../../context/AuthContext';

interface IOptionsData {
  id: string;
  name: string;
  description?: string;
}

interface IParamsData {
  id: string;
}

interface ISallers {
  name: string;
}
interface ICoordinator {
  id: string;
  name: string;
}
interface ISaleData {
  id: string;
  bonus?: string;
  builder: {
    id: string;
    name: string;
  };
  client_buyer: IClient;
  installments: {
    due_date: string;
    id: string;
    installment_number: number;
    value: string;
  }[];
  client_seller?: IClient;
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
  payment_type: IPaymentType;
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

  value_signal?: string | null;
  payment_signal: boolean;
  pay_date_signal?: string | null;
}

interface IBuilder {
  id: string;
  name: string;
}

interface IPaymentType {
  id: string;
  name: string;
}
interface IInstallments {
  due_date: string;
  id?: string;
  installment_number: number;
  value: string;
  status?: 'PAGO' | 'PENDENTE';
  pay_date?: string;
}

interface IRealty {
  city: string;
  enterprise: string;
  id: string;
  neighborhood: string;
  property: ITypeProperty;
  state: string;
  unit: string;
}

interface ITypeProperty {
  id: string;
  name: string;
}

interface IClient {
  civil_status: string;
  cpf: string;
  date_birth: string;
  email: string;
  gender: string;
  id: string;
  name: string;
  number_children: string;
  occupation: string;
  phone: string;
  whatsapp: string;
}
interface IInstallmentsData {
  installments: {
    installment_number: string;
    value: string;
    due_date: string;
  }[];
}

const DetailsSale: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const formModalRef = useRef<FormHandles>(null);
  const formModalFallRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [token] = useState(localStorage.getItem('@TriunfoDigital:token'));
  const [uf] = useState(['MA', 'CE', 'PI']);
  const [edits, setEdits] = useState({
    property: true,
    buyer: true,
    builder: true,
    realtos: true,
    seller: true,
    fall: true,
    money: true,
  });
  const [propertyType, setPropertyType] = useState<IOptionsData[]>([]);
  const [motivies, setMotivies] = useState<IOptionsData[]>([]);
  const [, setSelectedUf] = useState('MA');
  const [sale, setSale] = useState<ISaleData>({} as ISaleData);
  const [sallers, setSallers] = useState<ISallers[]>([]);
  const [realtos, setRealtors] = useState<IOptionsData[]>([]);
  const [realty, setRealty] = useState({} as IRealty);
  const [paymentType, setPaymentType] = useState({} as IPaymentType);
  const [paymentTypes, setPaymentTypes] = useState<IPaymentType[]>([]);
  const [typeProperty, setTypePrperty] = useState({} as ITypeProperty);
  const [clientBuyer, setClientBuyer] = useState({} as IClient);
  const [clientSaller, setClientSeller] = useState({} as IClient);
  const [coordinator, setCoordinator] = useState<ICoordinator>(
    {} as ICoordinator,
  );
  const [captvators, setcaptavators] = useState<ISallers[] | null>(null);
  const [directors, setDirectors] = useState<ISallers[]>([]);
  const [builder, setBuilder] = useState<IBuilder>({} as IBuilder);
  const [builders, setBuilders] = useState<IBuilder[]>([]);
  const [coordinators, setCoordinators] = useState<ICoordinator[]>([]);
  const [comissionValue, setcomissionValue] = useState(sale.commission);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVisibleModalFall, setIsVisibleModalFall] = useState(false);
  const [installments, setInstallments] = useState<IInstallments[]>([]);
  const [installmentsPay, setInstallmentsPay] = useState<IInstallments[]>([]);
  const [companies, setCompanies] = useState<IOptionsData[]>([]);
  const [isNFRequired, setIsNFRequired] = useState(false);
  const history = useHistory();
  const { id } = useParams<IParamsData>();
  const { userAuth } = useAuth();

  useEffect(() => {
    const loadCompany = async () => {
      const response = await api.get('/company');
      setCompanies(response.data);
    };

    loadCompany();
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
        if (sale.client_seller.cpf.length > 0) {
          const cpfSellerFormatted = CPFMask(sale.client_seller.cpf);
          const dataSellerFormatted = DateBRL(sale.client_seller.date_birth);
          const foneSellerFormatted = FoneMask(sale.client_seller.phone);
          Object.assign(
            sale,
            (sale.client_seller.cpf = cpfSellerFormatted),
            (sale.client_seller.date_birth = dataSellerFormatted),
            (sale.client_seller.phone = foneSellerFormatted),
          );
        }
        const cpfFormatted = CPFMask(sale.client_buyer.cpf);
        const dataFormatted = DateBRL(sale.client_buyer.date_birth);
        const foneFormatted = FoneMask(sale.client_buyer.phone);
        const realtyAmmount = formatPrice(sale.realty_ammount);
        const commission = formatPrice(sale.commission);
        const saleDate = DateBRL(sale.sale_date);
        const valueSignal = formatPrice(sale.value_signal);
        const PayDateSignal = DateBRL(sale.pay_date_signal);
        const installmentData = sale.installments;
        const newInstallments = installmentData.map(i => ({
          ...i,
          due_date: DateBRL(i.due_date),
          value: formatPrice(Number(i.value)),
          pay_date: i.pay_date ? DateBRL(i.pay_date) : null,
        }));

        const saleFormatted = Object.assign(
          sale,
          (sale.client_buyer.cpf = cpfFormatted),
          (sale.client_buyer.date_birth = dataFormatted),
          (sale.client_buyer.phone = foneFormatted),
          (sale.realty_ammount = realtyAmmount),
          (sale.commission = commission),
          (sale.sale_date = saleDate),
          (sale.pay_date_signal = PayDateSignal),
          (sale.value_signal = valueSignal),
        );
        const newSaleFormatted: ISaleData = {
          ...saleFormatted,
          installments: newInstallments,
        };
        const installmentPay = newInstallments.filter(
          installment => installment.status === 'PAGO',
        );
        setInstallments(newInstallments);
        setInstallmentsPay(installmentPay);
        setRealty(sale.realty);
        setSale(newSaleFormatted);
        setTypePrperty(sale.realty.property);
        setClientBuyer(sale.client_buyer);
        setClientSeller(sale.client_seller);
        setPaymentType(sale.payment_type);
        setBuilder(sale.builder);
        setSallers(sallers);
        setCoordinator(coordinator);
        setcaptavators(captavators);
        setDirectors(directors);
      } catch (error) {
        toast.error(
          'Não Consegui carregar os dados da venda ! entre em contato com o suporte',
        );
      }
    };
    const loadPropertyType = async () => {
      const response = await api.get('/property-type');
      setPropertyType(response.data);
    };
    const loadRealtos = async () => {
      const response = await api.get(`/users?departament=Comercial`);
      setRealtors(response.data);
    };
    const loadMotivies = async () => {
      try {
        const response = await api.get('/motive');
        setMotivies(response.data);
      } catch (error) {
        toast.error('Falha na conexão com o servidor contate o suporte');
      }
    };
    const loadBuilder = async () => {
      const response = await api.get(`/builder?uf=${realty.state}`);
      setBuilders(response.data);
    };
    const loadCoordinator = async () => {
      const response = await api.get(`/users?office=Coordenador`);
      setCoordinators(response.data);
    };
    const loadPaymmentType = async () => {
      if (sale.sale_type === 'NOVO') {
        const response = await api.get('/payment-type?type=NOVO');
        setPaymentTypes(response.data);
      } else if (sale.sale_type === 'USADO') {
        const response = await api.get(`/payment-type?type=USADO`);
        setPaymentTypes(response.data);
      }
    };
    loadSale();
    loadRealtos();
    loadPropertyType();
    loadMotivies();
    loadBuilder();
    loadCoordinator();
    loadPaymmentType();
  }, [token, id, sale.sale_type, realty.state]);

  useEffect(() => {
    formRef.current?.setData(sale);
  }, [sale]);

  const calcComission = useCallback(() => {
    const valueSale = formRef.current?.getFieldValue('realty_ammount');
    const portcent = formRef.current?.getFieldValue('percentage_sale');
    const comission = currency(valueSale) * (currency(portcent) / 100);
    setcomissionValue(money(comission));
  }, []);

  const addPlots = useCallback(() => {
    const listPlots = installments.slice();
    const numberPlot = Number(
      formRef.current?.getFieldValue(
        `installments[${installments.length - 1}].installment_number`,
      ),
    );

    listPlots.push({
      installment_number: numberPlot + 1,
      due_date: '',
      value: '',
    });
    setInstallments(listPlots);
  }, [installments]);
  const removePlots = useCallback(() => {
    const listPlots = installments.slice();
    listPlots.pop();

    setInstallments(listPlots);
  }, [installments]);

  const handleValidSale = useCallback(async () => {
    try {
      await api.patch(`/sale/valid/${id}`, {
        headers: {
          authorization: `Token ${token}`,
        },
      });
      toast.success('Venda Validada com sucesso !');
      history.push('/ranking');
    } catch (error) {
      if (error.response) {
        toast.error(`${error.response.data.message}`);
      } else if (error.request) {
        toast.error(
          'Erro de Conexão!! tente recarregar a página, se não der certo contate o suporte',
        );
      } else {
        toast.error(' Erro desconhecido, contate o suporte');
      }
    }
  }, [id, token, history]);

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
        case 'seller':
          setEdits({ ...edits, seller: !edits.seller });
          break;
        case 'fall':
          setEdits({ ...edits, fall: false });
          break;
        case 'money':
          setEdits({ ...edits, money: !edits.money });
          break;
        case 'builder':
          setEdits({ ...edits, builder: !edits.builder });
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

  // const handleSelectCity = useCallback(
  //   (event: ChangeEvent<HTMLSelectElement>) => {
  //     const city = event.target.value;
  //     setSelectedCity(city);
  //   },
  //   [],
  // );

  const handleFall = useCallback(
    async data => {
      formModalFallRef.current?.setErrors({});
      try {
        const schema = Yup.object({
          motive: Yup.string().required('Selecione um Motivo'),
        });
        await schema.validate(data, { abortEarly: false });
        await api.patch(`/sale/not-valid/${id}`, data);
        toast.success('Atualização Realizada');
        history.push('/adm/lista-vendas');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err);
          formModalRef.current?.setErrors(erros);
        }

        toast.error('ERROR ao validar os motivos da queda!');
      }
    },
    [history, id],
  );

  const handleSelectAnotherMotive = useCallback(
    async (e: ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      const response = await api.get('/motive');
      const motives = response.data;
      const motive = motives.filter(motive => {
        if (motive.description === 'Outro Motivo') {
          return { motive };
        }
      });
      motive.map(m =>
        value === m.id
          ? handleEdit('fall')
          : setEdits({ ...edits, fall: true }),
      );
      return;
    },
    [handleEdit, edits],
  );

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const showModalFall = () => {
    setIsVisibleModalFall(!isVisibleModalFall);
  };

  const onClose = () => {
    setIsModalVisible(false);
  };
  const onCloseFall = () => {
    setIsVisibleModalFall(false);
  };

  const handleModalSubmit = async (data: IInstallmentsData) => {
    formModalRef.current?.setErrors({});
    try {
      const schema = Yup.object({
        installments: Yup.array().of(
          Yup.object().shape({
            value: Yup.string().required('Informe o valor da parcela'),
            due_date: Yup.string().required('Informe a data de vencimento'),
          }),
        ),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const installments = data.installments.map(installment => ({
        installment_number: installment.installment_number,
        value: unMaked(installment.value),
        due_date: DateYMD(installment.due_date),
      }));
      const newData = { installments };
      await api.post(`installment/${id}`, newData, {
        headers: {
          authorization: `Token ${token}`,
        },
      });
      toast.success('Parcelas adicionadas!');
      onClose();
      window.location.reload();
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
  const optionsPaymentType = paymentTypes.map(pt => ({
    label: pt.name,
    value: pt.id,
  }));
  const optionsTypeImobille = propertyType.map(property => ({
    value: property.id,
    label: property.name,
  }));

  const optionsEmpresa = companies.map(company => ({
    value: company.id,
    label: company.name,
  }));

  const optionsRealtors = realtos.map(realtor => ({
    label: realtor.name,
    value: realtor.id,
  }));

  const optionsBonus = [
    { id: '1', label: 'Sim', value: 'Y' },
    { id: '2', label: 'Não', value: 'N' },
  ];

  const optionsEstadoCivil = [
    { label: 'Casado(a)', value: 'CASADO(A)' },
    { label: 'Solteiro(a)', value: 'SOLTEIRO(A)' },
    { label: 'Divorciado(a)', value: 'DIVORCIADO(A)' },
    { label: 'Viúvo(a)', value: 'VIUVO(A)' },
  ];

  const optionsGenero = [
    { label: 'Masculino', value: 'MASCULINO' },
    { label: 'Feminino', value: 'FEMININO' },
  ];
  const optionsMotive = motivies.map(motive => ({
    label: motive.description,
    value: motive.id,
  }));
  const optionsBuilder = builders.map(builder => ({
    label: builder.name,
    value: builder.id,
  }));
  const optionsCoordinator = coordinators.map(coord => ({
    label: coord.name,
    value: coord.id,
  }));

  const handleValueIsNF = useCallback((value: string) => {
    switch (value) {
      case 'Y':
        setIsNFRequired(true);
        break;
      case 'N':
        setIsNFRequired(false);
        break;
      case '':
        setIsNFRequired(false);
        break;
      default:
        break;
    }
  }, []);

  const handleUpdateSale = useCallback(
    async data => {
      try {
        setLoading(true);
        let formData = data;
        if (!edits.buyer) {
          const cpf = formRef.current?.getFieldValue('client_buyer.cpf');
          const dateBirth = formRef.current?.getFieldValue(
            'client_buyer.date_birth',
          );
          const phone = formRef.current?.getFieldValue('client_buyer.phone');
          formData = Object.assign(
            data,
            (data.client_buyer.cpf = unMaked(cpf)),
            (data.client_buyer.date_birth = DateYMD(dateBirth)),
            (data.client_buyer.phone = unMaked(phone)),
          );
        }
        if (!edits.money) {
          const vgv = formRef.current?.getFieldValue('realty_ammount');
          const dateSale = formRef.current?.getFieldValue('sale_date');
          const comission = formRef.current?.getFieldValue('commission');
          const pay_date_signal = formRef.current?.getFieldValue(
            'pay_date_signal',
          );
          const value_signal = formRef.current?.getFieldValue('value_signal');
          formData = Object.assign(
            data,
            (data.realty_ammount = unMaked(vgv)),
            (data.value_signal = unMaked(value_signal)),
            (data.sale_date = DateYMD(dateSale)),
            (data.pay_date_signal = DateYMD(pay_date_signal)),
            (data.commission = unMaked(comission)),
          );
        }
        delete formData[0];
        delete formData[1];
        delete formData[2];
        delete formData[3];
        delete formData[4];
        delete formData[5];
        delete formData[6];
        delete formData[7];
        delete formData[8];
        delete formData[9];
        delete formData[10];
        await api.put(`/sale/${sale.id}`, formData, {
          headers: {
            authorization: `Bearer ${localStorage.getItem(
              '@TriunfoDigital:token',
            )}`,
          },
        });

        setLoading(false);
        toast.success('Dados da Venda atualizadas!');
        history.push('/adm/lista-vendas');
      } catch (errors) {
        setLoading(false);
        if (errors.response) {
          toast.error(`ERROR! ${errors.response.data.status}`);
        } else if (errors.request) {
          toast.error(`Erro interno do servidor contate o suporte`);
        } else {
          toast.error('Erro ao atualizar contate o suporte');
        }
      }
    },
    [edits.buyer, edits.money, sale.id, history],
  );

  const handlePayPlot = useCallback(
    async idPlot => {
      if (!idPlot) {
        toast.error('Nao foi possivel validar a parcela');
        return;
      }
      try {
        await api.patch(`/installment/paid/${idPlot}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        toast.success('status do pagamento atualizado');
        window.location.reload();
      } catch (error) {
        if (error.response) {
          toast.error(`ERROR! ${error.response.message}`);
        } else if (error.response) {
          toast.error(`Erro interno do servidor contate o suporte`);
        } else {
          toast.error('Não foi possível confirmar o pagamento');
        }
      }
    },
    [token],
  );
  const handlePaySignal = useCallback(
    async idSale => {
      if (!idSale) {
        toast.error('Nao foi possivel validar a parcela');
        return;
      }
      try {
        await api.patch(`/sale/valid-signal/${idSale}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        toast.success('status do pagamento atualizado');
        window.location.reload();
      } catch (error) {
        if (error.response) {
          toast.error(`ERROR! ${error.response.message}`);
        } else if (error.response) {
          toast.error(`Erro interno do servidor contate o suporte`);
        } else {
          toast.error('Não foi possível confirmar o pagamento');
        }
      }
    },
    [token],
  );

  return (
    <AdmLayout>
      <Container>
        <h1>DETALHES DA VENDA</h1>
        <Content>
          <Form ref={formRef} onSubmit={handleUpdateSale}>
            <SaleData>
              <fieldset className="login">
                <Legend>
                  <legend>IMÓVEL</legend>
                  {sale.status !== 'CAIU' ? (
                    <button
                      type="button"
                      onClick={() => handleEdit('property')}
                    >
                      <BiEditAlt size={20} color="#C32925" />
                      <span>editar</span>
                    </button>
                  ) : null}
                </Legend>
                {edits.property === true ? (
                  <>
                    <InputDisable
                      label="Empreendimento"
                      data={realty.enterprise}
                    />
                    <InputGroup>
                      <InputDisable label="Estado" data={realty.state} />
                      <InputDisable label="Cidade" data={realty.city} />
                    </InputGroup>
                    <InputDisable label="Bairro" data={realty.neighborhood} />
                    <InputGroup>
                      <InputDisable
                        label="Tipo do Imóvel"
                        data={typeProperty.name}
                      />
                      <InputDisable label="Unidade" data={realty.unit} />
                    </InputGroup>
                  </>
                ) : (
                  <>
                    <Input
                      label="Empreendimento"
                      name="realty.enterprise"
                      placeholder="Empreendimento"
                      readOnly={edits.property}
                      defaultValue={realty.enterprise}
                    />
                    <InputGroup>
                      <Select
                        name="realty.state"
                        nameLabel="Estado"
                        options={optionsState}
                        onChange={handleSelectedUF}
                        disabled={edits.property}
                        defaultValue={realty.state}
                      />
                      <Input
                        name="realty.city"
                        label="Cidade"
                        readOnly={edits.property}
                        defaultValue={realty.city}
                      />
                    </InputGroup>
                    <Input
                      label="Bairro"
                      name="realty.neighborhood"
                      placeholder="Bairro"
                      readOnly={edits.property}
                      defaultValue={realty.neighborhood}
                    />
                    <InputGroup>
                      <Select
                        name="realty.property"
                        nameLabel="Tipo de Imóvel"
                        options={optionsTypeImobille}
                        disabled={edits.property}
                        defaultValue={typeProperty.id}
                      />

                      <Input
                        label="Unidade"
                        name="realty.unit"
                        placeholder="Unidade"
                        readOnly={edits.property}
                        defaultValue={realty.unit}
                      />
                    </InputGroup>
                  </>
                )}
              </fieldset>
            </SaleData>
            <SaleData>
              <fieldset className="login">
                <Legend>
                  <legend>COMPRADOR</legend>
                  {sale.status !== 'CAIU' ? (
                    <button type="button" onClick={() => handleEdit('buyer')}>
                      <BiEditAlt size={20} color="#C32925" />
                      <span>editar</span>
                    </button>
                  ) : null}
                </Legend>
                {edits.buyer === true ? (
                  <>
                    <InputDisable
                      label="Nome Completo"
                      data={clientBuyer.name}
                    />
                    <InputGroup>
                      <InputDisable label="CPF" data={clientBuyer.cpf} />
                      <InputDisable
                        label="Data de Nascimento"
                        data={clientBuyer.date_birth}
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputDisable label="Telefone" data={clientBuyer.phone} />
                      <InputDisable label="E-mail" data={clientBuyer.email} />
                    </InputGroup>
                    <InputGroup>
                      <InputDisable
                        label="Estado Civíl"
                        data={clientBuyer.civil_status}
                      />
                      <InputDisable label="Gênero" data={clientBuyer.gender} />
                      <InputDisable
                        label="Numero de Filhos"
                        data={clientBuyer.number_children}
                      />
                    </InputGroup>
                  </>
                ) : (
                  <>
                    <Input
                      label="Nome Completo"
                      name="client_buyer.name"
                      placeholder="Nome Completo"
                      readOnly={edits.buyer}
                      defaultValue={clientBuyer.name}
                    />
                    <InputGroup>
                      <Input
                        label="CPF"
                        name="client_buyer.cpf"
                        placeholder="CPF"
                        readOnly={edits.buyer}
                        defaultValue={clientBuyer.cpf}
                      />
                      <Input
                        label="Data de Nascimento"
                        name="client_buyer.date_birth"
                        placeholder="Data de Nascimento"
                        readOnly={edits.buyer}
                        defaultValue={clientBuyer.date_birth}
                      />
                    </InputGroup>
                    <InputGroup>
                      <Input
                        label="Telefone"
                        name="client_buyer.phone"
                        placeholder="Telefone"
                        readOnly={edits.buyer}
                        defaultValue={clientBuyer.phone}
                      />
                      <Input
                        label="E-mail"
                        name="client_buyer.email"
                        type="email" autoComplete="off"
                        placeholder="E-mail"
                        readOnly={edits.buyer}
                        defaultValue={clientBuyer.email}
                      />
                    </InputGroup>
                    <InputGroup>
                      <Select
                        nameLabel="Estado Civíl"
                        name="client_buyer.civil_status"
                        options={optionsEstadoCivil}
                        disabled={edits.buyer}
                        defaultValue={clientBuyer.civil_status}
                      />
                      <Select
                        nameLabel="Gênero"
                        name="client_buyer.gender"
                        options={optionsGenero}
                        disabled={edits.buyer}
                        defaultValue={clientBuyer.gender}
                      />
                      <Input
                        label="Numero de Filhos"
                        name="client_buyer.number_children"
                        placeholder="Número de filhos"
                        readOnly={edits.buyer}
                        defaultValue={clientBuyer.number_children}
                      />
                    </InputGroup>
                  </>
                )}
              </fieldset>
            </SaleData>
            {sale.sale_type === 'NOVO' && (
              <SaleData>
                <fieldset className="login">
                  <Legend>
                    <legend>CONSTRUTORA</legend>
                    {sale.status !== 'CAIU' ? (
                      <button
                        type="button"
                        onClick={() => handleEdit('builder')}
                      >
                        <BiEditAlt size={20} color="#C32925" />
                        <span>editar</span>
                      </button>
                    ) : null}
                  </Legend>
                  {edits.builder ? (
                    <InputDisable label="" data={builder.name} />
                  ) : (
                    <Select name="builder" options={optionsBuilder} />
                  )}
                </fieldset>
              </SaleData>
            )}
            {sale.sale_type === 'USADO' && (
              <SaleData>
                <fieldset className="login">
                  <Legend>
                    <legend>VENDEDOR</legend>
                    {sale.status !== 'CAIU' ? (
                      <button
                        type="button"
                        onClick={() => handleEdit('seller')}
                      >
                        <BiEditAlt size={20} color="#C32925" />
                        <span>editar</span>
                      </button>
                    ) : null}
                  </Legend>
                  {edits.seller ? (
                    <>
                      <InputDisable
                        label="Nome Completo"
                        data={clientSaller.name}
                      />
                      <InputGroup>
                        <InputDisable label="CPF" data={clientSaller.cpf} />
                        <InputDisable
                          label="Data de Nascimento"
                          data={clientSaller.date_birth}
                        />
                      </InputGroup>
                      <InputGroup>
                        <InputDisable
                          label="Telefone"
                          data={clientSaller.phone}
                        />
                        <InputDisable
                          label="E-mail"
                          data={clientSaller.email}
                        />
                      </InputGroup>
                      <InputGroup>
                        <InputDisable
                          label="Estado Civíl"
                          data={clientSaller.civil_status}
                        />
                        <InputDisable
                          label="Gênero"
                          data={clientSaller.gender}
                        />
                        <InputDisable
                          label="Numero de Filhos"
                          data={clientSaller.number_children}
                        />
                      </InputGroup>
                    </>
                  ) : (
                    <>
                      <Input
                        label="Nome Completo"
                        name="client_seller.name"
                        placeholder="Nome Completo"
                        readOnly={edits.seller}
                      />
                      <InputGroup>
                        <Input
                          label="CPF"
                          name="client_seller.cpf"
                          placeholder="CPF"
                          readOnly={edits.seller}
                        />
                        <Input
                          label="Data de Nascimento"
                          name="client_seller.date_birth"
                          placeholder="Data de Nascimento"
                          readOnly={edits.seller}
                        />
                      </InputGroup>
                      <InputGroup>
                        <Input
                          label="Telefone"
                          name="client_seller.phone"
                          placeholder="Telefone"
                          readOnly={edits.seller}
                        />
                        <Input
                          label="E-mail"
                          name="client_seller.email"
                          type="email" autoComplete="off"
                          placeholder="E-mail"
                          readOnly={edits.seller}
                        />
                      </InputGroup>
                      <InputGroup>
                        <Select
                          nameLabel="Estado Civíl"
                          name="client_seller.civil_status"
                          options={optionsEstadoCivil}
                          disabled={edits.seller}
                        />
                        <Select
                          nameLabel="Gênero"
                          name="client_seller.gender"
                          options={optionsGenero}
                          disabled={edits.seller}
                        />
                        <Input
                          label="Numero de Filhos"
                          name="client_seller.number_children"
                          placeholder="Número de filhos"
                          readOnly={edits.seller}
                        />
                      </InputGroup>
                    </>
                  )}
                </fieldset>
              </SaleData>
            )}

            <SaleData>
              <fieldset className="login">
                <Legend>
                  <legend>CORRETORES</legend>
                  {sale.status !== 'CAIU' ? (
                    <button
                      type="button"
                      onClick={() => handleEdit('realtors')}
                    >
                      <BiEditAlt size={20} color="#C32925" />
                      <span>editar</span>
                    </button>
                  ) : null}
                </Legend>
                {sallers.map((saller, index) =>
                  edits.realtos ? (
                    <InputDisable
                      key={saller.name}
                      label={
                        sallers.length === 1
                          ? 'Corretor Vendedor'
                          : `Vendedor ${index + 1}`
                      }
                      data={saller.name}
                    />
                  ) : (
                    <Select
                      key={saller.name}
                      nameLabel={
                        sallers.length === 1
                          ? 'Corretor Vendedor'
                          : `Vendedor ${index + 1}`
                      }
                      name={`users_sellers[${index}].id`}
                      options={optionsRealtors}
                      disabled={edits.realtos}
                    />
                  ),
                )}
                {sale.sale_type === 'USADO' &&
                  captvators &&
                  captvators?.map((cap, index) =>
                    edits.realtos ? (
                      <InputDisable
                        key={cap.name}
                        label={
                          captvators.length === 1
                            ? 'Corretor Vendedor'
                            : `Vendedor ${index + 1}`
                        }
                        data={cap.name}
                      />
                    ) : (
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
                    ),
                  )}
                {coordinator &&
                  (edits.realtos ? (
                    <InputDisable
                      label="Coordenador"
                      data={sale.user_coordinator?.name}
                    />
                  ) : (
                    <Select
                      name="user_coordinator"
                      nameLabel="Coordenador"
                      options={optionsCoordinator}
                      defaultValue={coordinator.id}
                    />
                  ))}
                <InputGroup>
                  {directors.map(director => (
                    <InputDisable
                      key={director.name}
                      label="Diretor"
                      data={director.name}
                    />
                  ))}
                </InputGroup>
              </fieldset>
            </SaleData>
            <SaleData>
              <fieldset className="login">
                <Legend>
                  <legend>FINANÇAS</legend>
                  {sale.status !== 'CAIU' ? (
                    <button type="button" onClick={() => handleEdit('money')}>
                      <BiEditAlt size={20} color="#C32925" />
                      <span>editar</span>
                    </button>
                  ) : null}
                </Legend>
                {edits.money === true ? (
                  <>
                    <InputGroup>
                      <InputDisable
                        label="Valor da Venda"
                        data={sale.realty_ammount}
                      />
                      <InputDisable
                        label="Data da Venda"
                        data={sale.sale_date}
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputDisable
                        label="(%) da Venda"
                        data={String(sale.percentage_sale)}
                      />
                      <InputDisable label="Comissão" data={sale.commission} />
                    </InputGroup>
                    <InputGroup className="paymment_form_container">
                      <InputDisable
                        label="Forma de Pagamento"
                        data={paymentType.name}
                      />
                      {sale.status === 'NAO_VALIDADO' ? (
                        <div className="button-modal">
                          <ButtonModal type="button" onClick={showModal}>
                            <VscEdit size={20} color="#C32925" />
                            <span>
                              {installments
                                ? 'Editar Parcelas'
                                : 'Adicionar Parcelas'}
                            </span>
                          </ButtonModal>
                        </div>
                      ) : null}
                    </InputGroup>
                    <InputGroup>
                      <Plot>
                        <InputDisable
                          label="Valor do Ato"
                          data={sale.value_signal}
                        />
                        <InputDisable
                          label="Data de Vencimento"
                          data={sale.pay_date_signal}
                        />
                        <InputDisable
                          label="Status"
                          data={sale.payment_signal ? 'PAGO' : 'PENDENTE'}
                          status={sale.payment_signal ? 'PAGO' : 'PENDENTE'}
                        />
                      </Plot>
                      {!sale.payment_signal && (
                        <AddButton
                          type="button"
                          className="valid"
                          onClick={() => handlePaySignal(sale.id)}
                        >
                          <FaCheck size={20} color="#FCF9F9" />
                        </AddButton>
                      )}
                    </InputGroup>
                  </>
                ) : (
                  <>
                    <InputGroup>
                      <Input
                        mask="currency"
                        name="realty_ammount"
                        label="Valor da Venda"
                        readOnly={edits.money}
                        defaultValue={sale.realty_ammount}
                      />
                      <Input
                        mask="date"
                        name="sale_date"
                        label="Data da Venda"
                        readOnly={edits.money}
                        defaultValue={sale.sale_date}
                      />
                    </InputGroup>
                    <InputGroup>
                      <Input
                        name="percentage_sale"
                        label="(%) da Venda"
                        onChange={calcComission}
                        readOnly={edits.money}
                        defaultValue={sale.percentage_sale}
                      />
                      <Input
                        mask="currency"
                        name="commission"
                        label="Comissão"
                        value={comissionValue}
                        defaultValue={sale.commission}
                        readOnly
                      />
                    </InputGroup>
                    <InputGroup className="paymment_form_container">
                      <Select
                        name="payment_type"
                        nameLabel="Forma de Pagamento"
                        disabled={edits.money}
                        options={optionsPaymentType}
                        defaultValue={paymentType.name}
                      />

                      {sale.status === 'NAO_VALIDADO' ? (
                        <div className="button-modal">
                          <ButtonModal type="button" onClick={showModal}>
                            <VscEdit size={20} color="#C32925" />
                            <span>
                              {installments
                                ? 'Editar Parcelas'
                                : 'Adicionar Parcelas'}
                            </span>
                          </ButtonModal>
                        </div>
                      ) : null}
                    </InputGroup>
                    <InputGroup>
                      <Plot>
                        <Input
                          label="Valor do Ato"
                          name="value_signal"
                          mask="currency"
                          placeholder="R$ 00,00"
                        />
                        <Input
                          label="Data de Pagamento"
                          name="pay_date_signal"
                          mask="date"
                          placeholder="DD/MM/AAAA"
                        />
                      </Plot>
                    </InputGroup>
                  </>
                )}

                {installments ? (
                  <PaymentInstallments>
                    {userAuth.office.name !== 'Diretor' ? (
                      <>
                        <span>Parcelas Pendentes</span>
                        {installments.map(
                          installment =>
                            installment.status === 'PENDENTE' && (
                              <Plot key={installment.installment_number}>
                                <InputDisable
                                  label="Parcela"
                                  data={String(installment.installment_number)}
                                />
                                <InputDisable
                                  label="Valor da Parcela"
                                  data={installment.value}
                                />
                                <InputDisable
                                  label="Data de Vencimento"
                                  data={installment.due_date}
                                />
                                <InputDisable
                                  label="Status"
                                  data={installment.status}
                                  status={installment.status}
                                />
                                {!installment.pay_date && (
                                  <AddButton
                                    type="button"
                                    className="valid"
                                    onClick={() =>
                                      handlePayPlot(installment.id)
                                    }
                                  >
                                    <FaCheck size={20} color="#FCF9F9" />
                                  </AddButton>
                                )}
                              </Plot>
                            ),
                        )}
                        <span>Parcelas Pagas</span>
                        {installmentsPay.length > 0 ? (
                          installmentsPay.map(installment => (
                            <Plot key={installment.installment_number}>
                              <InputDisable
                                label="Parcela"
                                data={String(installment.installment_number)}
                              />
                              <InputDisable
                                label="Valor da Parcela"
                                data={installment.value}
                              />
                              <InputDisable
                                label="Data de Vencimento"
                                data={installment.due_date}
                              />
                              <InputDisable
                                label="Status"
                                data={installment.status}
                                status={installment.status}
                              />
                            </Plot>
                          ))
                        ) : (
                          <strong>Nehuma Parcela paga</strong>
                        )}
                      </>
                    ) : null}
                  </PaymentInstallments>
                ) : null}
                {userAuth.office.name !== 'Diretor' ? (
                  <BonusConatainer>
                    <span>Nescessita Nota Fiscal ?</span>
                    <CheckboxInput
                      name="isNF"
                      options={optionsBonus}
                      handleValue={handleValueIsNF}
                    />
                  </BonusConatainer>
                ) : null}

                {isNFRequired && (
                  <InputGroup>
                    <Select
                      nameLabel="Empresa"
                      name="company"
                      options={optionsEmpresa}
                    />
                    <Input name="percentage_company" label="% do Imposto" />
                  </InputGroup>
                )}
              </fieldset>
            </SaleData>
            <SaleData>
              <fieldset className="login">
                <ButtonGroup>
                  <button
                    type="button"
                    onClick={() => formRef.current?.submitForm()}
                  >
                    <Sync />
                    <span>{loading ? 'Atualizando...' : 'Atualizar'}</span>
                  </button>
                  {userAuth.office.name !== 'Diretor' ? (
                    <button type="button" onClick={showModalFall}>
                      <Garb />
                      <span>Caiu</span>
                    </button>
                  ) : null}
                </ButtonGroup>
                {sale.status === 'NAO_VALIDADO' && (
                  <button
                    type="button"
                    className="submit"
                    onClick={handleValidSale}
                  >
                    <BsCheck size={25} />
                    <span>Validar Venda</span>
                  </button>
                )}
              </fieldset>
            </SaleData>
          </Form>
        </Content>
      </Container>
      {isModalVisible ? (
        <Modal
          title="Detalhes de Pagamento"
          value={sale.commission}
          onClose={onClose}
        >
          <Form
            ref={formModalRef}
            onSubmit={handleModalSubmit}
            initialData={installments}
          >
            {installments.length !== 0 ? (
              <PaymentInstallments>
                {installments.map((installment, index) =>
                  index === 0 ? (
                    <Plot key={installment.installment_number}>
                      <Input
                        type="number"
                        name={`installments[${index}].installment_number`}
                        label="Parcela"
                        min={1}
                        readOnly
                        defaultValue={installment.installment_number}
                      />
                      <Input
                        mask="currency"
                        name={`installments[${index}].value`}
                        label="Valor da Parcela"
                        placeholder="R$ 0,00"
                        defaultValue={installment.value}
                      />
                      <Input
                        mask="date"
                        name={`installments[${index}].due_date`}
                        label="Data de Vencimento"
                        placeholder="07/01/2021"
                        defaultValue={installment.due_date}
                      />

                      <AddButton type="button" onClick={addPlots}>
                        <FaPlus size={20} color="#C32925" />
                      </AddButton>
                    </Plot>
                  ) : (
                    <Plot key={installment.installment_number}>
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
                        defaultValue={installment.value}
                      />
                      <Input
                        mask="date"
                        name={`installments[${index}].due_date`}
                        label="Data de Vencimento"
                        placeholder="07/01/2021"
                        defaultValue={installment.due_date}
                      />

                      <AddButton type="button" onClick={removePlots}>
                        <FaMinus size={20} color="#C32925" />
                      </AddButton>
                    </Plot>
                  ),
                )}
              </PaymentInstallments>
            ) : null}

            <ModalFooter>
              <button
                type="button"
                onClick={() => formModalRef.current?.submitForm()}
              >
                <BsCheck size={25} />
                Salvar
              </button>
            </ModalFooter>
          </Form>
        </Modal>
      ) : null}
      {isVisibleModalFall ? (
        <Modal title="Venda Caida" onClose={onCloseFall}>
          <ContentFallForm>
            <Form ref={formModalFallRef} onSubmit={handleFall}>
              <Select
                nameLabel="Motivo da perda"
                name="motive"
                options={optionsMotive}
                onChange={handleSelectAnotherMotive}
              />
              {!edits.fall ? (
                <TextArea
                  name="another_motive"
                  label="Outro motivo"
                  placeholder="Adicone outro motivo"
                />
              ) : null}

              <ModalFooter>
                <button
                  type="button"
                  onClick={() => formModalFallRef.current?.submitForm()}
                >
                  <BsCheck size={25} />
                  Confirmar
                </button>
              </ModalFooter>
            </Form>
          </ContentFallForm>
        </Modal>
      ) : null}
    </AdmLayout>
  );
};

export default DetailsSale;
