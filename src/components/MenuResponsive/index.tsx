import React, { useState, useCallback } from 'react';

import { GiHamburgerMenu } from 'react-icons/gi';
import { GrUserAdmin } from 'react-icons/gr';
import { IoIosLogOut } from 'react-icons/io';
import { Link } from 'react-router-dom';
import {
  RankingIcon,
  RegisterSellIcon,
  DashboardIcon,
} from '../../assets/images';
import { useAuth } from '../../context/AuthContext';

import { Container, MenuButton, MenuList, ItemsMenu } from './styles';

const MenuResponsive: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { userAuth } = useAuth();

  const handleVisible = useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  return (
    <Container>
      <MenuButton onClick={handleVisible}>
        <GiHamburgerMenu color="#C32925" size={20} />
      </MenuButton>

      {visible && (
        <MenuList>
          {userAuth.office.name === 'Corretor' && (
            <ItemsMenu>
              <GrUserAdmin size={20} color="#C32925" />
              <Link to="/adm">Administrativo</Link>
            </ItemsMenu>
          )}
          <ItemsMenu>
            <RegisterSellIcon />
            <span>Vendas</span>
          </ItemsMenu>
          <ItemsMenu>
            <RankingIcon />
            <span>Ranking</span>
          </ItemsMenu>
          <ItemsMenu>
            <DashboardIcon />
            <span>Dashboard</span>
          </ItemsMenu>
          <ItemsMenu>
            <IoIosLogOut color="#c32925" size={20} />
            <span>Sair</span>
          </ItemsMenu>
        </MenuList>
      )}
    </Container>
  );
};

export default MenuResponsive;
