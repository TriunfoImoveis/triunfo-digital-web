import React from 'react';
import { Table } from '../styles';
import NotFound from '../../../../components/Errors/NotFound';
import { Link } from 'react-router-dom';
import { Installment } from '../../../../api/get-installments';
import { format, parseISO } from 'date-fns';

interface TableInstallmentProps {
  installments: Installment[],
};
const TableInstallmentPending: React.FC<TableInstallmentProps> = (props) => {
  const { installments } = props;
  return (
    <>
      <Table cols={7}>
        <thead>
          <tr>
            <th>Filial</th>
            <th>Vencimento</th>
            <th>Descrição</th>
            <th>Valor Bruto</th>
            <th>Corretor</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {installments?.length === 0 ? (
            <NotFound />
          ) : (
            installments?.map(item => (
              <>
                <tr key={item.id}>
                  <td>{item.sale.subsidiary.name}</td>
                  <td>{format(parseISO(item.due_date), "dd/MM/yyyy")}</td>
                  <td>{`${item.installment_number}° Parcela, ${item.sale.realty.enterprise}`}</td>
                  <td>{Number(item.value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                  <td>{item.sale.sale_has_sellers.map(seller => seller.name).toString()}</td>
                  <td>
                    <Link
                      to={`/adm/detalhes-vendas/${item.sale.id}`}
                    >
                      Ver detalhes
                    </Link>
                  </td>
                </tr>
              </>
            ))
          )}
        </tbody>
      </Table>
      
    </>
  );
}

export default TableInstallmentPending;