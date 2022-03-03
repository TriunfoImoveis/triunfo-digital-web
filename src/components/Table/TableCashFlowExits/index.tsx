import React, { ChangeEvent } from 'react';
import NotFound from '../../Errors/NotFound';
import Actions from './Actions'

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
  handleSelected: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
}

const TableCashFlowEntry: React.FC<TableProps> = ({ cols, collums, rows, handleSelected}) => {
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
                <td>
                  <input type="checkbox" name="selected" onChange={event => handleSelected(event, item.id)}/>
                </td>
                <td>{item.sede}</td>
                <td>{item.data}</td>
                <td>{item.grupo}</td>
                <td>{item.descricao}</td>
                <td>{item.valor}</td>
                <td>{item.valorPago}</td>
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