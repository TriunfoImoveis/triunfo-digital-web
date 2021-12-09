import React from 'react';
import NotFound from '../../Errors/NotFound';

import { Table } from './styles';

interface collumProps {
  name: string;
}

type CashFlowExitsProps = {
  id: string;
  sede: string;
  grupo: string;
  descricao: string;
  valor: string;
  valorPago: string;
  contaDeSaida: string;
  data: string;
};

interface TableProps {
  cols: number;
  collums: Array<collumProps>;
  rows: CashFlowExitsProps[];
}

const TableCashFlowEntry: React.FC<TableProps> = ({ cols, collums, rows}) => {
  return (
    <Table cols={cols}>
      <thead>
        <tr>
          {collums.map(item => (<th>{item.name}</th>))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <NotFound />
        ) : (
          <>
            {rows.map(item => (
              <tr key={item.id}>
                <td>{item.sede}</td>
                <td>{item.data}</td>
                <td>{item.grupo}</td>
                <td>{item.descricao}</td>
                <td>{item.valor}</td>
                <td>{item.valorPago}</td>
                <td>{item.contaDeSaida}</td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </Table>
  );
}

export default TableCashFlowEntry;