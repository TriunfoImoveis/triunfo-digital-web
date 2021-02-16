import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  ChangeEvent,
} from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { BiEditAlt } from 'react-icons/bi';
import { VscEdit } from 'react-icons/vsc';
import { FaCheck, FaPlus, FaMinus } from 'react-icons/fa';
import { BsCheckBox } from 'react-icons/bs';

import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';

import { ISaleData, IInstallments, IPaymentType, IInstallmentsData } from '..';
import { currency, unMaked, DateYMD } from '../../../utils/unMasked';
import { money } from '../../../utils/masked';
import { optionsBonus } from '../../../utils/loadOptions';
import getValidationErros from '../../../utils/getValidationErros';
import { Sync, Garb } from '../../../assets/images';

import InputDisable from '../../InputDisabled';
import Input from '../../Input';
import Select from '../../Select';
import CheckboxInput from '../../CheckBox';
import TextArea from '../../TextArea';
import Modal from '../../Modal';

import {
  SaleData,
  Legend,
  InputGroup,
  ButtonModal,
  Plot,
  AddButton,
  PaymentInstallments,
  BonusConatainer,
  ModalFooter,
  ButtonGroup,
  ContentFallForm,
} from '../styles';

interface IFinancesProps {
  status: string;
  sale: ISaleData;
  installments: IInstallments[];
  installmentPay: Array<IInstallments>;
  paymentType: IPaymentType;
}
interface FormData {
  name: string;
}

interface ICompany {
  id: string;
  name: string;
}

