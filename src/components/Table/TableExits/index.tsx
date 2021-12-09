import React from 'react';
import NotFound from '../../Errors/NotFound';

import { Table } from './styles';

interface collumProps {
  name: string;
}

interface Exits {
  id: string;
  data: string;
  filial: string;
  descricao: string;
  quemPagou: string;
  valor: string;
  contaDeSaida: string;
}

interface TableProps {
  cols: number;
  collums: Array<collumProps>;
  rows: Exits[];
}

const TableExits: React.FC<TableProps> = ({ cols, collums, rows}) => {
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
                <td>{item.data}</td>
                <td>{item.filial}</td>
                <td>{item.descricao}</td>
                <td>{item.quemPagou}</td>
                <td>{item.valor}</td>
                <td>{item.contaDeSaida}</td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </Table>
  );
}

export default TableExits;