import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { Funnel, DropDownIcon } from '../../../assets/images';
import api from '../../../services/api';
import { filterSalesForStatus } from '../../../utils/filters';
import { formatPrice, DateBRL, formatTextStatus } from '../../../utils/format';

import {
  Container,
  Header,
  Filter,
  // ListSalesContainer,
  // LabelContainer,
  // LabelItems,
  // SalesContainer,
  // Item,
  // Text,
  TableContainer,
} from './styles';

interface IUserSales {
  id: string;
  property: string;
  date_sale: string;
  vgv: string;
  status: string;
}

interface UserListSalesProps {
  id: string;
}

const UserListSales: React.FC<UserListSalesProps> = ({ id }) => {
  const [userSales, setUserSales] = useState<IUserSales[]>([]);
  const [userSalesFiltred, setUserSalesFiltred] = useState<IUserSales[]>([]);
  const [selectedStatus] = useState('0');
  const [token] = useState(() => localStorage.getItem('@TriunfoDigital:token'));

  useEffect(() => {
    const loadUserSales = async () => {
      try {
        const response = await api.get(`/users/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const { sales } = response.data;
        const salesFormated = sales.map(sale => ({
          id: sale.id,
          property: sale.realty.enterprise,
          date_sale: DateBRL(sale.sale_date),
          vgv: formatPrice(sale.realty_ammount),
          status: sale.status,
        }));
        setUserSales(salesFormated);
        setUserSalesFiltred(salesFormated);
      } catch (error) {
        if (error.response) {
          toast.error(`ERROR! ${error.response.data.message}`);
        } else if (error.request) {
          toast.error(
            `ERROR! Falha ao connectar ao servidor! Entre em contato com o suporte.`,
          );
        }
      }
    };
    loadUserSales();
  }, [id, token]);

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
                <td className="property">{sales.property}</td>
                <td>{sales.date_sale}</td>
                <td>{sales.vgv}</td>
                <td className={sales.status}>
                  {formatTextStatus(sales.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
    </Container>
  );
};

export default UserListSales;
