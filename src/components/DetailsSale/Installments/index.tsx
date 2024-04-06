import React from 'react';
import { FaCalculator, FaCheck } from 'react-icons/fa';
import { MdDangerous } from 'react-icons/md';

import { useAuth } from '../../../context/AuthContext';
import { IInstallments } from '..';
import InputDisable from '../../InputDisabled';

import { PaymentInstallments, Plot, AddButton, AlertDanger } from '../styles';
import { useHistory } from 'react-router-dom';

interface IInstamentsProps {
  installments: Array<IInstallments>;
  installmentPay: Array<IInstallments>;
  handleSetDataMadalValidInstallmet: (id: string | undefined) => void;
  paymentSignal: boolean;
  comission: string;
}

const Installments: React.FC<IInstamentsProps> = ({
  installments, 
  installmentPay, 
  handleSetDataMadalValidInstallmet,
  paymentSignal,
  comission
}) => {

  const installmentsUnsuccessful = installments.filter(
    installment => installment.status === 'VENCIDO',
  );
  const { userAuth } = useAuth();
  const reducer = (accumulator, currentValue) => Number(accumulator) + Number(currentValue);

  const valueTotalInstallments = installments.map(installment => installment.value).reduce(reducer, 0);
  const isDisponible = valueTotalInstallments === Number(comission);

  const navigate = useHistory();

  return (
    <>
    {installments.length && isDisponible ? (
      <PaymentInstallments>
        {userAuth.office.name !== 'Diretor' ? (
          <>
            <span>Parcelas Vencidas</span>
            {installmentsUnsuccessful.length > 0 ? (
              <>
                {installmentsUnsuccessful.map(installment => (
                  <Plot key={installment.installment_number}>
                    <InputDisable
                      label="Parcela"
                      data={String(installment.installment_number)}
                    />
                    <InputDisable
                      label="Valor da Parcela"
                      data={installment.valueFormatted}
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
                    {!installment.pay_date && paymentSignal && (
                      <AddButton
                        type="button"
                        className="valid"
                        onClick={() =>
                          handleSetDataMadalValidInstallmet(
                            installment?.id,
                          )
                        }
                      >
                        <FaCheck size={20} color="#FCF9F9" />
                      </AddButton>
                    )}
                  </Plot>
                ))}
              </>
            ) : (
              <strong>Nehuma parcela vencida</strong>
            )}
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
                      data={installment.valueFormatted}
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
                    {!installment.pay_date && paymentSignal && (
                      <AddButton
                        type="button"
                        className="valid"
                        onClick={() =>
                          handleSetDataMadalValidInstallmet(
                            installment.id,
                          )
                        }
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
                    data={installment.valueFormatted}
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

                  <AddButton 
                    type="button"
                    className="valid"
                    onClick={() => navigate.push(`/financeiro/calculadora/${installment.id}`)}
                  >
                    <FaCalculator size={20} color="#FCF9F9" />
                  </AddButton>
                </Plot>
              ))
            ) : (
              <strong>Nehuma Parcela paga</strong>
            )}
          </>
        ) : null}
      </PaymentInstallments>
    ) : null}

    {!isDisponible && (
      <PaymentInstallments>
        <AlertDanger>
          <MdDangerous color='#DC3545' /> As parcelas não estão disponivel, por que o valor total não é igual ao valor total da comissão. Edite as parcelas para continuar.
        </AlertDanger>
      </PaymentInstallments>
    )}
    </>
  );
}

export default Installments;