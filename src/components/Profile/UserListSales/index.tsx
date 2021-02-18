import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Funnel, DropDownIcon } from '../../../assets/images';
import { formatTextStatus, filterSalesForStatus } from '../../../utils/filters';

import { Container, Header, Filter, TableContainer, Text } from './styles';

interface IUserSales {
  id: string;
  property: string;
  date_sale: string;
  vgv: string;
  status: string;
}

interface UserListSalesProps {
  sales: IUserSales[];
}

const UserListSales: React.FC<UserListSalesProps> = ({ sales }) => {
  const [userSales, setUserSales] = useState<IUserSales[]>([]);
  const [userSalesFiltred, setUserSalesFiltred] = useState<IUserSales[]>([]);
  const [selectedStatus] = useState('0');

  useEffect(() => {
    const loadUserSales = async () => {
      setUserSales(sales);
      setUserSalesFiltred(sales);
    };
    loadUserSales();
  }, [sales]);

  const handleSelectedStaus = useCallback(
    (event: ChangeEvent<HTMLSelectElement>, sales: IUserSales[]) => {
      const { value } = event.currentTarget;
      const filtredSales = filterSalesForStatus(sales, value);
      if (value === '0') {
        setUserSalesFiltred(userSales);
      } else {
        setUserSalesFiltred(filtredSales);
      }
    },
    [userSales],
  );
  return (
    <Container>
      <Header>
        <h3 className="title">Suas Vendas</h3>
        <Filter>
          <Funnel />
          <select
            className="filter-select"
            name="filter"
            defaultValue={selectedStatus}
            onChange={e => handleSelectedStaus(e, userSales)}
          >
            <option value="0">TODOS</option>
            <option value="PENDENTE">PENDENTES</option>
            <option value="NAO_VALIDADO">NÃO VALIDADAS</option>
            <option value="CAIU">CAÍU</option>
            <option value="PAGO_TOTAL">PAGAS</option>
          </select>
          <DropDownIcon />
        </Filter>
      </Header>

      {sales.length > 0 ? (
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Imóvel</th>
                <th>Data da Venda</th>
                <th>VGV</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {userSalesFiltred.map(sales => (
                <tr key={sales.id}>
                  <td className="property">
                    <span className="rLabel">Imóvel</span>
                    {sales.property}
                  </td>
                  <td>
                    <span className="rLabel">Data da Venda</span>
                    {sales.date_sale}
                  </td>
                  <td>
                    <span className="rLabel">VGV</span>
                    {sales.vgv}
                  </td>
                  <td className={sales.status}>
                    <span className="rLabel">Status</span>
                    {formatTextStatus(sales.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      ) : (
        <Text>Você não possuí fichas de vendas enviadas</Text>
      )}
    </Container>
  );
};

export default UserListSales;
