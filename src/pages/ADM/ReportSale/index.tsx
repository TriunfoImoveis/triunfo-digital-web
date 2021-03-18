import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { DateBRL, formatPrice } from '../../../utils/format';
import AdmLayout from '../../Layouts/Adm';

import {
  Export,
  TableSaleWrapper,
  Footer,
  Header,
  Table,
  Body,
} from './styles';

interface IReport {
  id: string;
  builder?: string;
  sallers: string[];
  captivators?: string[];
  sale_date: string;
  client_buyer: string;
  realty: string;
  type_sale: string;
  realty_ammount: string;
  percentage_sale: string;
}

interface ISallers {
  name: string;
}
interface ISaleData {
  id: string;
  bonus?: string;
  builder: {
    id: string;
    name: string;
  };
  client_buyer: {
    civil_status: string;
    cpf: string;
    date_birth: string;
    email: string;
    gender: string;
    id: string;
    name: string;
    number_children: number;
    occupation: string;
    phone: string;
    whatsapp: string;
  };
  installments: {
    due_date: string;
    id: string;
    installment_number: number;
    value: string;
  }[];
  client_seller?: {
    civil_status: string;
    cpf: string;
    date_birth: string;
    email: string;
    gender: string;
    id: string;
    name: string;
    number_children: number;
    occupation: string;
    phone: string;
    whatsapp: string;
  };
  commission: string;
  company?: {
    id: string;
    name: string;
    percentage: number;
  };
  origin: {
    id: string;
    name: string;
  };
  payment_type: {
    id: string;
    name: string;
  };
  percentage_company: number;
  percentage_sale: number;
  realty: {
    city: string;
    enterprise: string;
    id: string;
    neighborhood: string;
    property: {
      id: string;
      name: string;
    };
    state: string;
    unit: string;
  };
  realty_ammount: string;
  sale_date: string;
  sale_has_captivators: Array<ISallers>;
  sale_has_sellers: Array<ISallers>;
  sale_type: string;
  status: string;
  user_coordinator?: {
    id: string;
    name: string;
  };

  users_directors: {
    id: string;
    name: string;
  }[];
}

const ReportSale: React.FC = () => {
  const [reports, setReports] = useState<IReport[]>([]);
  const [linkDownloadReport, setLinkDownloadReport] = useState();
  const location = useLocation();
  const queries = useCallback(() => {
    const query = new URLSearchParams(location.search);
    const city = query.get('city');
    const status = query.get('status');
    const name = query.get('name');
    return { city, status, name };
  }, [location.search]);

  useEffect(() => {
    const { city, name, status } = queries();
    const formatSale = (sales: ISaleData[]): IReport[] => {
      const saleFormated = sales.map(sale => ({
        id: sale.id,
        sallers: sale.sale_has_sellers.map(salle => salle.name),
        sale_date: DateBRL(sale.sale_date),
        client_buyer: sale.client_buyer.name,
        builder: sale.sale_type === 'NOVO' ? sale.builder.name : '',
        realty: sale.realty.enterprise,
        realty_ammount: formatPrice(Number(sale.realty_ammount)),
        percentage_sale: sale.percentage_sale.toString(),
        type_sale: sale.sale_type,
      }));
      return saleFormated;
    };
    const loadSale = async () => {
      try {
        if (name) {
          const response = await api.get('/sale', {
            params: {
              city,
              status,
              name,
            },
          });
          const sales = formatSale(response.data);
          setReports(sales);
        } else {
          const response = await api.get('/sale', {
            params: {
              city,
              status,
            },
          });
          const sales = formatSale(response.data);
          setReports(sales);
        }
      } catch (error) {
        toast.error(
          'falha ao carregar o relatório, entre em contato com o suporte',
        );
      }
    };

    loadSale();
  }, [queries]);

  useEffect(() => {
    const report = async () => {
      try {
        const response = await api.get('/sale/export/excel');
        setLinkDownloadReport(response.data.link_url);
      } catch (error) {
        if (error.response) {
          toast.error('error na conexão! contate o suporte');
        }
      }
    };

    report();
  }, []);
  return (
    <AdmLayout>
      <Export>
        <a href={linkDownloadReport} target="_blank" rel="noopener noreferrer">
          Baixar relatório completo em Excel
        </a>
      </Export>
      <TableSaleWrapper>
        <Table>
          <Header>
            <th>Vendedor</th>
            <th>Tipo</th>
            <th>Lançado em</th>
            <th>Comprador</th>
            <th>Imovél</th>
            <th>Valor de Venda</th>

            <th>% da Venda</th>
            <th>Corrertor</th>
            <th>Coordenação</th>
          </Header>
          <Body>
            {reports.map(sale => (
              <tr>
                <td>{sale.type_sale === 'NOVO' ? sale.builder : '-'}</td>
                <td>{sale.type_sale || '-'}</td>
                <td>{sale.sale_date || '-'}</td>
                <td>{sale.client_buyer || '-'}</td>
                <td>{sale.realty || '-'}</td>
                <td>{sale.realty_ammount || '-'}</td>
                <td>{sale.percentage_sale || '-'}</td>
                <td>{sale.sallers[0]}</td>
                <td>-</td>
              </tr>
            ))}
          </Body>
        </Table>
      </TableSaleWrapper>
      <Footer>
        <button type="button">Voltar</button>
      </Footer>
    </AdmLayout>
  );
};

export default ReportSale;
