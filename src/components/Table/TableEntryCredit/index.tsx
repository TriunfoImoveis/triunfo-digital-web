import React from 'react';
import NotFound from '../../Errors/NotFound';

import { Table } from './styles';

interface collumProps {
  name: string;
}

interface CreditEntry {
  id: string;
  data: string;
  filial: string;
  descricao: string;
  nomeDoCliente: string;
  valorBruto: string;
  valorDaNota: string;
  taxaDeImposto: string;
  contaDeEntrada: string;
}

interface TableProps {
  cols: number;
  collums: Array<collumProps>;
  rows: CreditEntry[];
}

const TableEntryCredit: React.FC<TableProps> = ({ cols, collums, rows}) => {
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
                <td>{item.nomeDoCliente}</td>
                <td>{item.valorBruto}</td>
                <td>{item.valorDaNota}</td>
                <td>{item.taxaDeImposto}</td>
                <td>{item.contaDeEntrada}</td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </Table>
  );
}

export default TableEntryCredit;