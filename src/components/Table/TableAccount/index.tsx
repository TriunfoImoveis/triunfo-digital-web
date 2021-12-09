import React from 'react';
import NotFound from '../../Errors/NotFound';
import Actions from './Actions'

import { Table } from './styles';

interface collumProps {
  name: string;
}

type AccountProps = {
  id: string;
  expense_type: string;
  due_date: string;
  description: string;
  value: number;
  valueBRL: string;
  status: string;
  city: string;
  group: string;
};

interface TableProps {
  cols: number;
  collums: Array<collumProps>;
  rows: AccountProps[];
}

const TableAccount: React.FC<TableProps> = ({ cols, collums, rows}) => {
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
                <td>{item.city}</td>
                <td>{item.description}</td>
                <td>{item.due_date}</td>
                <td>{item.group}</td>
                <td>{item.valueBRL}</td>
                <td className={item.status}>{item.status}</td>
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

export default TableAccount;