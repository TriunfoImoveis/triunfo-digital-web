import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { BiEditAlt } from 'react-icons/bi';
import { VscEdit } from 'react-icons/vsc';
import { FaCheck } from 'react-icons/fa';
import { BsCheck } from 'react-icons/bs';

import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';

import { ISaleData, IInstallments, IPaymentType, IInstallmentsData } from '..';
import { currency, unMaked, DateYMD } from '../../../utils/unMasked';
import { money } from '../../../utils/masked';
import getValidationErros from '../../../utils/getValidationErros';
import { Sync, Garb } from '../../../assets/images';

import EditInstallmentModal from '../../ReactModal/EditInstallments';

import InputDisable from '../../InputDisabled';
import Input from '../../Input';
import Select from '../../Select';
import TextArea from '../../TextArea';

import {
  SaleData,
  Legend,
  InputGroup,
  ButtonModal,
  Plot,
  AddButton,
  ButtonGroup,
} from '../styles';
import FallSale from '../../ReactModal/FallSale';
import { valiateDate } from '../../../utils/validateDate';
import ValidAct from '../../ReactModal/ValidAct';
import ValidInstallment from '../../ReactModal/ValidInstallment';

import theme from '../../../styles/theme';
import Installments from '../Installments';
import { sortingByPlotNumber } from '../../../utils/filters';
import axios from 'axios';

interface Origin {
  id: string;
  name: string
}
interface IFinancesProps {
  status: string;
  sale: ISaleData;
  installments: Array<IInstallments>;
  installmentPay: Array<IInstallments>;
  paymentType: IPaymentType;
}
interface FormData {
  realty_ammount: string;
  sale_date: string;
  percentage_sale: string;
  commission: string;
  payment_type: string;
  value_signal: string;
  pay_date_signal: string;
}

