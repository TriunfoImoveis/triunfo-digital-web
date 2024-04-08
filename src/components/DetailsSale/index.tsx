/* eslint-disable array-callback-return */
import React, { useState, useEffect, ChangeEvent } from 'react';

import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';
import AdmLayout from '../../pages/Layouts/Adm';
import { cnpj, CPFMask, FoneMask } from '../../utils/masked';
import { DateBRL, formatPrice } from '../../utils/format';
import { Container, Content } from './styles';
import api from '../../services/api';
import Property from './Property';
import ClientBuyer from './ClientBuyer';
import ClientSeller from './ClientSeller';
import Builder from './Builder';
import Realtors from './Realtors';
import Finances from './Finances';
import StatusSale from './StatusSale';
import ClientBuyerPJ from './ClientBuyerPJ';
import ClientSellerPJ from './ClientSellerPJ';
import SubsidiarySale from './Subsidiary';
import Select from '../SelectSimple';

interface IParamsData {
  id: string;
}

interface ISallers {
  id: string;
  name: string;
}

export interface ISaleData {
  id: string;
  bonus?: string;
  builder: {
    id: string;
    name: string;
  };
  client_buyer: IClient;
  installments: {
    due_date: string;
    id: string;
    installment_number: number;
    value: string;
  }[];
  client_seller?: IClient;
  commission: string;
  commissionFormatted: string;
  company?: {
    id: string;
    name: string;
    percentage: number;
  };
  origin: {
    id: string;
    name: string;
  };
  payment_type: IPaymentType;
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

  subsidiary?: {
    id: string;
    name: string;
  }

  value_signal: string;
  payment_signal: boolean;
  pay_date_signal: string;
  observation: string;
}

export interface IPaymentType {
  id: string;
  name: string;
}
export interface IInstallments {
  due_date: string;
  id?: string;
  installment_number: number;
  value: string;
  valueFormatted: string;
  status?: 'PAGO' | 'PENDENTE' | 'VENCIDO' | 'LIQUIDADA';
  pay_date?: string;
}

interface IRealty {
  city: string;
  enterprise: string;
  id: string;
  neighborhood: string;
  property: ITypeProperty;
  state: string;
  unit: string;
}

interface ITypeProperty {
  id: string;
  name: string;
}

interface IClient {
  cnpj: string;
  address: string;
  civil_status: string;
  cpf: string;
  date_birth: string;
  email: string;
  gender: string;
  id: string;
  name: string;
  number_children: string;
  occupation: string;
  phone: string;
  whatsapp: string;
}
export interface IInstallmentsData {
  installments: {
    installment_number: string;
    value: string;
    due_date: string;
  }[];
}

