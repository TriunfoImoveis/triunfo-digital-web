import React, { useState, useRef, useCallback } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';

import { BiEditAlt } from 'react-icons/bi';
import { VscEdit } from 'react-icons/vsc';
import { FaCheck } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';

import { ISaleData, IInstallments, IPaymentType } from '..';
import { currency } from '../../../utils/unMasked';
import { money } from '../../../utils/masked';

import InputDisable from '../../InputDisabled';
import Input from '../../Input';
import Select from '../../ReactSelect';
import CheckboxInput from '../../CheckBox';

import {
  SaleData,
  Legend,
  InputGroup,
  ButtonModal,
  Plot,
  AddButton,
  PaymentInstallments,
  BonusConatainer,
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
const Finances: React.FC<IFinancesProps> = ({
  status,
  sale,
  installments,
  installmentPay,
  paymentType,
}) => {
  const [edit, setEdit] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [comissionValue, setcomissionValue] = useState('');
  const [token] = useState(localStorage.getItem('@TriunfoDigital:token'));
  const formRef = useRef<FormHandles>(null);
  const { userAuth } = useAuth();

  const calcComission = useCallback(() => {
    const valueSale = formRef.current?.getFieldValue('realty_ammount');
    const portcent = formRef.current?.getFieldValue('percentage_sale');
    const comission = currency(valueSale) * (currency(portcent) / 100);
    setcomissionValue(money(comission));
  }, []);

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
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

  const handleSubmit: SubmitHandler<FormData> = data => {
    console.log(formRef);
    console.log(data);
  };

  return (
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
                  data={paymentType.name}
                />
                <div className="button-modal">
                  <ButtonModal type="button" onClick={showModal}>
                    <VscEdit size={20} color="#C32925" />
                    <span>
                      {installments ? 'Editar Parcelas' : 'Adicionar Parcelas'}
                    </span>
                  </ButtonModal>
                </div>
              </InputGroup>
              <InputGroup>
                <Plot>
                  <InputDisable label="Valor do Ato" data={sale.value_signal} />
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
                  defaultInputValue={paymentType.name}
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
    </Form>
  );
};

export default Finances;