const Finances: React.FC<IFinancesProps> = ({
  status,
  sale,
  installments,
  installmentPay,
  paymentType,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [edit, setEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [comissionValue, setcomissionValue] = useState(sale.commission);
  const [paymentTypes, setPaymentTypes] = useState<IPaymentType[]>([]);
  const [originSales, setOriginSales] = useState<Origin[]>([]);
  const [editInstallments, setEditInstallments] = useState(false);
  const [modalFallSale, setModalFallSale] = useState(false);
  const [modalValidAct, setModalValidAct] = useState(false);
  const [modalValidInstallments, setModalValidInstallments] = useState(false);
  const [selectedInstallment, setSelectedInstalment] = useState('');
  const history = useHistory();
  const { userAuth } = useAuth();

  

  useEffect(() => {
    const loadPaymentType = async () => {
      const response = await api.get(
        `/payment-type?type=${sale.sale_type === 'NOVO' ? 'NOVO' : 'USADO'}`,
      );
      setPaymentTypes(response.data);
    };
    const loadOriginSale = async () => {
      const response = await api.get('/origin-sale');
      setOriginSales(response.data);
    };

    loadPaymentType();
    loadOriginSale();
  }, [sale.sale_type, installments]);

  const calcComission = useCallback(() => {
    const valueSale = formRef.current?.getFieldValue('realty_ammount');
    const portcent = formRef.current?.getFieldValue('percentage_sale');
    const comission = currency(valueSale) * ((Number(portcent.replace(',', '.'))) / 100);
    setcomissionValue(money(comission));
  }, []);

  const toogleEditInstallments = useCallback(() => {
    setEditInstallments(!editInstallments);
  }, [editInstallments]);
  const toogleModalFallSale = useCallback(() => {
    setModalFallSale(!modalFallSale);
  }, [modalFallSale]);
  const toogleModalValidAct = useCallback(() => {
    setModalValidAct(!modalValidAct);
  }, [modalValidAct]);
  const toogleModalValidInstallments = useCallback(() => {
    setModalValidInstallments(!modalValidInstallments);
  }, [modalValidInstallments]);

  const unMaskedValue = useCallback((data: FormData) => {
    const vgv = formRef.current?.getFieldValue('realty_ammount');
    const dateSale = formRef.current?.getFieldValue('sale_date');
    const comission = formRef.current?.getFieldValue('commission');
    const pay_date_signal = formRef.current?.getFieldValue('pay_date_signal');
    const value_signal = formRef.current?.getFieldValue('value_signal');
    const formData: FormData = Object.assign(
      data,
      (data.realty_ammount = unMaked(vgv)),
      (data.value_signal = unMaked(value_signal)),
      (data.sale_date = DateYMD(dateSale)),
      (data.pay_date_signal = DateYMD(pay_date_signal)),
      (data.commission = unMaked(comission))
    );
    return formData;
  }, []);

  const optionsPaymentType = paymentTypes.map(payment => ({
    label: payment.name,
    value: payment.id,
  }));
  const optionsOriginSales = originSales.map(origin => ({
    label: origin.name,
    value: origin.id,
  }));

  const handleSetDataMadalValidInstallmet = (id: string | undefined) => {
    if (!id) {
      return;
    }
    toogleModalValidInstallments();
    setSelectedInstalment(id);
  };

  const handleSubmit: SubmitHandler<FormData> = async data => {
    formRef.current?.setErrors({});
    try {
      setLoading(true);
      const schema = Yup.object().shape({
        realty_ammount: Yup.string().required('Valor da Venda Obrigatório'),
        sale_date: Yup.string()
          .min(10, 'Formato da Data DD/MM/AAAA')
          .test('validateDate', 'Data Invalida', function valid(value) {
            const { path, createError } = this;
            const isValid = valiateDate(value);
            return isValid || createError({ path, message: 'Data Invalida' });
          })
          .required('Data da venda'),
        percentage_sale: Yup.string().required(
          'Porcetagem Total da venda Obrigatória',
        ),
        commission: Yup.string().required('comissão da venda Obrigatória'),
        payment_type: Yup.string().required('Forma de Pagamento Obrigatório'),
        value_signal: Yup.string().required('Valor do Ato Obrigatório'),
        pay_date_signal: Yup.string()
          .min(10, 'Formato da Data DD/MM/AAAA')
          .test('validateDate', 'Data Invalida', function valid(value) {
            const { path, createError } = this;
            const isValid = valiateDate(value);
            return isValid || createError({ path, message: 'Data Invalida' });
          })
          .required('Data do pagamento do sinal'),
        origin: Yup.string().optional(),
        observation: Yup.string().required('Observação nescessária'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      const formData = unMaskedValue(data);
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
      await api.put(`/sale/${sale.id}`, formData);
      toast.success('Dados da Venda atualizadas!');
      history.push('/adm/lista-vendas');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
      }

      toast.error('ERROR!, verifique as informações e tente novamente');
    } finally {
      setLoading(false);
    }
  };

  const handleModalSubmit = async (data: IInstallmentsData) => {
    try {
      await api.post(`installment/${sale.id}`, data);
      toast.success('Parcelas adicionadas!');
      toogleEditInstallments();
      window.location.reload();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          toast.error(`${err.response.data.message}`);
        }
      } else {
        toast.error('ERROR ao adicionar as parcela!');
      }
    }
  };

  const handleValidSale = useCallback(async () => {
    try {
      await api.patch(`/sale/valid/${sale.id}`);
      toast.success('Venda Validada com sucesso !');
      history.push('/ranking');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.request) {
          toast.error(
            'Erro de Conexão tente recarregar a página, contate o suporte',
          );
        } else if (error.response) {
          toast.error(`${error.response.data.message}`);
        }
      } else {
        toast.error(' Erro desconhecido, contate o suporte');
      }
    }
  }, [sale.id, history]);

  const handleFall = useCallback(
    async data => {
      try {
        await api.patch(`/sale/not-valid/${sale.id}`, data);
        toast.success('Atualização Realizada');
        history.push('/adm/lista-vendas');
      } catch (err) {
        if (axios?.isAxiosError(err)) {
          if (err?.response?.data) {
            toast.error(`${err.response.data.message}`);
          } 
        } else {
          toast.error('Erro ao desativar a venda');
        }
      }
    },
    [history, sale.id],
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
                  <BiEditAlt size={20} color={theme.colors.primary} />
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
                  <InputDisable label="Comissão" data={sale.commissionFormatted} />
                </InputGroup>
                <InputGroup className="paymment_form_container">
                  <InputDisable
                    label="Forma de Pagamento"
                    data={paymentType?.name}
                  />
                  <div className="button-modal">
                    <ButtonModal type="button" onClick={toogleEditInstallments}>
                      <VscEdit size={20} color={theme.colors.primary} />
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
                      onClick={toogleModalValidAct}
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
                    defaultValue={sale.commissionFormatted}
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

                  <div className="button-modal">
                    <ButtonModal type="button" onClick={toogleEditInstallments}>
                      <VscEdit size={20} color={theme.colors.primary} />
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
                    <Input
                      label="Valor do Ato"
                      name="value_signal"
                      mask="currency"
                      placeholder="R$ 00,00"
                      defaultValue={sale.value_signal}
                    />
                    <Input
                      label="Data de Pagamento"
                      name="pay_date_signal"
                      mask="date"
                      placeholder="DD/MM/AAAA"
                      defaultValue={sale.pay_date_signal}
                    />
                  </Plot>
                </InputGroup>
              </>
            )}

            <Installments 
              installments={installments} 
              installmentPay={installmentPay} 
              handleSetDataMadalValidInstallmet={handleSetDataMadalValidInstallmet} 
              paymentSignal={sale.payment_signal}
              comission={sale.commission}
            />

            <InputGroup>
              {!edit ? (
                <Select
                name="origin"
                nameLabel="Origem da Venda"
                disabled={edit}
                options={optionsOriginSales}
                defaultValue={sale?.origin?.id}
              />
              ): (
                <InputDisable label="Origem da Venda" data={sale?.origin?.name} />
              )}
              
            </InputGroup>

            <TextArea
              name="observation"
              label="Observação"
              defaultValue={sale.observation}
              disabled={edit}
            />
          </fieldset>
        </SaleData>
        <SaleData>
          <fieldset className="login">
            <ButtonGroup>
              {!edit && (
                <button
                  type="button"
                  onClick={() => formRef.current?.submitForm()}
                >
                  <Sync />
                  <span>{loading ? 'Atualizando...' : 'Atualizar'}</span>
                </button>
              )}

              {userAuth.office.name !== 'Diretor' ? (
                <button type="button" onClick={toogleModalFallSale}>
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
                disabled={!sale.payment_signal}
              >
                <BsCheck size={25} />
                <span>Validar Venda</span>
              </button>
            )}
          </fieldset>
        </SaleData>
      </Form>
      <EditInstallmentModal
        isOpen={editInstallments}
        setIsOpen={toogleEditInstallments}
        valueComission={sale.commissionFormatted}
        handleEditInstallments={handleModalSubmit}
        installments={installments.sort(sortingByPlotNumber)}
      /> 
      <ValidAct
        isOpen={modalValidAct}
        setIsOpen={toogleModalValidAct}
        idSale={sale.id}
      />
      <ValidInstallment
        isOpen={modalValidInstallments}
        setIsOpen={toogleModalValidInstallments}
        idPlot={selectedInstallment}
      />
      <FallSale
        isOpen={modalFallSale}
        setIsOpen={toogleModalFallSale}
        handleFallSale={handleFall}
      />
    </>
  );
};

export default Finances;
