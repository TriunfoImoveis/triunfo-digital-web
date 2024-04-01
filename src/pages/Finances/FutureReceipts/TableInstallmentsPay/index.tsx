import React, { useState } from 'react';
import { Table } from '../styles';
import NotFound from '../../../../components/Errors/NotFound';
import { AiOutlinePlus } from 'react-icons/ai';
import theme from '../../../../styles/theme';
import { Installment } from '../../../../api/get-installments';
import { format, parseISO } from 'date-fns';
import DetailsInstalments from '../../../../components/ReactModal/DetailsInstalments';

interface TableInstallmentProps {
  installments: Installment[],
};
const TableInstallmentsPay: React.FC<TableInstallmentProps> = (props) => {
  const { installments } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState({} as Installment);
  const toogleModal = () => {
    setIsOpen(!isOpen);
  }

  const handleOpenModal = (item: Installment) => {
    setSelectedInstallment(item);
    toogleModal();
  }
  
  return (
    <Table cols={7}>
      <thead>
        <tr>
          <th>Filial</th>
          <th>Vencimento</th>
          <th>Descrição</th>
          <th>Valor Bruto</th>
          <th>Corretor</th>
          <th>Status</th>
          <th>Detalhes</th>
        </tr>
      </thead>
      <tbody>
        {installments.length === 0 ? (
          <NotFound />
        ) : (
          installments.map(item => (
            <>
              <tr key={item.id}>
                <td>{item.sale.subsidiary.name}</td>
                <td>{format(parseISO(item.due_date), "dd/MM/yyyy")}</td>
                <td>{`${item.installment_number}° Parcela, ${item.sale.realty.enterprise}`}</td>
                <td>{Number(item.value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                <td>{item.sale.sale_has_sellers.map(item => item.name).toString()}</td>
                <td className={item.status}>{item.status}</td>
                <td>
                  <button
                    type="button"
                    className="details"
                    onClick={() => handleOpenModal(item)}
                  >
                    <AiOutlinePlus color={theme.colors.primary} />
                  </button>
                </td>
              </tr>
            </>
          ))
        )}
      </tbody>
      <DetailsInstalments
        isOpen={isOpen}
        setIsOpen={toogleModal}
        installment={selectedInstallment}
      />
    </Table>
    
  );
}

export default TableInstallmentsPay;