const DetailsSale: React.FC = () => {
  const [sale, setSale] = useState<ISaleData>({} as ISaleData);
  const [realty, setRealty] = useState<IRealty>({} as IRealty);
  const [client_buyer, setClientBuyer] = useState({} as IClient);
  const [client_seller, setClientSeller] = useState({} as IClient);
  const [realtorSellers, setRealtorSellers] = useState<ISallers[]>([]);
  const [realtorCaptivators, setRealtorCaptivators] = useState<ISallers[]>([]);
  const [coordinator, setCoordinator] = useState<ISallers>({} as ISallers);
  const [directors, setDirectors] = useState<ISallers[]>([]);
  const [instalments, setInstallments] = useState<IInstallments[]>([]);
  const [instalmentsPay, setInstalmentPay] = useState<IInstallments[]>([]);
  const [token] = useState(localStorage.getItem('@TriunfoDigital:token'));
  const { id } = useParams<IParamsData>();
  const [selectedTypeClientBuyer, setSelectedTypeClientBuyer] = useState(sale && sale.client_buyer?.cpf !== null && 'PF');
  const [selectedTypeClientSeller, setSelectedTypeClientSeller] = useState(sale && sale.client_buyer?.cnpj !== null && 'PJ');

  useEffect(() => {
    const loadSale = async () => {
      try {
        const response = await api.get(`/sale/${id}`, {
          headers: {
            auhorization: `Bearer ${token}`,
          },
        });
        const sale = response.data;
        const sallers = sale.sale_has_sellers;
        const coordinator = sale.user_coordinator;
        const captavators = sale.sale_has_captivators;
        const directors = sale.users_directors;
        if (sale.client_seller) {
          if (sale.client_seller.cpf !== null) {
            const cpfSellerFormatted = CPFMask(sale.client_seller.cpf);
            const dataSellerFormatted = DateBRL(sale.client_seller.date_birth);
            const foneSellerFormatted = FoneMask(sale.client_seller.phone);
            Object.assign(
              sale,
              (sale.client_seller.cpf = cpfSellerFormatted),
              (sale.client_seller.date_birth = dataSellerFormatted),
              (sale.client_seller.phone = foneSellerFormatted),
            );
          } else if (sale.client_seller.cpf === null) {
            const cnpjSellerFormatted = cnpj(sale.client_seller.cnpj);
            const foneSellerFormatted = FoneMask(sale.client_seller.phone);
            Object.assign(
              sale,
              (sale.client_seller.cnpj = cnpjSellerFormatted),
              (sale.client_seller.phone = foneSellerFormatted),
            );
          }
        }
        if (sale.client_buyer.cpf !== null) {
          const cpfSellerFormatted = CPFMask(sale.client_buyer.cpf);
          const dataSellerFormatted = DateBRL(sale.client_buyer.date_birth);
          const foneSellerFormatted = FoneMask(sale.client_buyer.phone);
          Object.assign(
            sale,
            (sale.client_buyer.cpf = cpfSellerFormatted),
            (sale.client_buyer.date_birth = dataSellerFormatted),
            (sale.client_buyer.phone = foneSellerFormatted),
          );
        }
        if (sale.client_buyer.cpf === null) {
          const cnpjSellerFormatted = cnpj(sale.client_buyer.cnpj);
          const foneSellerFormatted = FoneMask(sale.client_buyer.phone);
          Object.assign(
            sale,
            (sale.client_buyer.cnpj = cnpjSellerFormatted),
            (sale.client_buyer.phone = foneSellerFormatted),
          );
        }
        const realtyAmmount = formatPrice(sale.realty_ammount);
        const commission = sale.commission;
        const commissionFormatted = formatPrice(sale.commission);
        const saleDate = DateBRL(sale.sale_date);
        const valueSignal =
          sale.value_signal === null
            ? 'R$ 0,00'
            : formatPrice(sale.value_signal);
        const PayDateSignal =
          sale.pay_date_signal === null
            ? '00/00/00'
            : DateBRL(sale.pay_date_signal);
        const installmentData = sale.installments;
        const newInstallments = installmentData.map(i => ({
          ...i,
          due_date: DateBRL(i.due_date),
          value: i.value,
          valueFormatted: formatPrice(Number(i.value)),
          pay_date: i.pay_date ? DateBRL(i.pay_date) : null,
        }));

        const saleFormatted = Object.assign(
          sale,
          (sale.realty_ammount = realtyAmmount),
          (sale.commission = commission),
          (sale.commissionFormatted = commissionFormatted),
          (sale.sale_date = saleDate),
          (sale.pay_date_signal = PayDateSignal),
          (sale.value_signal = valueSignal),
        );
        const newSaleFormatted: ISaleData = {
          ...saleFormatted,
          installments: newInstallments,
        };
        const installmentPay = newInstallments.filter(
          installment => installment.status === 'PAGO',
        );
        setSale(newSaleFormatted);
        setRealty(newSaleFormatted.realty);
        setClientBuyer(newSaleFormatted.client_buyer);
        setClientSeller(newSaleFormatted?.client_seller || ({} as IClient));
        setRealtorSellers(sallers);
        setRealtorCaptivators(captavators);
        setCoordinator(coordinator);
        setDirectors(directors);
        setInstallments(newInstallments);
        setInstalmentPay(installmentPay);
      } catch (error) {
        toast.error(
          'Não consegui carregar os dados da venda ! entre em contato com o suporte',
        );
        console.log(error);
      }
    };
    loadSale();
  }, [id, token]);

  const optionsTypeClient = [
    { label: 'Pessoa Física', value: 'PF' },
    { label: 'Pessoa Juridica', value: 'PJ' },
  ];

  const handleSelectTypeClientBuyer = (value: ChangeEvent<HTMLSelectElement>) => {
    const { value: type } = value.target;
    setSelectedTypeClientBuyer(type);
  }
  const handleSelectTypeClientSeller = (value: ChangeEvent<HTMLSelectElement>) => {
    const { value: type } = value.target;
    setSelectedTypeClientSeller(type);
  }

  return (
    <AdmLayout>
      <Container>
        <h1>DETALHES DA VENDA</h1>
        <Content>
          {sale.sale_type === 'NOVO' && (
            <Tabs
              id="tab-container"
              className="tab-container"
              defaultActiveKey="finances"
              variant="tabs"
            >
              <TabBootstrap eventKey="property" title="Imóvel">
                <Property
                  realty={realty}
                  status={sale.status}
                  propertyType={realty.property}
                />
              </TabBootstrap>
              <TabBootstrap eventKey="clientBuyer" title="Cliente Comprador">
                <Select
                  nameLabel='Tipo de Cliente'
                  options={optionsTypeClient}
                  defaultValue={'0'}
                  onChange={handleSelectTypeClientBuyer}
                />
                {selectedTypeClientBuyer === 'PF' ? (
                  <ClientBuyer clientBuyer={client_buyer} status={sale.status} />
                ) : (
                  <ClientBuyerPJ clientbuyer={client_buyer} status={sale.status} />
                )}
              </TabBootstrap>
              <TabBootstrap eventKey="builder" title="Construtora">
                <Builder
                  builder={sale.builder}
                  status={sale.status}
                  uf={realty.state}
                />
              </TabBootstrap>
              <TabBootstrap eventKey="realtors" title="Corretores">
                <Realtors
                  status={sale.status}
                  saleType={sale.sale_type}
                  sallers={realtorSellers}
                  captvators={realtorCaptivators}
                  coordinator={coordinator}
                  directors={directors}
                />
              </TabBootstrap>
              <TabBootstrap eventKey="subsidiaries" title="Filial">
                <SubsidiarySale subsbisiary={sale.subsidiary} />
              </TabBootstrap>
              <TabBootstrap eventKey="finances" title="Financeiro">
                <Finances
                  status={sale.status}
                  sale={sale}
                  installments={instalments}
                  installmentPay={instalmentsPay}
                  paymentType={sale.payment_type}
                />
              </TabBootstrap>
              <TabBootstrap eventKey="staus" title="Status">
                <StatusSale statusSale={sale.status} />
              </TabBootstrap>
            </Tabs>
          )}
          {sale.sale_type === 'USADO' && (
            <Tabs
              id="tab-container"
              className="tab-container"
              defaultActiveKey="finances"
              variant="tabs"
            >
              <TabBootstrap eventKey="property" title="Imóvel">
                <Property
                  realty={realty}
                  status={sale.status}
                  propertyType={realty.property}
                />
              </TabBootstrap>
              <TabBootstrap eventKey="clientBuyer" title="Cliente Comprador">
                <Select
                  nameLabel='Tipo de Cliente'
                  options={optionsTypeClient}
                  defaultValue={'0'}
                  onChange={handleSelectTypeClientSeller}
                />
                {selectedTypeClientBuyer === null ? (
                  <ClientBuyer clientBuyer={client_buyer} status={sale.status} />
                ) : (
                  <ClientBuyerPJ clientbuyer={client_buyer} status={sale.status} />
                )}

              </TabBootstrap>
              <TabBootstrap eventKey="clientSeller" title="Cliente Vendedor">
                <Select
                  nameLabel='Tipo de Cliente'
                  options={optionsTypeClient}
                  defaultValue={'0'}
                  onChange={handleSelectTypeClientBuyer}
                />
                {selectedTypeClientSeller !== null ? (
                  <ClientSeller
                    clientSeller={client_seller}
                    status={sale.status}
                  />
                ) : (
                  <ClientSellerPJ clientSeller={client_seller} status={sale.status} />
                )}

              </TabBootstrap>
              <TabBootstrap eventKey="realtors" title="Corretores">
                <Realtors
                  status={sale.status}
                  saleType={sale.sale_type}
                  sallers={realtorSellers}
                  captvators={realtorCaptivators}
                  coordinator={coordinator}
                  directors={directors}
                />
              </TabBootstrap>
              <TabBootstrap eventKey="finances" title="Financeiro">
                <Finances
                  status={sale.status}
                  sale={sale}
                  installments={instalments}
                  installmentPay={instalmentsPay}
                  paymentType={sale.payment_type}
                />
              </TabBootstrap>
              {sale.status === 'PENDENTE' || sale.status === 'PAGO_TOTAL' ? (
                <TabBootstrap eventKey="staus" title="Status">
                  <StatusSale statusSale={sale.status} />
                </TabBootstrap>
              ) : null}
            </Tabs>
          )}
        </Content>
      </Container>
    </AdmLayout>
  );
};

export default DetailsSale;