interface IMotives {
  id: string;
  description: string;
}
const Finances: React.FC<IFinancesProps> = ({
  status,
  sale,
  installments,
  installmentPay,
  paymentType,
}) => {
  const [edit, setEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [motivies, setMotivies] = useState<IMotives[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleFall, setIsVisibleModalFall] = useState(false);
  const [isNFRequired, setIsNFRequired] = useState(false);
  const [comissionValue, setcomissionValue] = useState('');
  const [paymentTypes, setPaymentTypes] = useState<IPaymentType[]>([]);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [newInstallements, setNewInstallments] = useState<IInstallments[]>([]);

  const [token] = useState(localStorage.getItem('@TriunfoDigital:token'));
  const formRef = useRef<FormHandles>(null);
  const formModalRef = useRef<FormHandles>(null);
  const formModalFallRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { userAuth } = useAuth();

  useEffect(() => {
    const loadPaymentType = async () => {
      const response = await api.get(
        `/payment-type/${sale.sale_type === 'NOVO' ? 'new' : 'used'}`,
      );
      setPaymentTypes(response.data);
    };
    const loadCompany = async () => {
      const response = await api.get('/company');
      setCompanies(response.data);
    };
    const loadMotivies = async () => {
      try {
        const response = await api.get('/motive');
        setMotivies(response.data);
      } catch (error) {
        toast.error('Falha na conexão com o servidor contate o suporte');
      }
    };
    const newInstallments = () => {
      setNewInstallments(installments);
    };
    loadMotivies();
    loadPaymentType();
    loadCompany();
    newInstallments();
  }, [sale.sale_type, installments]);

  const calcComission = useCallback(() => {
    const valueSale = formRef.current?.getFieldValue('realty_ammount');
    const portcent = formRef.current?.getFieldValue('percentage_sale');
    const comission = currency(valueSale) * (currency(portcent) / 100);
    setcomissionValue(money(comission));
  }, []);

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

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const showModalFall = () => {
    setIsVisibleModalFall(!isModalVisibleFall);
  };

  const onClose = () => {
    setIsModalVisible(false);
  };
  const onCloseFall = () => {
    setIsVisibleModalFall(false);
  };

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

  const optionsPaymentType = paymentTypes.map(payment => ({
    label: payment.name,
    value: payment.id,
  }));

  const optionsEmpresa = companies.map(company => ({
    value: company.id,
    label: company.name,
  }));

  const optionsMotive = motivies.map(motive => ({
    label: motive.description,
    value: motive.id,
  }));

  const addPlots = useCallback(() => {
    const listPlots = newInstallements.slice();
    const numberPlot = Number(
      formRef.current?.getFieldValue(
        `installments[${newInstallements.length - 1}].installment_number`,
      ),
    );

    listPlots.push({
      installment_number: numberPlot + 1,
      due_date: '',
      value: '',
    });
    setNewInstallments(listPlots);
  }, [newInstallements]);
  const removePlots = useCallback(() => {
    const listPlots = newInstallements.slice();
    listPlots.pop();

    setNewInstallments(listPlots);
  }, [newInstallements]);

  const handleSubmit: SubmitHandler<FormData> = data => {
    console.log(formRef);
    console.log(data);
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
      await api.post(`installment/${sale.id}`, newData, {
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

  const handleValidSale = useCallback(async () => {
    try {
      await api.patch(`/sale/valid/${sale.id}`, {
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
          'Erro de Conexão tente recarregar a página, contate o suporte',
        );
      } else {
        toast.error(' Erro desconhecido, contate o suporte');
      }
    }
  }, [sale.id, token, history]);

  const handleFall = useCallback(
    async data => {
      formModalFallRef.current?.setErrors({});
      try {
        const schema = Yup.object({
          motive: Yup.string().required('Selecione um Motivo'),
        });
        await schema.validate(data, { abortEarly: false });
        await api.patch(`/sale/not-valid/${sale.id}`, data);
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
    [history, sale.id],
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
    },
    [],
  );

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <SaleData>
          <fieldset className="login">
            <Legend>
              <legend>FINANÇAS</legend>
              {status !== 'CAIU' ? (
                <button type="button" onClick={() => setEdit(!edit)}>
                  <BiEditAlt size={20} color="#C32925" />
                  <span>editar</span>
                </button>
              ) : null}
            </Legend>
            {edit ? (
              <>
                <InputGroup>
                  <InputDisable
                    label="Valor da Venda"
                    data={sale.realty_ammount}
                  />
                  <InputDisable label="Data da Venda" data={sale.sale_date} />
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
                    data={paymentType?.name}
                  />
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
                    readOnly={edit}
                    defaultValue={sale.realty_ammount}
                  />
                  <Input
                    mask="date"
                    name="sale_date"
                    label="Data da Venda"
                    readOnly={edit}
                    defaultValue={sale.sale_date}
                  />
                </InputGroup>
                <InputGroup>
                  <Input
                    name="percentage_sale"
                    label="(%) da Venda"
                    onChange={calcComission}
                    readOnly={edit}
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
                    disabled={edit}
                    options={optionsPaymentType}
                    defaultValue={paymentType?.name}
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
                                onClick={() => handlePayPlot(installment.id)}
                              >
                                <FaCheck size={20} color="#FCF9F9" />
                              </AddButton>
                            )}
                          </Plot>
                        ),
                    )}
                    <span>Parcelas Pagas</span>
                    {installmentPay.length > 0 ? (
                      installmentPay.map(installment => (
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
                <BsCheckBox size={25} />
                <span>Validar Venda</span>
              </button>
            )}
          </fieldset>
        </SaleData>
      </Form>
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
            {newInstallements.length !== 0 ? (
              <PaymentInstallments>
                {newInstallements.map((installment, index) =>
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
                <BsCheckBox size={25} />
                Salvar
              </button>
            </ModalFooter>
          </Form>
        </Modal>
      ) : null}
      {isModalVisibleFall ? (
        <Modal title="Venda Caida" onClose={onCloseFall}>
          <ContentFallForm>
            <Form ref={formModalFallRef} onSubmit={handleFall}>
              <Select
                nameLabel="Motivo da perda"
                name="motive"
                options={optionsMotive}
                onChange={handleSelectAnotherMotive}
              />
              {!edit ? (
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
                  <BsCheckBox size={25} />
                  Confirmar
                </button>
              </ModalFooter>
            </Form>
          </ContentFallForm>
        </Modal>
      ) : null}
    </>
  );
};

export default Finances;
