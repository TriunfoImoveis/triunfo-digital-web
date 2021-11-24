import React from 'react';
import NotFound from '../../Errors/NotFound';

import { Table, Wrapper } from './styles';

interface collumProps {
  name: string;
}

interface SallesData {
  id: string;
  data: string;
  filial: string;
  descricao: string;
  fontePagadora: string;
  valorBruto: string;
  taxaDeImposto: string;
  valorDaNota: string;
  parteBrutaDaEmpresa: string;
  parteLiquidaDaEmpresa: string;
  contaDeEntrada: string;
}

interface TableProps {
  cols: number;
  collums: Array<collumProps>;
  rows: SallesData[];
}

const TableEntrySales: React.FC<TableProps> = ({ cols, collums, rows}) => {
  return (
    <Wrapper>
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
                <td>{item.fontePagadora}</td>
                <td>{item.valorBruto}</td>
                <td>{item.taxaDeImposto}</td>
                <td>{item.valorDaNota}</td>
                <td>{item.parteBrutaDaEmpresa}</td>
                <td>{item.parteLiquidaDaEmpresa}</td>
                <td>{item.contaDeEntrada}</td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </Table>
    </Wrapper>
  );
}

export default TableEntrySales;