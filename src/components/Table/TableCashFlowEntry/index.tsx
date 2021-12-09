import React from 'react';
import NotFound from '../../Errors/NotFound';
import Actions from './Actions'

import { Table } from './styles';

interface collumProps {
  name: string;
}

type CashFlowEntryProps = {
  id: string;
  sede: string;
  tipo: 'ENTRADA' | 'SAIDA';
  descricao: string;
  valor: string;
  contaDeSaida: string;
  data: string;
};

interface TableProps {
  cols: number;
  collums: Array<collumProps>;
  rows: CashFlowEntryProps[];
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
                <td>{item.tipo}</td>
                <td>{item.descricao}</td>
                <td>{item.valor}</td>
                <td>{item.contaDeSaida}</td>
                <td>
                  <Actions item={item} />
                </td> 
              </tr>
            ))}
          </>
        )}
      </tbody>
    </Table>
  );
}

export default TableCashFlowEntry;