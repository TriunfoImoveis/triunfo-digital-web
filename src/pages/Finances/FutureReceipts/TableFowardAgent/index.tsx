import React, { useState } from 'react'
import { Table } from '../styles'
import NotFound from '../../../../components/Errors/NotFound'
import { AiOutlinePlus } from 'react-icons/ai'
import theme from '../../../../styles/theme'
import { format, parseISO } from 'date-fns'
import EntryRevenue from '../../../../components/ReactModal/EntryRevenue'

export interface Revenue {
  id: string;
  revenue_type: 'DESPACHANTE' | 'CREDITO';
  description: string;
  due_date: string;
  value_integral: number;
  client: string;
  subsidiary: {
    id: string;
    name: string;
  };
  status: string;
}
interface TableFowardAgentProps {
  revenues?: Revenue[]
}
export function TableFowardAgent({revenues = []}: TableFowardAgentProps) {
  const [modalEntryRevenue, setModalEntryRevenue] = useState(false);
  const [selectedRevenue, setSelectedRevenue] = useState({} as Revenue);


  const toogleModalEntryRevenue = () => {
    setModalEntryRevenue(!modalEntryRevenue);
  };

  const handleOpenModalEntryRevenue = (item: Revenue) => {
    setSelectedRevenue(item);
    toogleModalEntryRevenue();
  }
  return (
    <Table cols={7}>
      <thead>
        <tr>
          <th>Filial</th>
          <th>Vencimento</th>
          <th>Descrição</th>
          <th>Cliente</th>
          <th>Valor</th>
          <th>Status</th>
          <th>Detalhes</th>
        </tr>
      </thead>
      <tbody>
        {revenues?.length === 0 ? (
          <NotFound />
        ) : (
          revenues?.map(item => {
            return (
              <>
                <tr key={item.id}>
                  <td>{item.subsidiary.name}</td>
                  <td>{format(parseISO(item.due_date), "dd/MM/yyyy")}</td>
                  <td>{item.description}</td>
                  <td>{item.client || '-------'}</td>
                  <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value_integral)}</td>
                  <td className={item.status}>{item.status}</td>
                  <td>
                    <button
                      type="button"
                      className="details"
                      onClick={() => handleOpenModalEntryRevenue(item)}
                    >
                      <AiOutlinePlus color={theme.colors.primary} />
                    </button>
                  </td>
                </tr>
              </>
            )
          })
        )}
      </tbody>
      <EntryRevenue
        isOpen={modalEntryRevenue}
        setIsOpen={toogleModalEntryRevenue}
        revenue={selectedRevenue}
      />
    </Table>
  )
}
