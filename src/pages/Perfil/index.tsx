import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';

import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { LogoHeader } from '../../assets/images';
import {
  Container,
  Header,
  NavBarContainer,
  NavItemContent,
  Content,
  TabWrapper,
} from './styles';
import UserProfile from '../../components/Profile/UserProfile';
import UserUpdate from '../../components/Profile/UserUpdate';
import UserFinances from '../../components/Profile/UserFinances';
import UserListSales from '../../components/Profile/UserListSales';
import api from '../../services/api';
import { DateBRL, formatPrice } from '../../utils/format';

interface IUserSales {
  id: string;
  property: string;
  date_sale: string;
  vgv: string;
  status: string;
}

const Perfil: React.FC = () => {
  const [userSales, setUserSales] = useState<IUserSales[]>([]);
  const [userSalesCaptivators, setUserSalesCaptivators] = useState<
    IUserSales[]
  >([]);
  const [token] = useState(() => localStorage.getItem('@TriunfoDigital:token'));

  const { signOut, userAuth } = useAuth();

  useEffect(() => {
    const loadUserSales = async () => {
      try {
        const response = await api.get(`/users/${userAuth.id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const { sales, captivators } = response.data;
        const salesFormated = sales.map(sale => ({
          id: sale.id,
          property: sale.realty.enterprise,
          date_sale: DateBRL(sale.sale_date),
          vgv: formatPrice(sale.realty_ammount),
          status: sale.status,
        }));

        if (captivators.length > 0) {
          const captivatorsFormatted = captivators.map(captivator => ({
            id: captivator.id,
            property: captivator.realty.enterprise,
            date_sale: DateBRL(captivator.sale_date),
            vgv: formatPrice(captivator.realty_ammount),
            status: captivator.status,
          }));
          setUserSalesCaptivators(captivatorsFormatted);
        } else {
          setUserSalesCaptivators(captivators);
        }

        setUserSales(salesFormated);
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
  }, [token, userAuth.id]);

  return (
    <Container>
      <Header>
        <Link to="/menu">
          <LogoHeader />
        </Link>
        <NavBarContainer>
          <NavItemContent>
            <button type="button" onClick={signOut}>
              <IoIosLogOut size={30} color="#C32925" />
              <span>Sair</span>
            </button>
          </NavItemContent>
        </NavBarContainer>
      </Header>

      <Content>
        <h1>Perfil do Usuário</h1>
        <TabWrapper>
          <UserProfile />
          <Tabs
            id="tab-container"
            className="tab-container"
            defaultActiveKey="profile"
            variant="tabs"
          >
            <TabBootstrap eventKey="profile" title="Perfil">
              <UserUpdate />
            </TabBootstrap>
            <TabBootstrap eventKey="finances" title="Financeiro">
              <UserFinances />
            </TabBootstrap>
            <TabBootstrap eventKey="sales-new" title="Vendas (NOVO)">
              <UserListSales sales={userSales} />
            </TabBootstrap>
            <TabBootstrap eventKey="sales-used" title="Vendas (USADO)">
              <UserListSales sales={userSalesCaptivators} />
            </TabBootstrap>
          </Tabs>
        </TabWrapper>
      </Content>
    </Container>
  );
};

export default Perfil;
